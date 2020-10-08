const UserDao = require('../dao/user');
const expressJwt = require('express-jwt');

const registerUser = async (user) => {
    try {
        const { value, error } = await UserDao.registerUser(user);
        if (error) {
            return { error: error }
        }
        return { value: value }
    } catch (error) {
        return { error: error }
    }
}

const loginUser = async (userCredentials) => {
    try {
        const { value, error } = await UserDao.getUser(userCredentials);
        if (error) {
            return { error: error }
        }
        return { value: value }
    } catch (error) {
        return { error: error }
    }
}

const isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: 'auth'
})

const isAuthenticated = async (req, res, next) => {
    let checkAuth = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checkAuth) {
        return res.status(403).json({
            error: 'ACCESS DENIED'
        });
    }
    next();
}

module.exports = {
    registerUser,
    loginUser,
    isSignedIn,
    isAuthenticated
}