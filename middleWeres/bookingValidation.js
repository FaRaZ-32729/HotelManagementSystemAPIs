const Joi = require("joi");

const bookingValidationSchema = Joi.object({
    guestId: Joi.string().required().messages({
        "string.empty": "Guest ID is required",
        "any.required": "Guest ID is required"
    }),
    roomId: Joi.string().required().messages({
        "string.empty": "Room ID is required",
        "any.required": "Room ID is required"
    }),
    checkInDate: Joi.date().required().messages({
        "date.base": "Check-in date must be a valid date",
        "any.required": "Check-in date is required"
    }),
    checkOutDate: Joi.date().greater(Joi.ref("checkInDate")).required().messages({
        "date.base": "Check-out date must be a valid date",
        "date.greater": "Check-out date must be after check-in date",
        "any.required": "Check-out date is required"
    }),
    numberOfGuests: Joi.number().min(1).required().messages({
        "number.base": "Number of guests must be a number",
        "number.min": "Number of guests must be at least 1",
        "any.required": "Number of guests is required"
    }),
    status: Joi.string().valid("confirmed", "canceled", "checked-in", "checked-out").messages({
        "any.only": "Status must be one of: confirmed, canceled, checked-in, checked-out"
    }),
    totalAmount: Joi.number().min(0).required().messages({
        "number.base": "Total amount must be a number",
        "number.min": "Total amount must be at least 0",
        "any.required": "Total amount is required"
    }),
});

const validateBooking = (req, res, next) => {
    const { error } = bookingValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    next();
};

module.exports = validateBooking;
