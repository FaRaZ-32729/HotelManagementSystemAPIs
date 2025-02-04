const express = require("express");
const loginUser = require("../controllers/authControllers");
const validateLogin = require("../middleWeres/authValidation");



const router = express.Router();


router.post("/login", validateLogin , loginUser);


module.exports = router;