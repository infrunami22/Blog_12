require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const {initializeSocket,notifyConnectedUsers} = require('./socketRoute'); // Import the Socket.IO setup module

const userRoute = require('./userRoute');
const topicRoute = require('./topicRoute');
const { router2 } = require('./tokenRoute');
const adminRoute = require('./adminRoute');

app.use(express.json());
app.use(cors());

app.use('/users', userRoute);
app.use('/auth', router2);
app.use('/topics', topicRoute);
app.use('/admin', adminRoute);

const io = initializeSocket(http);

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
