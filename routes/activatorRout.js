import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import startMoving from '../logic/starter.js';
import pushObjOut from '../logic/functions/pushObjOut.js';
import { objCollection } from '../index.js';
import { ObjectId } from 'mongodb';

const activatorRout = express.Router()



activatorRout.get("/start", expressAsyncHandler(async(req,res)=>{
    try{
        console.log("in start")
        startMoving(true)
        res.send("MOC server runs")
        console.log("MOC server is running")
    }
    catch(err)
    {
         console.log(err)
    }
}))


activatorRout.get("/stop", expressAsyncHandler(async(req,res)=>{
    try{
        console.log("in stop")
        startMoving(false)
       res.send("MOC server stpos")
    }
    catch(err)
    {
         console.log(err)
    }
}))

activatorRout.get("/pushOut", expressAsyncHandler(async(req,res)=>{
    try{
        console.log("in pushOut")
      const meters = req.body.meters
      const id = req.body.id
      
      const obj = await objCollection.findOne({ _id: new ObjectId(id) })
       pushObjOut(obj,meters)
       res.status(200).send("object on the way out")
    }
    catch(err)
    {
         console.log(err)
    }
}))


export default activatorRout;