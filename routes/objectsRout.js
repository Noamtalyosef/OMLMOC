import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { objCollection } from '../index.js';

const objectsRouter = express.Router();

objectsRouter.get("/", expressAsyncHandler(async(req,res)=>{
    try{
        console.log("in objects ndpoint")
        const objects = await objCollection.find({}).toArray();
        res.send(objects)
    }
    catch(err)
    {
         console.log(err)
    }
}))

export default objectsRouter;