
const { MongoClient } = require('mongodb');

let connection_string = 'mongodb+srv://jantudjan99:aron1234@cluster0.3ctoa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

let client = new MongoClient(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = null

export default () => {
    
    return new Promise((resolve, reject) =>{
        
        if (db /*&& client.isConnected()*/){
            resolve(db)
        }
        client.connect(err => {
            if(err){
                reject("Došlo je do greške prilikom spajanja: " + err)
            }
            else{
                console.log("Successful database connection")
                db = client.db("posts")
                resolve(db)
            }
        });
    })
}; 

