import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import startMoving from '../logic/starter.js';


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

export default activatorRout;