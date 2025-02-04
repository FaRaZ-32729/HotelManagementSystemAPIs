const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/hotelManagement")
.then(()=> console.log("Connection Created"))
.catch((error)=>console.log(error))