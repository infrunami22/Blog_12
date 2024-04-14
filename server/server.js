require ('dotenv').config()
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')


app.use(express.json())

const jwt = require('jsonwebtoken')

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri ="mongodb+srv://admin:8Khx4PymZh0Omnlv@cluster0.mnyl8gv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

let refreshTokens = []

  async function connectToMongoDB() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Rethrow the error to handle it elsewhere
    }
}

connectToMongoDB().catch(console.error);

app.get('/users', async (req, res) => {
    try {
        const database = client.db("Blog");
        const usersCollection = database.collection('users');

        const users = await usersCollection.find({}).toArray();

        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//registration - not needed
app.post('/users',async(req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const user = {name: req.body.name, password: hashedPassword,role:req.body.user}
    users.push(user)
    res.status(201).send()
    } catch {
        res.status(500).send()
    }
})


app.get('/topics', authenticateToken,async(req,res) => {
    try {
        // Connect to the MongoDB server
        const database = client.db("Blog");
        const postsCollection = database.collection('topics');

        // Fetch posts belonging to the authenticated user
        const topics = await postsCollection.find({}).toArray();

        // Send the topics as JSON response
        res.json(topics);
    } catch (error) {
        console.error("Error fetching topics:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token== null) return res.status(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=> {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.delete('/logout',(req,res)=> {
    refreshTokens = refreshTokens.filter(token => token !==req.body.token)
    res.sendStatus(204)
})
app.post('/login',async(req, res) => {
    const database = client.db("Blog");
    const usersCollection = database.collection('users');
    const user = await usersCollection.findOne({username:req.body.username})

    if(!user){
        return res.status(401).send('User not found');
    }
    try {
        const match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
            // Passwords match, generate tokens
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
            refreshTokens.push(refreshToken)
            res.json({ accessToken: accessToken, refreshToken: refreshToken })
        } else {
            // Passwords don't match
            res.status(401).send('Invalid password')
        }
    } catch {
        res.status(500).send()
    }
})

function generateAccessToken(user) {
    return jwt.sign({ name: user.name},process.env.ACCESS_TOKEN_SECRET,{expiresIn: '15m'})
}

app.post('/token',(req,res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user) => {
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name: user.name})
        res.json({accessToken: accessToken})
    })
})

app.listen(5000, () => {
    console.log("listening on port 5000")
})