const mongoose = require('mongoose');

const BorrowedBookSchema = new mongoose.Schema({
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, 
   book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  image:{ typr:String},
  borrowedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BorrowedBook', BorrowedBookSchema);



