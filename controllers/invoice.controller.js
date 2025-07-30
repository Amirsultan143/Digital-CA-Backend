const Invoice = require('../models/invoice.model');

// Create
exports.createInvoice = async (req, res) => {
    try {
        const { client, amount, issueDate, dueDate, status } = req.body;

        const invoice = await Invoice.create({
            client,
            createdBy: req.user._id,
            amount,
            issueDate,
            dueDate,
            status
        });

        res.status(201).json(invoice);
    } catch (err) {
        res.status(500).json({ message: 'Error creating invoice', error: err.message });
    }
};

// Get All (CA sees all created by them, client sees own)
exports.getInvoices = async (req, res) => {
    try {
        const filter = req.user.role === 'ca' ?
            { createdBy: req.user._id } :
            { client: req.user._id }; // Assuming client _id === client._id

        const invoices = await Invoice.find(filter).populate('client', 'name email');
        res.status(200).json(invoices);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching invoices', error: err.message });
    }
};

// Get by ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('client');

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        if (
            req.user.role === 'ca' && invoice.createdBy.toString() !== req.user._id ||
            req.user.role === 'client' && invoice.client.toString() !== req.user._id
        ) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.status(200).json(invoice);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching invoice', error: err.message });
    }
};

// Update
exports.updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            req.body,
            { new: true }
        );

        if (!invoice) return res.status(404).json({ message: 'Invoice not found or not yours' });

        res.status(200).json(invoice);
    } catch (err) {
        res.status(500).json({ message: 'Error updating invoice', error: err.message });
    }
};

// Delete
exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });

        if (!invoice) return res.status(404).json({ message: 'Invoice not found or not yours' });

        res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting invoice', error: err.message });
    }
};
