import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import connect from './db.js';
import cors from 'cors';
import axios from 'axios';
import mongo from 'mongodb'
import cart from './src/models/cart.js';

const session = require("express-session");
let Cart = require ('./src/models/cart');

const app = express();
const port = 4206;

app.use(session({
  secret: "secretSession"
}));

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Port ${port} na slušanju!`))

app.post("/add-to-cart/:id", async (req, res) => {
//Dohvaćamo sve proizvode iz posts servisa i umećemo logiku s košaricom
  try {
      const id = req.params.id;
      
      const { data }  = await axios.get(process.env.ADDRESS_ENV_CART + ":4200/products"); //spremanje privatne IP adrese u environment kako adresa nebi bila vidljiva

      const singleProduct = await data.find((product) => product._id === id);

    let cart;
    if (!req.session.cart) {
      req.session.cart = cart = new Cart({});
    } else {
      
      cart = new Cart(req.session.cart);
    }
    //Spremamo podatke u Session da bi se mogle spremati prijašnje vrijednosti
    req.session.cart = cart;
    cart.addProduct(singleProduct);
    console.log(req.session.cart)
    res.send(cart);
    
  } catch (error) {
    console.log(error);
  }
});

app.post("/cart", async (req, res) => {
  const cartData = req.session.cart || {};
  res.send(cartData);
  let db = await connect();
  
  let result = await db.collection('cart').insertOne(cartData);

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

  
  app.get("/cart", async (req, res) => {
  
    let db = await connect();
  
    const cursor = await db.collection('cart').find({});
    const results = await cursor.toArray();
    
    let cartItems;
    let storeItems=[];

    console.log("length",results.length)

    //Dohvaćanje određenih property-ja iz objekta
    for(let i=0; i<=results.length-1;i++){
      results[i].productItems.item.title;

      let totalQty = results[i].totalQty;
      let totalPrice = results[i].totalPrice;
      cartItems = {totalQty: totalQty, totalPrice: totalPrice }
      storeItems[i] = cartItems;
      
    }
    console.log(storeItems)
    res.json(storeItems);
      
});

