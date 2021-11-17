const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    // To validate the login info, we can use: mongoose validation, Joi, or hardcode/throwing custom error by checking in the controller
    if (!username || !password) {
        throw new CustomAPIError('Please provide email and password', 400)
    }
    //only for demo
    const id = new Date().getDate()

    //JUST FOR DEMO!! for real app we need long and unguessable strings
    //normally we send back an id from database
    const token = jwt.sign({
        id,
        username
    }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
    console.log(username, password);
    res.status(200).json({
        msg: 'user created',
        token
    });
}

const dashboard = async (req, res) => {
    console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    });
}

module.exports = {
    login,
    dashboard
}