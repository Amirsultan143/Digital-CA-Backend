const Joi = require('joi');

const invoiceSchema = Joi.object({
    client: Joi.string().required(),
    amount: Joi.number().min(0).required(),
    issueDate: Joi.date().required(),
    dueDate: Joi.date().required(),
    status: Joi.string().valid('pending', 'paid').required()
});

module.exports = invoiceSchema;