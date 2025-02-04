const Joi = require("joi");

const housekeepingSchemaValidation = Joi.object({
    roomId: Joi.string().required().messages({
        "string.empty": "Room ID is required",
    }),
    assignedTo: Joi.string().required().messages({
        "string.empty": "Assigned user ID is required",
    }),
    taskStatus: Joi.string().valid("pending", "in progress", "completed").messages({
        "any.only": "Status must be one of: pending, in progress, completed",
    }),
    scheduledTime: Joi.date().iso().required().messages({
        "date.base": "Scheduled time must be a valid date",
        "any.required": "Scheduled time is required",
    }),
    completedTime: Joi.date().iso().optional().messages({
        "date.base": "Completed time must be a valid date",
    }),
});

const validateHousekeeping = (req, res, next) => {
    const { error } = housekeepingSchemaValidation.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }
    next();
};

module.exports = validateHousekeeping;
