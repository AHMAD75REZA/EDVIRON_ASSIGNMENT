// app.js
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.get('/defaulters', async (req, res) => {
    const uri = "mongodb+srv://assignment:edviron@cluster0.ebxruu8.mongodb.net/test";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('Edviron_task_db'); // Replace 'your_database_name' with your actual database name
        const collection = database.collection('Edviron_collection'); // Replace 'your_collection_name' with your actual collection name

        // Query MongoDB to find defaulters (students with fees past due date)
        const defaulters = await collection.find({ /* Your query for defaulters */ }).toArray();

        res.json(defaulters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await client.close();
    }
});

module.exports.handler = serverless(app);
