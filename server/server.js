require ('dotenv').config()
const express = require('express')
var cors = require('cors');
const app = express()
const bcrypt = require('bcrypt')

app.use(cors());

app.use(express.json())

let refreshTokens = []

const jwt = require('jsonwebtoken')

const users = [
    {
        name: 'user1',
        password: '$2b$10$4tTKfV0AiK7yTnOAd3F/ZOC/6o.mjTA.HedTzPyxU0GtKMlQx5DTi', // Hashed password for 'password'
        role:'user'
    },
    {
        name: 'admin',
        password: '$2b$10$4tTKfV0AiK7yTnOAd3F/ZOC/6o.mjTA.HedTzPyxU0GtKMlQx5DTi', // Hashed password for 'password'
        role:'admin'
    }
]
const posts = [
    {
        username : 'user1',
        title: 'Post 1'

    }
    ,{
        username : 'admin',
        title: 'Post 2'
        
    }
]
// TODO : seperate authentication into seperate server

app.get('/users',(req, res) => {
    res.json(users)
})

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


app.get('/posts', authenticateToken,(req,res) => {
    res.json(posts.filter(post => post.username === req.user.name))
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
app.post('/users/login',async(req, res) => {
    const user = users.find(user => user.name === req.body.name)
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
    return jwt.sign({ name: user.name},process.env.ACCESS_TOKEN_SECRET,{expiresIn: '15s'})
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