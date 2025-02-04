const express = require("express");
const validateRoom = require("../middleWeres/roomValidation");
const {addRoom , getAllRoom , updateRoom , deleteRoom} = require("../controllers/roomControllers");
const router = express.Router();

router.post("/" , validateRoom , addRoom );
router.get("/" , getAllRoom );
router.put("/:id" , validateRoom , updateRoom);
router.delete("/:id" , deleteRoom);

module.exports = router;