

export async function getAllComponents(){

	
	const MongoClient = require('mongodb').MongoClient;
	const uri = "mongodb+srv://SecureSECO-User:B0SzNryTs9KVXzcd@secureseco-cluster1.ojoox.mongodb.net/SecureSECO-VotingDB?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useUnifiedTopology: true });
	await client.connect();
	const collection = client.db("SecureSECO-VotingDB").collection("SecureSECO-VotingDB-Collection");

	return await collection.find();
}

async function FindComponent( varComponentName, varVersion, collection){
	return await collection.find(
			       	   {
					ComponentName:varComponentName,
	   		    		Version:varVersion
				    });
}



export async function AddVote(varComponentName, varVersion, varTrustScore, varUserID){

	
	const MongoClient = require('mongodb').MongoClient;
	const uri = "mongodb+srv://SecureSECO-User:B0SzNryTs9KVXzcd@secureseco-cluster1.ojoox.mongodb.net/SecureSECO-VotingDB?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useUnifiedTopology: true });
	await client.connect();
	const collection = client.db("SecureSECO-VotingDB").collection("SecureSECO-VotingDB-Collection");

	await collection.insertOne(
			       	   {
					ComponentName:varComponentName,
	   		    		Version:varVersion ,
				     	TrustScore:varTrustScore, 
				    	UserID:varUserID
				    });
}

async function main(){
	const MongoClient = require('mongodb').MongoClient;
	const uri = "mongodb+srv://SecureSECO-User:B0SzNryTs9KVXzcd@secureseco-cluster1.ojoox.mongodb.net/SecureSECO-VotingDB?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useUnifiedTopology: true });
	await client.connect();
	const collection = client.db("SecureSECO-VotingDB").collection("SecureSECO-VotingDB-Collection");

      //insert command
        await AddVote("C2","3.0" ,"8", "1001");

	var results1 = await FindComponent("C2","3.0",collection);
	await results1.forEach(element => { console.log(element); }); 

	await console.log("----------------------------------------------");

	var results2 = await getAllComponents(collection);
	await results2.forEach(element => { console.log(element); }); 

	await console.log("----------------------------------------------");


        client.close();
}

main().catch(console.error);


