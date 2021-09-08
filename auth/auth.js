import connect from './db'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

(async () => {

    let db = await connect();
    await db.collection("users").createIndex({email: 1},{unique: true});

})();

export default {
    async registration(userData){
        let db = await connect();


        let userDoc = {
            email: userData.email,
            password: await bcrypt.hash(userData.password, 10),
            phoneNumb: userData.phoneNumb,
        }
        try{
            let result = await db.collection('users').insertOne(userDoc);
            if (result && result.insertedId) {
                console.log("insertain id", result.insertedId)
                return result.insertedId;
            }
        } catch(e){
            if (e.name == "MongoError" && e.code == 11000) {
                throw new Error("User already exists!");
              }
        }
        
    },
    async authenticateUser(email, password){
        let db = await connect();
        let user = await db.collection("users").findOne({ email: email });

        if (user && user.password && (await bcrypt.compare(password, user.password))){
            
            delete user.password;
            let token = jwt.sign(user, process.env.JWT_SECRET, {
                algorithm: "HS512",
                expiresIn: "2 weeks"
            })
            return {
                token,
                email: user.email,
            }
        }
        else{
            throw new Error("Cannot authenticate")
        }
    },
    verify(req, res, next){
        try{
            let authorization = req.headers.authorization.split(' ');
            let type = authorization[0];
            let token = authorization[1];

            if (type !== "Bearer"){
                return res.status(401).send();
            }
            else {
                req.jwt = jwt.verify(token, process.env.JWT_SECRET);
                return next();
            }
        } catch (e) {
            return res.status(401).send();
        }
    },
    async changeUserPassword(email, old_password, new_password) {
        let db = await connect();
        let user = await db.collection('users').findOne({ email:email })

        if (user && user.password && (await bcrypt.compare(old_password, user.password))){
            let new_password_hashed = await bcrypt.hash(new_password, 10)

            let result = await db.collection('users').updateOne(
                { _id: user._id },
                {
                    $set: {
                        password: new_password_hashed
                    }
                }
            )

            return result.modifiedCount == 1
        }
    },
};