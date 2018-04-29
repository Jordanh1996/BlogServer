const service = require('./log.service');
const { User } = require('../../models');

const LogIn = (req, res) => {
    const body = service.lodashBodyPicker(req.body);
    User.findByCredentials(body.username, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch(() => {
        res.status(400).send();
    });
};

const LogOut = (req, res) => {
    service.removeToken(req.user).then(() => {
        res.status(200).send();
    }).catch(() => {
        res.status(400).send();
    });
};


module.exports = {
    LogIn,
    LogOut
};
