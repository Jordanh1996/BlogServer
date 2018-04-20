const _ = require('lodash');

const lodashBodyPicker = (body) => {
    const pickedBody = _.pick(body, ['username', 'password']);
    return pickedBody;
};


module.exports = {
    lodashBodyPicker
};
