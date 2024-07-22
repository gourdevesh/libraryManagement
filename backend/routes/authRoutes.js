const express = require('express');
const { register, login, valid } = require('../controllers/authController');
const { loginAdmin } = require('../controllers/adminController');
const {logout} = require('../controllers/authController');
const verifyToken = require('../config/varifyToken')
const {protect} = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin', loginAdmin);
router.get('/logout',verifyToken , logout);
router.get('/valid',verifyToken , valid);

module.exports = router;
