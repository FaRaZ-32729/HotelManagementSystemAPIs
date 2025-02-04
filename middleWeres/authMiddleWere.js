const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const authUser = async (req , res , next) => {
    try {
        const {token}= req.cookies;
        if (!token) {
            res.status(401).json({msg : "Invalid User"});   
        }

        const {_id} = jwt.verify(token , "diclofenicSodiun");

        const authanticatedUser = await userModel.findById(_id);

        if (!authanticatedUser) {
            return res.status(404).json({mag : "User Not Found"});
        }

        req.authanticatedUser = authanticatedUser;
        next();

    } catch (error) {
        return res.status(500).json({msg : "An Error Occured In Verifying User"})
    }
} 


module.exports = authUser;