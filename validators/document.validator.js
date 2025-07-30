const Joi = require('joi');

const documentSchema = Joi.object({
    clientId: Joi.string().required(),
    documentType: Joi.string().required()
    // file field multer handle karta hai, isliye yahan nahi
});

module.exports = documentSchema;