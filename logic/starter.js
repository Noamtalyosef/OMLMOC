import {moveObjects} from "./functions/moveObjects.js";
import {setInterval} from 'timers';
import { objCollection } from "../index.js";
// Function to call moveObjects every 3 seconds

let interval;

 async function  startMoving(isRun) {
     
  

    if (!isRun) {
        console.log("Stopping interval");
        clearInterval(interval); // Clear the interval
        return;
    }

      const objs = await objCollection.find({}).toArray()
       interval = setInterval( async() => {
      const movedObjects = moveObjects(objs);
     

      await Promise.all(movedObjects.map(async (obj) => {
      await objCollection.updateOne({ _id: obj._id }, { $set: { Lat: obj.Lat, Lng: obj.Lng } });
      }));
       
    
   

     const moovedUpdateobjs = await objCollection.find({}).toArray();
      
      const firsttObj =  moovedUpdateobjs[0]
      const lastObj = moovedUpdateobjs[59]
      console.log(`Flng:  ${firsttObj.Lat},Llng:  ${lastObj.Lat}`)

    }, 3000); // 3000 milliseconds = 3 seconds
  }
  
  export default startMoving