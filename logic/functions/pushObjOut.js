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
  let currentPosition = obj.Lat;

   moveIntervalId = setInterval(async() => {
    // Move the object north by the specified distance
    obj.Lat += (distancePerMove / 111111); // Approximately 1 degree of latitude is equal to about 111111 meters
  
    currentPosition += distancePerMove;
    
    await objCollection.updateOne({ _id: obj._id }, { $set: { Lat: obj.Lat} });
    console.log(obj.Lat)
    // Check if the total distance moved exceeds the target distance
    if (distanceMoved >= totalDistance) {
      await objCollection.updateOne({ _id: obj._id }, { $set: { Lat: obj.Lat} });
      clearInterval(moveIntervalId); // Stop the interval when the total distance is reached
    
    }
  }, moveInterval);

  }

  catch(err){
    console.log(err)
  }
  
}





let interval2;

 async function moveObjectNorth(object, meters) {
  const distanceToMove = 5; // Distance to move in meters
  const totalTime = 100 * 2 * 1000; // Total time in milliseconds (100 meters at 2 seconds per 5 meters)

  let remainingDistance = meters||100; // Remaining distance to move
  let currentPosition = object.Lat; // Current position of the object

   interval2 = setInterval(async() => {
    // Move the object north by the specified distance
    currentPosition += (distanceToMove / 100000) * (111 / (40075 * Math.cos(currentPosition * Math.PI / 180))); 
    // The factor (111 / (40075 * Math.cos(currentPosition * Math.PI / 180))) is used to adjust the latitude change based on the current latitude

    // Update the object's position
    object.Lat = currentPosition;

    const res = await objCollection.updateOne({ _id: object._id }, { $set: { Lat: object.Lat} });
    console.log(object.Lat +"   "+ res.nModified)

    // Update the remaining distance
    remainingDistance -= distanceToMove;

    // If the remaining distance is less than or equal to 0, stop the interval and send response
    if (remainingDistance <= 0) {
      clearInterval(interval2);
      console.log(object.Lat)
    }
  }, 2000); // 2000 milliseconds = 2 seconds
}

export default moveObjectNorth