const service = require('./register.service');
const validator = require('validator');

const Register = (req, res) => {
    const body = service.bodyPicker(req.body);
    const user = service.createUser(body)
    user.save().then(() => {
        return user.generateAuthToken()
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((e) => {
        res.status(400).send()
    })
}

const CheckUsername = (req, res) => {
    const username = service.getUsernameByParams(req);
    if (service.validateUsername(username)) {
        return res.status(400).send()
    }

    service.checkUsername(username)
        .then((user) => {
            if (user) {
                return res.send(false)
            }
            res.send(true)
        }).catch((e) => {
            res.status(400)
        })
}

const CheckEmail = (req, res) => {
    if (!validator.isEmail(req.body.email)) {
        return res.status(400).send()
    }

    service.checkEmail(req.body.email)
        .then((email) => {
            if (email) {
                return res.send(false)
            }
            res.send(true)
        }).catch((e) => {
            res.status(400)
        })
}


module.exports = {
    Register,
    CheckUsername,
    CheckEmail
}