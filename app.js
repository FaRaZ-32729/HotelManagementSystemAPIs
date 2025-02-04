require("./models/roomModel");
require("./models/userModel");
require("./models/bookingModel");
const express = require("express");
const cookieParser = require("cookie-parser");
const connection = require("./dbConnection/dbConnection");
const userRouter = require("./routers/userRouters");
const authRouter = require("./routers/authRouters");
const roomRouter = require("./routers/roomRouters");
const bookingRouter = require("./routers/bookingRouters");



const app = express();
const port = 8000;


app.use(express.json());
app.use(cookieParser())


app.use("/user" , userRouter);
app.use("/auth" , authRouter);
app.use("/room" , roomRouter );
app.use("/booking"  , bookingRouter );



app.listen(port , () =>{
    console.log(`Server is Running on port number ${port}`)
})