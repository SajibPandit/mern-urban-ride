export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(parseInt(lat2) - parseInt(lat1)); // deg2rad below
  var dLon = deg2rad(parseInt(lon2) - parseInt(lon1));
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

export const getTotalCost = (distance, medium, person) => {
  let totalCost;
  if (medium === "car") {
    totalCost = parseInt(distance) * 6 * parseInt(person);
  } else if (medium === "cng") {
    totalCost = parseInt(distance) * 3.1 * parseInt(person);
  } else if (medium === "train") {
    totalCost = parseInt(distance) * 2 * parseInt(person);
  } else if (medium === "bike") {
    totalCost = parseInt(distance) * 4 * parseInt(person);
  } else if (medium === "bus") {
    totalCost = parseInt(distance) * 2.6 * parseInt(person);
  }
  return totalCost.toFixed(0);
};
