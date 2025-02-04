const bookingModel = require("../models/bookingModel");

const addBooking = async (req, res) => {
    try {
        const { guestId, roomId, checkInDate, checkOutDate, numberOfGuests, status, totalAmount } = req.body;

        const newBooking = await bookingModel.create({
            guestId,
            roomId,
            checkInDate,
            checkOutDate,
            numberOfGuests,
            status,
            totalAmount
        });

        return res.status(201).json({ msg: "Booking Created Successfully", booking: newBooking });

    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Creating Booking", error: error.message });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find().populate("guestId roomId");
        return res.status(200).json({ bookings });

    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Fetching Bookings", error: error.message });
    }
};

const getBookingById = async (req, res) => {
    try {
        const booking = await bookingModel.findById(req.params.id).populate("guestId roomId");

        if (!booking) return res.status(404).json({ msg: "Booking Not Found" });

        return res.status(200).json({ booking });

    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Fetching Booking", error: error.message });
    }
};

const updateBooking = async (req, res) => {
    try {
        const updatedBooking = await bookingModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedBooking) return res.status(404).json({ msg: "Booking Not Found" });

        return res.status(200).json({ msg: "Booking Updated Successfully", booking: updatedBooking });

    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Updating Booking", error: error.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await bookingModel.findByIdAndDelete(req.params.id);
        if (!deletedBooking) return res.status(404).json({ msg: "Booking Not Found" });

        return res.status(200).json({ msg: "Booking Deleted Successfully" });

    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Deleting Booking", error: error.message });
    }
};

module.exports = { addBooking, getAllBookings, getBookingById, updateBooking, deleteBooking };
