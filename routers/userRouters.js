const express = require("express");
const validateUser = require("../middleWeres/userValidation");
const {registerUser , getAllUsers , getUserById , deleteUser , updateUser} = require("../controllers/userControllers");

const router = express.Router();


router.post("/" ,validateUser(false), registerUser);
router.get("/:id" ,  getUserById);
router.get("/" , getAllUsers);
router.put("/:id" , validateUser(true), updateUser);
router.delete("/:id" , deleteUser);

module.exports = router;