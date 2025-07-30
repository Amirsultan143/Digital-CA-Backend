const express = require('express');
const router = express.Router();
const {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient
} = require('../controllers/client.controller');

const { protect, authorizeRoles } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const clientSchema = require('../validators/client.validator');

router.use(protect); // All routes require login
router.use(authorizeRoles('ca')); // Only CA role allowed


router.post('/', validate(clientSchema), createClient);
router.get('/', getClients);
router.get('/:id', getClientById);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;
