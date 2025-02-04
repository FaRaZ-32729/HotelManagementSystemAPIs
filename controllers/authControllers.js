const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // if (!email || !password) {
        //     return res.status(400).json({ msg: "Email & Password are required" });
        // }

        const findUser = await userModel.findOne({ email });
        if (!findUser) return res.status(404).json({ msg: "User Not Found" });
        
        const matchPass = await bcrypt.compare(password , findUser.password);
        if (!matchPass) return res.status(401).json({msg : "Invalid Credentials"});

        const token =  jwt.sign({_id : findUser._id}, "diclofenicSodiun" );
        res.cookie("token",  token , {
            maxAge : 24 * 60 * 60 * 1000,
            httpOnly : "true",
            sameSite : "strict"
        });

        return res.status(200).json({ msg: "Login Successfull", findUser , token })

    } catch (error) {
        return res.status(500).json({ msg: "Error Occured While Loging In" });
    }
}


module.exports = loginUser;