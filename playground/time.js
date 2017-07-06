// var moment = require("moment");

// // Jan 1st 1970 00:00:00 am

// var date = moment();
// // console.log(date.format("MMM Do YYYY"));

var moment = require("moment");
var date = moment();

console.log(date.format("hh[:]mm a"));
console.log(date.format("h[:]mm a"));