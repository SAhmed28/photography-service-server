const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oplybtq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection = client.db('photography').collection('services');
        const reviewCollection = client.db('photography').collection('reviews');

        app.get('/services', async(req,res) => {
            const size = parseInt(req.query.size);
            const query = {};
            const cursor = serviceCollection.find(query);
            const allServices = await cursor.limit(size).toArray();
            res.send(allServices);
        })

        app.get('/services/:id', async(req,res) => {
            const id = req.params.id;
            const query  = {_id: ObjectId(id) }
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })

        app.get('/reviews', async(req,res) => {
            let query = {};
            if(req.query.email){
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        })

        app.post('/service', async(req,res) => {
            const service = req.body;
            const result = await serviceCollection.insertOne(service);
            res.send(result);
        })


        app.post('/review', async(req,res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })

        
        app.delete('/reviews/:id',  async(req,res) => {
            const id = req.params.id;
            const query = {_id : ObjectId(id) };
            const result = await reviewCollection.deleteOne(query);
            res.send(result);
        })

        
    }
    finally{

    }
}
run().catch(err => console.error(err))

app.get('/', (req,res) => {
    res.send('Photography service server is running');
})

app.listen(port, () => {
    console.log(`Photography service server is running on port ${port}`)
})