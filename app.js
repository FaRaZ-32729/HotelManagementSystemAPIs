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
const roleRoutes = require("./routers/roleBaseRouters");
const cors = require("cors");


const app = express();
const port = 8000;


app.use(express.json());
app.use(cookieParser())

app.use(cors ({
    origin : ["http://localhost:5173" , "http://localhost:5174" ],
    credentials: true 
}));

app.use("/user" , userRouter);
app.use("/auth" , authRouter);
app.use("/room" , roomRouter );
app.use("/booking"  , bookingRouter );
app.use("/api" , roleRoutes);



app.listen(port , () =>{
    console.log(`Server is Running on port number ${port}`)
})