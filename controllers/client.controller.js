const Client = require('../models/client.model');

// Create Client
exports.createClient = async (req, res) => {
    try {
        const { name, email, phone, company, gstNumber } = req.body;

        const client = await Client.create({
            name,
            email,
            phone,
            company,
            gstNumber,
            createdBy: req.user._id
        });

        res.status(201).json(client);
    } catch (err) {
        res.status(500).json({ message: 'Error creating client', error: err.message });
    }
};

// Get all clients for logged-in CA
exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find({ createdBy: req.user._id });
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching clients', error: err.message });
    }
};

// Get single client by ID
exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findOne({ _id: req.params.id, createdBy: req.user._id });
        if (!client) return res.status(404).json({ message: 'Client not found' });

        res.status(200).json(client);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching client', error: err.message });
    }
};

// Update client
exports.updateClient = async (req, res) => {
    try {
        const client = await Client.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            req.body,
            { new: true }
        );
        if (!client) return res.status(404).json({ message: 'Client not found' });

        res.status(200).json(client);
    } catch (err) {
        res.status(500).json({ message: 'Error updating client', error: err.message });
    }
};

// Delete client
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
        if (!client) return res.status(404).json({ message: 'Client not found' });

        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting client', error: err.message });
    }
};
