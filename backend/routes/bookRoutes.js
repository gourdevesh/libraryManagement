const express = require('express');
const { addBook, editBook, deleteBook, getBooks,getBookById } = require('../controllers/bookController');
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

router.get('/books', getBooks);
router.post('/books', upload.single('image'), addBook);
router.get('/api/getBookById/:id', getBookById);

router.route('/api/books/:id')
  .put(editBook)
  .delete( deleteBook);

module.exports = router;
