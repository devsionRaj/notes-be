const User = require('../model/user');

const registerUser = async (user) => {
    try {
        if (user) {
            const checkUser = await User.findOne({ $or: [{ username: user.username }, { email: user.email }] })
            if (!checkUser) {
                const register = await User.create(user);
                return { value: register }
            } else {
                return { error: 'User already exists!' }
            }
        }
    } catch (error) {
        return { error: error }
    }
}

const getUser = async ({ emailOrUsername, password }) => {
    try {
        if (!emailOrUsername || !password) {
            return { error: 'Please enter valid credentials!' }
        }
        const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
        if (!user) {
            return { error: 'User not found!' }
        } else {
            if (!user.authenticate(password)) {
                return { error: 'Email and password do not match' }
            }
            return { value: user }
        }
    } catch (error) {
        return { error: error }
    }
}

const getUserById = async (uid) => {
    try {
        if (uid) {
            const user = await User.findById(uid);
            return { value: user }
        } else {
            return { error: 'User Id not found' }
        }
    } catch (error) {
        return { error: error }
    }
}

module.exports = {
    registerUser,
    getUser,
    getUserById
}