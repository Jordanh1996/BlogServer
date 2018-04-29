const service = require('./register.service');
const validator = require('validator');

const Register = (req, res) => {
    const body = service.bodyPicker(req.body);
    const user = service.createUser(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send({
            created: true
        });
    }).catch(() => {
        res.status(400).send();
    });
};

const CheckUsername = (req, res) => {
    const username = service.getUsernameByParams(req);
    if (service.validateUsername(username)) {
        return res.status(400).send();
    }

    service.checkUsername(username).then((user) => {
        if (user.length > 0) {
            return res.send({ taken: true });
        }
        res.send({ taken: false });
    }).catch(() => {
            res.status(400);
    });
};

const CheckEmail = (req, res) => {
    if (!validator.isEmail(req.body.email)) {
        return res.status(400).send();
    }

    service.checkEmail(req.body.email).then((email) => {
        console.log(email)
        if (email.length > 0) {
            return res.send({ taken: true });
        }
        res.send({ taken: false });
    }).catch(() => {
        res.status(400);
    });
};


module.exports = {
    Register,
    CheckUsername,
    CheckEmail
};
