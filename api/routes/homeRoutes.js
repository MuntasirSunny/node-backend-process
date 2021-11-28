const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Routes
router.get('/', homeController.home);
router.get('/testing', homeController.testingController);
router.post('/', homeController.getBody);

module.exports = router;
