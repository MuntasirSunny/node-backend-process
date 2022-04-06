const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
var cors = require('cors');
var corsOptions = require('../../coreoptions');

// Routes
router.get('/', homeController.home);
router.get('/testing', cors(corsOptions), homeController.testingController);
router.post('/', homeController.getBody);

module.exports = router;
