const express = require("express");
const validateUser = require("../middleWeres/userValidation");
const {registerUser , getAllUsers , getUserById , deleteUser , updateUser} = require("../controllers/userControllers")

const router = express.Router();


router.post("/" ,validateUser, registerUser);
router.get("/:id" , getUserById);
router.get("/" , getAllUsers);
router.put("/:id" , validateUser, updateUser);
router.delete("/:id" , deleteUser);


module.exports = router;