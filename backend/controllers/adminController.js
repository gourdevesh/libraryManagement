const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).send('Invalid username or password');
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid username or password');
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.log(error)
    
    res.status(500).send('Error logging in');
  }
};

const createAdmin = async () => {
    try {
      const existingAdmin = await Admin.findOne({ username: 'gourdevesh@gmail.com' });
      if (existingAdmin) {
        console.log('Admin user already exists');
        return;
      }
      const hashedPassword = await bcrypt.hash('1234', 10); // Replace '1234' with an actual password
      const admin = new Admin({ username: 'gourdevesh@gmail.com', password: hashedPassword });
      await admin.save();
      console.log('Admin user created successfully');
    } catch (error) {
      console.error('Error creating admin user:', error);
    }
  };
  

module.exports = { loginAdmin, createAdmin };
