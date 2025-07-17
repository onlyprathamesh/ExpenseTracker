require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).send({msg:"Unauthorized: No token provided."});

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).send({msg:"Token is invalid or expired.", error:error.message});
    }
};

module.exports = {verifyToken};