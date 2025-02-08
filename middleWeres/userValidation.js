const Joi = require("joi");

// User Validation Schema
const userSchemaValidation = Joi.object({
    name: Joi.string().min(3).max(20).required().pattern(/^\S+$/).messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name cannot be longer than 20 characters",
        "any.required": "Name is Required",
        "string.pattern.base": "Name cannot contain spaces",
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com"] } }).pattern(/^\S+$/).required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format. Please enter a valid email (e.g., user@example.com).",
        "any.required": "Email is Required",
        "string.pattern.base": "Email cannot contain spaces",
    }),
    password: Joi.string().min(6).required().pattern(/^\S+$/).messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
        "any.required": "Password is Required",
        "string.pattern.base": "Password cannot contain spaces",
    }),
    role: Joi.string().valid("admin", "staff", "guest").default("guest").messages({
        "any.only": "Role must be either admin, staff, or guest",
        "any.required": "Role is Required",
    }),

    subRole: Joi.alternatives().conditional("role", [
        {
            is: "staff",
            then: Joi.alternatives()
                .conditional(Joi.ref("$isUpdate"), {
                    is: true,
                    then: Joi.string().valid("manager", "receptionist", "housekeeping").required()
                        .messages({ "any.required": "subRole is required for staff users during update" }),
                    otherwise: Joi.valid(null) 
                }),
        },
        { is: Joi.valid("admin", "guest"), then: Joi.forbidden() }
    ]),
});


const validateUser = (isUpdate = false) => (req, res, next) => {
    const { error } = userSchemaValidation.validate(req.body, { abortEarly: false, context: { isUpdate } });
    if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ errors });
    }
    next();
};


// Validate user input
module.exports = validateUser;