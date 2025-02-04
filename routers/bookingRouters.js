const express = require("express");
const { addBooking, getAllBookings, getBookingById, updateBooking, deleteBooking} = require("../controllers/bookingControllers");
const validateBooking = require("../middleWeres/bookingValidation")
const authUser = require("../middleWeres/authMiddleWere");


const router = express.Router();


router.post("/", validateBooking , addBooking);
router.get("/" , getAllBookings );
router.get("/:id" , getBookingById );
router.put("/:id", validateBooking , updateBooking );
router.delete("/:id" , deleteBooking );


module.exports = router;
