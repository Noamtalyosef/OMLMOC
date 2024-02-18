import { objCollection } from "../../index.js";
//To create a function that moves one object 5 meters north every two seconds for a total distance of 100 meters, you can use a similar approach to what we did before, but with some adjustments to fit this specific scenario. Here's how you can do it:

let moveIntervalId;
// Function to move one object north
async function pushObjOut(obj,distanceInMeters) {
  try{
  const totalDistance = distanceInMeters||100; // Total distance to move in meters
  const distancePerMove = 5; // Distance to move in each step
  const moveInterval = 2000; // Time interval between moves in milliseconds (2 seconds)

  let distanceMoved = 0;

   moveIntervalId = setInterval(async() => {
    // Move the object north by the specified distance
    obj.Lat += (distancePerMove / 111111); // Approximately 1 degree of latitude is equal to about 111111 meters
  
    distanceMoved += distancePerMove;
    
    await objCollection.updateOne({ _id: obj._id }, { $set: { Lat: obj.Lat} });
    console.log(obj.Lat)
    // Check if the total distance moved exceeds the target distance
    if (distanceMoved >= totalDistance) {
      clearInterval(moveIntervalId); // Stop the interval when the total distance is reached
    
    }
  }, moveInterval);

  }

  catch(err){
    console.log(err)
  }
  
}

export default pushObjOut;