const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signUpUser = async (req, res) =>{
    try {
        const {name, email, password} = req.body;

        const exitUser = await User.findOne({email})
        if(exitUser) {
            res.status(400).json({message: "user is already exit"})
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({name, email, password: hashPassword})
        newUser.save()

        const token = jwt.sign({userId: newUser._id}, 'izhar', {expiresIn: '1h'})

        res.status(200).json({message: "user register successfully", token})

    } catch (error) {
        res.status(500).json({message: "server error", error})
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({message: "user not exit"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(400).json({message: "password is wrong"})
        }

        const token = jwt.sign({userId: user._id}, 'izhar', {expiresIn: '1h'})

        res.status(200).json({message: "Login successful", token})
    } catch (error) {
        res.status(500).json({message: "Sever error", error})
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        if(!users) {
            res.status(400).json({message: "users not exit"})
        }

        res.status(200).json(users)


    } catch (error) {
        res.status(500).json({postMessage: "Server error", error})
    }
}

module.exports = {signUpUser, loginUser, getUsers}