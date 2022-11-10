const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());


app.get('/', (req,res) => {
    res.send('Photography service server is running');
})

app.listen(port, () => {
    console.log(`Photography service server is running on port ${port}`)
})