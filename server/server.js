require ('dotenv').config()
const express = require('express')
const app = express()
const userRoute = require('./userRoute')
const topicRoute = require('./topicRoute')
/* const authentication = require('./authentication') */
const tokenRoute = require('./tokenRoute')
app.use(express.json())

app.use('/users',userRoute)
app.use('/auth',tokenRoute)
app.use('/topics',topicRoute)





/* app.get('/users', async (req,res) => {
    try {
        const client = db.getClient();
        const database = client.db("Blog");
        const usersCollection = database.collection('users');

        const users = await usersCollection.find({}).toArray();

        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}); */
//registration - not needed
/* app.post('/users',async(req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const user = {name: req.body.name, password: hashedPassword,role:req.body.user}
    users.push(user)
    res.status(201).send()
    } catch {
        res.status(500).send()
    }
}) */


/* app.get('/topics', authenticateToken,async(req,res) => {
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
}) */


app.listen(5000, () => {
    console.log("listening on port 5000")
})