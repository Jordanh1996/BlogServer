const _ = require('lodash');

const lodashBodyPicker = (body) => {
    var body = _.pick(body, ['username', 'password'])
    return body
}


module.exports = {
    lodashBodyPicker
}