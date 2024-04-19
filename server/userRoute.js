const express = require('express');
const router = express.Router();
const db = require('./db');
const {router2,authenticateToken} = require('./tokenRoute')

//'/users'
router.get('/list', async (req,res) => {
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
});
//list specific user's comments

router.get('/:userId/comments',authenticateToken, async (req,res) => {
try{
    const client = db.getClient();
        const database = client.db("Blog");
        const commentsCollection = database.collection('comments');
        //the id can only be accessed as a string, so we convert it to int
        const { userId } = req.params;
        const userIdInt = parseInt(userId, 10);

        //fetch comments
        const comments = await commentsCollection.find({ user_id: userIdInt }).toArray();
        if(comments.length === 0) {
            res.json("This user has no comments")
        } 
        else {
            res.json(comments)
        }
    }catch(error){
        console.error("Error fetching comments:", error);
    }

});

module.exports = router;