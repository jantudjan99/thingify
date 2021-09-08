const { MongoClient } = require("mongodb");

let connection_string = "mongodb+srv://jantudjan99:aron1234@cluster0.3ctoa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let client = new MongoClient(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = function () {
    return new Promise((resolve, reject) => {
        client.connect((err) => {
            if (err) {
                reject("Došlo je do greške prilikom spajanja: " + err);
            } else {
                resolve("Successful connection!");
            }
        });
    });
};

module.exports = { client, db };