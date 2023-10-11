// lambda.js
const MongoClient = require('mongodb').MongoClient;

exports.handler = async (event) => {
    const uri = "mongodb+srv://assignment:edviron@cluster0.ebxruu8.mongodb.net/test";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('Edviron_task_db'); // Replace 'your_database_name' with your actual database name
        const collection = database.collection('Edviron_collection'); // Replace 'your_collection_name' with your actual collection name

        // Query MongoDB to find defaulters (students with fees past due date)
        const defaulters = await collection.find({ /* Your query for defaulters */ }).toArray();

        return {
            statusCode: 200,
            body: JSON.stringify(defaulters)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    } finally {
        await client.close();
    }
};
