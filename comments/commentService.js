import express from 'express';
import {connect, client, db} from './db.js';
import cors from 'cors';
import mongo from 'mongodb'


const app = express();
const port = 4201

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Port ${port} na slušanju!`));

app.post('/comments', async (req,res)=>{
    await client.connect();
    let db = client.db("posts");   
    
    let data = req.body;

    let result = await db.collection('comments').insertOne(data);
   
    if (result.insertedCount == 1) {
        res.send({
            status: 'success',
            id: result.insertedId,
        });
    } 
    else {
        res.send({
            status: 'fail',
        });
    }
});

app.get("/comments/:id", async (req, res) => {
    await client.connect();
    let db = await client.db("posts");   

    let id = req.params.id;
    console.log(id, "Evo bodyja",req.body);

    let results = await db.collection("comments").find({ postID: id }).toArray();
    console.log(results);
    res.json(results);
    
});

app.get("/comments", async (req, res) => {
    await client.connect();
    let db = await client.db("posts");   

    let results = await db.collection("comments").find({}).toArray();
    console.log(results);
    res.json(results);
    
});



