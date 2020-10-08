const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const AuthService = require('../services/auth.service');

router.post('/signup', [], async (req, res) => {
    try {
        const { value, error } = await AuthService.registerUser(req.body);
        if (error || !value) {
            res.status(400).json({
                message: 'User registration failed!',
                response: error
            })
        } else {
            res.status(200).json({
                message: 'User registered successfully!',
                response: value
            })
        }
    } catch (error) {
        res.status(400).json({
            message: 'User registration failed!',
            response: error
        })
    }
});

router.post('/signin', [], async (req, res) => {
    try {
        const { value, error } = await AuthService.loginUser(req.body);
        if (error || !value) {
            res.status(400).json({
                messaage: 'User login failed!',
                error: error
            })
        } else {
            const token = jwt.sign({ _id: value._id }, process.env.SECRET);

            res.cookie('token', token, { expire: new Date() + 9999 })

            res.status(200).json({
                message: 'User logged in successfully!',
                response: value,
                token: token
            })
        }
    } catch (error) {
        res.status(400).json({
            messaage: 'User login failed!',
            error: error
        })
    }
})

module.exports = router;