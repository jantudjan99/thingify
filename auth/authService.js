import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import connect from './db.js';
import cors from 'cors';
import mongo from 'mongodb';
import axios from 'axios';
import auth from './auth.js';

const app = express();
const port = 4208;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Port ${port} na slušanju!`))

app.post('/users', async (req, res) => {
    let user = req.body;
    console.log(user);
    let id;
    try{
        id = await auth.registration(user);
    }
    catch(e) {
        res.status(500).json({ error: e.message });
    }
    
    res.json({ id: id });
    
});

app.post('/userComment', async (req, res) =>{
    let user = req.body;
    console.log(user)
    res.json(user);    

    let result = await axios.post("http://localhost:4201/userComments", user);
    console.log(result)
    /*if (result.insertedCount == 1) {
        res.send({
            status: 'success',
            id: result.insertedId,
        });
    } 
    else {
        res.send({
            status: 'fail',
        });
    }*/

})

app.post('/auth', async (req,res) => {
    let user = req.body;

    try{
        let result = await auth.authenticateUser(user.email, user.password);
        res.json(result);
    }
    catch(e){
        res.status(403).json({ error: e.message });
    }

});

app.patch('/user', [auth.verify], async (req, res) => {
    let userChange=req.body;

    let email = req.jwt.email;

    if(userChange.new_password && userChange.old_password){
        let result = await auth.changeUserPassword(email, userChange.old_password, userChange.new_password)
        if (result) {
            res.status(201).send()
        }
        else{
            res.status(500).json({error: "Cannot change password."})
        }
    }
    else {
        res.status(400).json({error: "Wrong request."})
    }

});

app.get('/secret', [auth.verify], (req, res) => {
    
    res.json({ message: 'This is a secret.' + req.jwt.email })

})

app.get('/allUsers', async (req, res) => {
    let db = await connect();

    const cursor = await db.collection('users').find({});
    const results = await cursor.toArray();

    res.json(results);

})

