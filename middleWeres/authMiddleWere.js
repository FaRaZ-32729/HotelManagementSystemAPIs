const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const authUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ msg: "Invalid User" });
        }

        const { _id } = jwt.verify(token, "diclofenicSodiun");

        const authanticatedUser = await userModel.findById(_id);

        if (!authanticatedUser) {
            return res.status(404).json({ msg: "User Not Found" });
        }

        req.authanticatedUser = authanticatedUser;
        next();

    } catch (error) {
        return res.status(500).json({ msg: "An Error Occured In Verifying User" })
    }
};

// Middleware to check if user has a required role
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.authanticatedUser || !roles.includes(req.authanticatedUser.role)) {
            return res.status(403).json({ msg: "Forbidden: You don't have access" });
        }
        next();
    };
};

// Middleware to check subRole for staff
const checkSubRole = (subRoles) => {
    return (req, res, next) => {
        if (!req.authanticatedUser || !subRoles.includes(req.authanticatedUser.subRole)) {
            return res.status(403).json({ msg: "Forbidden: You don't have access" });
        }
        next();
    };
};



module.exports = { authUser, checkRole, checkSubRole };