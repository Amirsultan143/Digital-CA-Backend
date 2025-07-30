const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        console.log("Validation error:", error);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
};

module.exports = validate;