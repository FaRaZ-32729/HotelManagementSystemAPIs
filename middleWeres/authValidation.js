const Joi = require("joi");

const loginSchema = Joi.object({
    email: Joi.string().email().pattern(/^\S+$/).required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
        "string.pattern.base": "Email cannot contain spaces",
    }),
    password: Joi.string().min(6).pattern(/^\S+$/).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
        "string.pattern.base": "Password cannot contain spaces",
    }),
});

const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }
    next();
};

module.exports = validateLogin;
