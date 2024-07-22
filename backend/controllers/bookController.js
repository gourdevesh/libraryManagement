const Book = require('../models/Book');

const addBook = async (req, res) => {
  const { title, author, availableCopies } = req.body;
  const image = req.file ? req.file.path : null;
  try {
    const newBook = new Book({ title, author, availableCopies, image });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).send('Error adding book');
  }
};

const editBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, availableCopies } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(id, { title, author, availableCopies }, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).send('Error fetching book');
  }
};


module.exports = { addBook, editBook, deleteBook, getBooks,getBookById };
