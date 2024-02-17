import express from 'express'
import expressAsyncHandler from 'express-async-handler';

import Objects from '../data.js';

const middeleIndex  = Objects.length/2;
const firstHalf = Objects.slice(0,middeleIndex);
const seconedHalf = Objects.slice(middeleIndex)

console.log(Objects)


const seedRouter = express.Router();
seedRouter.get('/',
expressAsyncHandler(async (req,res)=>{
    try{
       
         
        Objects.forEach(obj => {
            delete obj.id;
            
        });
        console.log(Objects)

        // const newObl = new ObjLocation({
        //     description : 'fsdfdf',
        //     Lat : 40.764,
        //     Lng : -20.543
        // })
       
        //const newArr = Objects.slice(0,2);
         console.log("before one")
        //const createdObjects = await ObjLocation.insertMany(Objects)
     
       
    }
    catch(err){
        console.log(err)
        res.send(err)

    }
})
)

export default seedRouter