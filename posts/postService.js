import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connect from './db.js';
import cors from 'cors';
import mongo from 'mongodb';
import axios from 'axios';


const app = express();
const port = 4200

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Port ${port} na slušanju!`))



app.post('/products', async (req,res)=>{
    let db = await connect();
    
    let posts = req.body;
    
    let result = await db.collection('posts').insertOne(posts);
   
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
})

app.get ('/products', async (req , res) => {
    
        const db = await connect();
        const cursor = await db.collection('posts').find({});
        const results = await cursor.toArray();
    
    
    res.json(results);
    
});

app.get ('/productComments/:title', async (req , res) => {

    //Dohvaćamo sve komentare iz comments servisa za jedan post 
    try {
    let title = req.params.title;
    
    const db = await connect();

    const doc = await db.collection("posts").findOne({title: title});

    let comments  = await axios.get(process.env.ADDRESS_ENV_POSTS + ":4201/comments"); //spremanje privatne IP adrese u environment kako adresa nebi bila vidljiva

    const singleProductComment = await comments.data.filter((comment) => comment.postID == doc._id);

    console.log(singleProductComment)

    res.json(singleProductComment)
    }
    
    catch(error){
        console.log(error)
    }

});


app.get ('/products/:id', async (req , res) => {
    
    let id = req.params.id;
    let db = await connect();
    console.log("params: ",id);
    
    let doc = await db.collection("posts").findOne({_id: mongo.ObjectID(id)});
    console.log(doc)
    res.json(doc)

});

