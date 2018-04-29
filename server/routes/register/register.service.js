const _ = require('lodash');

const User = require('../../models/user');

const createUser = (body) => {
    const user = User.build(body);
    return user;
};

const bodyPicker = (body) => {
    const pickedbody = _.pick(body, ['email', 'username', 'password']);
    return pickedbody;
};

const getUsernameByParams = (req) => {
    const username = req.params.username;
    return username;
};

const validateUsername = (username) => {
    if (username.length < 6) {
        return true;
    }
};

const checkUsername = (username) => {
    return User.findAll({
        where: {
            username
        }
    });
};

const checkEmail = (email) => {
    return User.findAll({
        attributes: ['id'],
        where: {
            email
        }
    });
};


module.exports = {
    createUser,
    bodyPicker,
    getUsernameByParams,
    validateUsername,
    checkUsername,
    checkEmail
};
