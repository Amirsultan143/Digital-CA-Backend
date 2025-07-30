const express = require('express');
const { signup , login } = require('../controllers/auth.controller')
const router = express.Router();
const validate = require('../middlewares/validate.middleware');     
const signupSchema = require('../validators/auth.validator');


router.post('/signup',validate(signupSchema), signup);
router.post('/login', login);

module.exports = router;