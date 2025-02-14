const express = require("express");
const {loginUser, logoutUser} = require("../controllers/authControllers");
const validateLogin = require("../middleWeres/authValidation");



const router = express.Router();


router.post("/login",validateLogin , loginUser);
router.delete("/logout" , logoutUser);


module.exports = router;