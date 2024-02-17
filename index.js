 

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors' 
import seedRouter from './routes/seedRout.js'
import objectsRouter from './routes/objectsRout.js'
import {MongoClient, ServerApiVersion} from 'mongodb'
import startMoving from './logic/starter.js'
import activatorRout from './routes/activatorRout.js'

const uri = "mongodb+srv://OLM1234:OLM1234@cluster0.u4ue6dx.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let objCollection;
const port = process.env.PORT || 3000

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({extended:true}))
console.log('hey')
app.use('/api/seed',seedRouter)
app.use('/api/objects',objectsRouter)
app.use('/api/mocActivator',activatorRout)


app.listen(port,()=>console.log(`listning on por ${port}`))
await client.connect();
const db = client.db("OLMDB");
console.log("Pinged your deployment. You successfully connected to MongoDB!");
objCollection = client.db("OLMDB").collection("Objects");





//run().catch(console.dir);

export{objCollection,client};



