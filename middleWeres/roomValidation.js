const Joi = require("joi");

const roomSchemaValidation = Joi.object({
    roomType: Joi.string().min(3).max(20).required().messages({
        "string.empty": "Room type is required",
        "string.min": "Room type must be at least 3 characters",
        "string.max": "Room type cannot exceed 20 characters",
    }),
    status: Joi.string().valid("available", "occupied", "cleaning", "maintenance").messages({
        "any.only": "Status must be one of: available, occupied, cleaning, maintenance",
    }),
    pricePerNight: Joi.number().min(1).required().messages({
        "number.base": "Price per night must be a number",
        "number.min": "Price per night must be at least 1",
        "any.required": "Price per night is required",
    }),
    capacity: Joi.number().min(1).required().messages({
        "number.base": "Capacity must be a number",
        "number.min": "Capacity must be at least 1",
        "any.required": "Capacity is required",
    }),
});


const validateRoom = (req, res, next) => {
    const { error } = roomSchemaValidation.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }
    next();
  };
  


module.exports = validateRoom;
