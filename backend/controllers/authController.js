const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token ,status:"true" });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const valid = async(req,res)=>{
  try {
      const ValidUserOne = await User.findOne({_id:req.userId});
      res.status(201).json({status:201,ValidUserOne});
  } catch (error) {
      res.status(401).json({status:401,error});
      console.log(error)
  }
};

const logout = async (req,res)=>{
  try{
   res.status(200).send({ auth:false , token:null,message:"Successfully logged out." })

  }
  catch(e){
    console.log(e)
  }
}

module.exports = { register, login ,logout,valid};
