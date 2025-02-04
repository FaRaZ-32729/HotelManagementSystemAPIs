const Joi = require("joi");

const billingSchemaValidation = Joi.object({
    bookingId: Joi.string().required().messages({
        "string.empty": "Reservation ID is required",
        "any.required": "Reservation ID is required"
    }),
    guestId: Joi.string().required().messages({
        "string.empty": "Guest ID is required",
        "any.required": "Guest ID is required"
    }),
    roomCharges: Joi.number().required().messages({
        "number.base": "Room charges must be a number",
        "any.required": "Room charges are required"
    }),
    additionalCharges: Joi.number().default(0).messages({
        "number.base": "Additional charges must be a number"
    }),
    totalAmount: Joi.number().required().messages({
        "number.base": "Total amount must be a number",
        "any.required": "Total amount is required"
    }),
    paymentMethod: Joi.string().valid("credit", "debit", "paypal").required().messages({
        "string.empty": "Payment method is required",
        "any.required": "Payment method is required",
        "any.only": "Payment method must be one of 'credit', 'debit', or 'paypal'"
    }),
    paymentStatus: Joi.string().valid("paid", "pending").default("pending").messages({
        "string.empty": "Payment status is required",
        "any.only": "Payment status must be 'paid' or 'pending'"
    })
});

const validateBilling = (req, res, next) => {
    const { error } = billingSchemaValidation.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }
    next();
};

module.exports = validateBilling;
