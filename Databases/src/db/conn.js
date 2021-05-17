const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/regdb").then(()=>{
console.log("connection established");

}).catch(()=>{
    console.log("connection error")
});