import express from 'express';
import connect from './db.js';
import cors from 'cors';
import mongo from 'mongodb'
import axios from 'axios'


const app = express();
const port = 4207

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Port ${port} na slušanju!`))

app.post("/payment", async (req, res) => {
    //Traži se od korisnika da unese email i točno kolika je količina u košarici kad ju je poslao

    /*           POSTMAN REQUEST:
        {
            "userEmail" : "vrijednost",
            "userPhoneNumb" : "vrijednost",
            "totalQty" : integer,
            "totalPrice" : double
        }
    */

    let db = await connect();
    let payment = await req.body;
    
    let result = await db.collection('payment').insertOne(payment);

    console.log(result)
    
});

app.get("/payment/:email", async (req, res) => {
    
    //Traži se korisnik, ako se podudaraju uneseni podaci u procesu plaćanja moguće je vidjeti sve podatke o plaćanju, koliko je proizvoda i koja je cijena
    let email = req.params.email;
    let db = await connect();
    let userResponse = await axios.get(`http://localhost:4208/allUsers`); //Dobivanje svih registriranih korisnika iz servisa authService

    //Traži se da li email unesenog korisnika postoji
    let filterUser = await userResponse.data.find((user) => user.email == email)
    let userEmail = filterUser.email;
    let userPhoneNumb = filterUser.phoneNumb
    console.log(userEmail, userPhoneNumb)

    
    let reqData =  await db.collection('payment').findOne({userEmail: userEmail}); //Pretraga da li postoji registrirani korisnik po emailu
    
    console.log("req data: ",reqData)

    
    let cartResponse = await axios.get('http://localhost:4206/cart')  //Dobivanje servisa gdje su spremljene sve unesene košarice
    let filterCart = await cartResponse.data.find((cart) => cart.totalQty == reqData.totalQty) //Upit da li se količina podudara s onom koja je u servisu cart već dodana u košaricu

    console.log("Filtrirani cart: ", filterCart)

    let cartTotalQty = filterCart.totalQty;
    let cartTotalPrice = filterCart.totalPrice; 

    let Data = {userEmail, userPhoneNumb, cartTotalQty, cartTotalPrice} //Spajanje svih property-ja u objekt Data
    res.send(Data);
});

