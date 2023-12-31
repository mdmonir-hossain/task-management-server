const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ykyyuvy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const tasksCollection = client.db("tasksdb").collection("tasks");
    app.post("/addtask", async (req, res) => {
      const addtask = req.body;
      console.log(addtask);
      const result = await tasksCollection.insertOne(addtask);
      res.send(result);
    });

    app.get("/addtask", async (req, res) => {
      const cursor = tasksCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

app.delete("/addtask/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await tasksCollection.deleteOne(query);
  res.send(result);
});
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server running port: ${port}`);
});
