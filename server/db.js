
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

module.exports = {connectToMongoDB,
    getClient: () => client
}