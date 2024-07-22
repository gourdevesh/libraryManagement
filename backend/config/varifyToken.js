const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ status: 401, message: "Unauthorized, no token provided" });
        }
        const token = authHeader

        if (!token) {
            return res.status(401).json({ status: 401, message: "Unauthorized, no token provided" });
        }

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        const rootUser = await User.findOne({ _id: verifiedToken.userId });

        if (!rootUser) {
            throw new Error("User not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
    } catch (error) {
        res.status(401).json({ status: 401, message: "Unauthorized, invalid token" });
    }
};

module.exports = verifyToken;
