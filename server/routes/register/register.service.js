const _ = require('lodash');

const { User } = require('../../models/user');

const createUser = (body) => {
    const user = new User(body);
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
    return User.findOne({
        username  
    });
};

const checkEmail = (email) => {
    return User.findOne({
        email
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
