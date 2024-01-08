//import MongoClient from "mongodb";
const mongo = require('mongodb')
const mClient = mongo.MongoClient;
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

app.use(cors());
app.use(express.json());

const connectionString = process.env.ATLAS_URI || "";
const client = new mClient(connectionString);

async function findOne(){
    let conn;
    try {
        conn = await client.connect();
    } catch(e) {
        console.error(e);
    }

    try {
        const db = client.db("testdb");
        let collection = db.collection('stickers');
        let query = { source: 'sunhacks' }
        let res = await collection.findOne(query);
        console.log(res)
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

// app.get("/api/items", async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });

// get driver connection
// app.listen(port, () => {
//     // perform a database connection when server starts
//     dbo.connectToServer(function (err) {
//       if (err) console.error(err);
//      });
//     console.log(`Server is running on port: ${port}`);
//   });