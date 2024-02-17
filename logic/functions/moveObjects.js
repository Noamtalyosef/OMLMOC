import getRandom from "./getRandom.js";
import calculateDistance from "./calculateDistance.js";

// Function to move objects randomly without exceeding one meter per second
export function moveObjects(objects) {
    const maxSpeed = 1; // Maximum speed in meters per second
  
    objects.forEach(obj => {
      const latChange = getRandom(-0.00001, 0.00001); // Change in latitude (approximately 1 meter)
      const lngChange = getRandom(-0.00001, 0.00001); // Change in longitude (approximately 1 meter)
  
      // Calculate new latitude and longitude
      const newLat = obj.Lat + latChange;
      const newLng = obj.Lng + lngChange;
  
      // Calculate distance moved
      const distanceMoved = calculateDistance(obj.Lat, obj.Lng, newLat, newLng);
  
      // If distance moved exceeds 1 meter, scale back the changes
      if (distanceMoved > maxSpeed) {
        const scaleFactor = maxSpeed / distanceMoved;
        obj.Lat = obj.Lat + latChange * scaleFactor;
        obj.Lng = obj.Lng + lngChange * scaleFactor;
      } else {
        obj.Lat = newLat;
        obj.Lng = newLng;
      }
    });
  
    return objects;
  }

  