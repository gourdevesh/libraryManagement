const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const {createAdmin} = require('./controllers/adminController')
dotenv.config();

const app = express();

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);


// Body parser middleware
app.use(express.json());

// Routes
app.use(authRoutes);
app.use(bookRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 5000;

app.use('/uploads', express.static('uploads'));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected');
  // Uncomment to create admin user once, then comment out again
  await createAdmin();
})
.catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
