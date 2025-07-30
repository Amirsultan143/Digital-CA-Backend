const express = require('express');
const router = express.Router();
const {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
} = require('../controllers/invoice.controller');

const { protect, authorizeRoles } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const invoiceSchema = require('../validators/invoice.validator');

router.use(protect);

// Read routes (both CA and client can use)
router.get('/', getInvoices);
router.get('/:id', getInvoiceById);

// CA-only access routes
router.post('/', authorizeRoles('ca'), validate(invoiceSchema), createInvoice);
router.put('/:id', authorizeRoles('ca'),  validate(invoiceSchema),updateInvoice);
router.delete('/:id', authorizeRoles('ca'), deleteInvoice);

module.exports = router;
