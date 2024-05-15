const { Server } = require("socket.io");
const db = require('./db');

const clientsMap = new Map();
const connectedClientsMap = new Map();

let io;

function initializeSocket(server) {
    io = new Server(server,{
        cors: {
          origin: '*',
        }
    });

    io.on('connection', async (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('user_id', (user_id) => {
            console.log(user_id)
            console.log(`User ${user_id.user_id} connected with socket ID ${socket.id}`);
            if (user_id) {
                if (connectedClientsMap.has(user_id.user_id)) {
                    connectedClientsMap.get(user_id.user_id).push(socket.id);
                } else {
                    connectedClientsMap.set(user_id.user_id, [socket.id]);
                }
            }
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected with socket ID ${socket.id}`);
            connectedClientsMap.forEach((socketIds, userId) => {
                const index = socketIds.indexOf(socket.id);
                if (index !== -1) {
                    socketIds.splice(index, 1);
                    if (socketIds.length === 0) {
                        connectedClientsMap.delete(userId);
                    }
                }
            });
        });

        try {
            const client = db.getClient();
            const database = client.db("Blog");
            const favTopicsCollection = database.collection('favorite_topics');

            // Fetch data from MongoDB collection
            const cursor = favTopicsCollection.find();
            await cursor.forEach(doc => {
                const { topic_id, user_id } = doc;
                if (clientsMap.has(user_id)) {
                    clientsMap.get(topic_id).push(user_id);
                } else {
                    clientsMap.set(topic_id, [user_id]);
                }
            });

            console.log('clientsMap:', clientsMap);
        } catch (error) {
            console.error('Error fetching data from MongoDB:', error);
        }

    });

    return io;
}

async function notifyConnectedUsers(topic_id) {
    console.log("notifyConnectedUsers called in socketRoute");
    const user_ids = clientsMap.get(topic_id);
    if (user_ids) {
        user_ids.forEach(user_id => {
            console.log(connectedClientsMap)
            const socket_ids = connectedClientsMap.get(user_id);
            if (socket_ids) {
                socket_ids.forEach(socket_id => {
                    io.to(socket_id).emit('new_post',"new post on a topic you like!", { topic_id });
                });
            }
        });
    }
}

module.exports =  {initializeSocket,notifyConnectedUsers};