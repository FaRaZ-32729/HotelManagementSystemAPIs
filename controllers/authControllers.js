const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await userModel.findOne({ email });
        if (!findUser) return res.status(404).json({ msg: "User Not Found" });
        const matchPass = await bcrypt.compare(password, findUser.password);
        if (!matchPass) return res.status(401).json({ msg: "Invalid Credentials" });

        const token = jwt.sign(
            { _id: findUser._id, role: findUser.role, subRole: findUser.subRole },
            "diclofenicSodiun",
            { expiresIn: "1h" }
        );
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: "true",
            sameSite: "strict"
        });

        return res.status(200).json({ msg: "Login Successful", data:findUser , role: findUser.role, subRole: findUser.subRole });


    } catch (error) {
        return res.status(500).json({ msg: "Error Occured While Loging In" });
    }
}


const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
        return res.status(200).json({ msg: "Logout Successful" });
    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Logging Out" });
    }
};

module.exports ={ loginUser , logoutUser };