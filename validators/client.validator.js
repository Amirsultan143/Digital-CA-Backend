const Joi = require('joi');

const clientSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    company: Joi.string().required(),
    gstNumber: Joi.string().required()
});

module.exports = clientSchema;