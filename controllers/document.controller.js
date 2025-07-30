const Document = require('../models/document.model');

exports.uploadDocument = async (req, res) => {
    try {
        const { clientId, documentType } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'File is required' });
        }

        const newDoc = await Document.create({
            client: clientId,
            uploadedBy: req.user._id,
            filename: req.file.filename,
            originalName: req.file.originalname,
            documentType
        });

        res.status(201).json(newDoc);
    } catch (err) {
        res.status(500).json({ message: 'Document upload failed', error: err.message });
    }
};

exports.getDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ uploadedBy: req.user._id }).populate('client', 'name');
        res.status(200).json(documents);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching documents', error: err.message });
    }
};
