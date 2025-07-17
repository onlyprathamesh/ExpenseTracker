const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken");
const { setTokenCookie, handleClearCookie } = require("../utils/cookie");

const registerUser = async (req, res) => {
    const {userName, password} = req.body;

    if (!userName || !password) return res.status(400).send({msg:"All fields are required"});

    const userExists = await User.findOne({userName});
    if (userExists) return res.status(400).send({msg:"User already exists"});

    try {
        const hashedPassword = await bcrypt.hash(password ,11);
        const userRegistered = await User.create({userName, password: hashedPassword});

        const token = generateToken(userRegistered._id, userRegistered.userName);
        setTokenCookie(res, token);
        res.status(200).send({msg:"User registered successfully"});
    } catch (error) {
        console.log("Error while registering user: ", error);
    }
};

const loginUser = async (req, res) => {
    const {userName, password} = req.body;

    if (!userName || !password) return res.status(400).send({msg:"All fields are required"});

    try {
        const userExists = await User.findOne({userName});
        if (!userExists) return res.status(400).send({msg:"User does not exists"});

        const validUser = await bcrypt.compare(password, userExists.password);
        if (validUser) {
            const token = generateToken(userExists._id, userExists.userName);
            setTokenCookie(res, token);
            return res.status(200).send({msg:"User logged in successfully"});

        } 
        return res.status(400).send({msg:"Failed to Log in"});
    } catch (error) {
        console.log("Error while logging in user: ", error);
    }
};

const logOutUser = async (req, res) => {
    try {
        handleClearCookie(res);
        return res.status(200).send({msg:"Logged out successfully"});
    } catch (error) {
        res.status(400).send({msg:"Error logging out", error});
    }
};

module.exports = { registerUser, loginUser, logOutUser };