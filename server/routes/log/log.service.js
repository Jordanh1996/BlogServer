const _ = require('lodash');
const User = require('../../models/user');

const lodashBodyPicker = (body) => {
    const pickedBody = _.pick(body, ['username', 'password']);
    return pickedBody;
};

// const removeToken = (id) => new Promise((resolve, reject) => {
//     User.findById(id).then((user) => {
//         user.update({ token: null }, { fields: ['token'] }).then(() => {
//             resolve();
//         });
//     });
// });

const removeToken = (user) => user.update({ token: null }, { fields: ['token'] });

module.exports = {
    lodashBodyPicker,
    removeToken
};
