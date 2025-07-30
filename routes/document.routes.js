const express = require('express');
const router = express.Router();
const { uploadDocument, getDocuments } = require('../controllers/document.controller');
const { protect, authorizeRoles } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer.middleware');
const validate = require('../middlewares/validate.middleware');
const documentSchema = require('../validators/document.validator');


router.use(protect);
router.use(authorizeRoles('ca'));

router.post('/upload', validate(documentSchema), upload.single('file'), uploadDocument);
router.get('/', getDocuments);

module.exports = router;
