const Joi = require('joi');

const reminderSchema = Joi.object({
    clientId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    dueDate: Joi.date().required()
});

module.exports = reminderSchema;