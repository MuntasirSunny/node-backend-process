const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/check-auth');

// Routes
router.get('/', checkAuth, userController.getUsers);
router.post('/signup', userController.signUpUser);
router.post('/login', userController.loginUser);

module.exports = router;
