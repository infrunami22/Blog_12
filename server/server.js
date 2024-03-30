const express = require('express')
const app = express()

app.get('/', (req,res) => {   
res.json({"users:" : ["userOne", "userTwo"]})
})

app.listen(5000, () => {
    console.log("listening on port 5000")
})