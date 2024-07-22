const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  availableCopies: { type: Number, required: true },
  image: { type: String }, // Add this line
});

module.exports = mongoose.model('Book', BookSchema);
