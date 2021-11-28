const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/', userController.getUsers);
router.post('/signup', userController.signUpUser);
router.post('/login', userController.loginUser);

module.exports = router;
