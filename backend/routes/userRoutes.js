const express = require('express');
const { borrowBook, returnBook, getBorrowedBooks } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const router = express.Router();

router.get('/borrowedBooks', getBorrowedBooks);
router.post('/borrow/:bookId/:userId',upload.single('image'), borrowBook);
router.post('/return/:id', returnBook);
module.exports = router;
