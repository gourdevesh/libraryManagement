const BorrowedBook = require('../models/BorrowedBook');

const borrowBook = async (req, res) => {
  const { bookId, userId } = req.params;
  console.log(bookId, userId);

  try {
    const borrowedBook = new BorrowedBook({ book: bookId, borrowedBy: userId });
    await borrowedBook.save();
    
    res.status(201).json({
      status: 'true',
      message: 'Book borrowed successfully',
      borrowedBook
    });
  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).json({ 
      status: 'false',
      message: 'Server error'
    });
  }
};



const returnBook = async (req, res) => {
  const { id } = req.params;
  try {
    const borrowedBook = await BorrowedBook.findOneAndDelete({book: id });
    if (!borrowedBook) {
      return res.status(404).json({ message: 'Book not borrowed' });
    }
    res.status(201).json({
      status: 'true',
      message: 'Book returned',
      borrowedBook
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};

const getBorrowedBooks = async (req, res) => {
  try {
    const borrowedBooks = await BorrowedBook.find().populate('book').populate('borrowedBy');
    res.json(borrowedBooks);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { borrowBook, returnBook, getBorrowedBooks };
