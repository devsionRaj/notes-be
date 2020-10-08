const UserDao = require('../dao/user');

const getUserById = async (uid) => {
    try {
        const { value, error } = await UserDao.getUserById(uid);
        if (!value || error) {
            return { error: error }
        }
        return { value: value }
    } catch (error) {
        return { error: error }
    }
}

module.exports = {
    getUserById
}