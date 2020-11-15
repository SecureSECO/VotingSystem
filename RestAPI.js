const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb+srv://SecureSECO-User:B0SzNryTs9KVXzcd@secureseco-cluster1.ojoox.mongodb.net/SecureSECO-VotingDB?retryWrites=true&w=majority";
const DATABASE_NAME = "SecureSECO-VotingDB";
const COLECTION_NAME = "SecureSECO-VotingDB-Collection";


var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection(COLECTION_NAME);
        
    });
});







app.get("/allComponents", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


app.get("/Component/:ComponentName/:Version", (request, response) => {
    collection.find({ "ComponentName": request.params.ComponentName, "Version": request.params.Version}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


