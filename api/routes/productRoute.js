const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const upload = require('../middleware/file-upload');
const productController = require('../controllers/productController');

// Routes
//router.get('/', checkAuth, userController.getUsers);
router.get('/', productController.productList);
router.post('/', checkAuth, upload.single('file'), productController.createProduct);

module.exports = router;
