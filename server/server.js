require('./config/config')

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const cors = require('cors')

var {mongoose} = require('./db/mongoose');
var {Blog} = require('./models/blog');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
var port = process.env.PORT

var serverOptions = {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['x-auth', 'Content-Type'],
    exposedHeaders: 'x-auth',
    credentials: true,
    preflightContinue: true
}

app.options('*', cors(serverOptions))

app.use(bodyParser.json())

// BLOG API'S

app.get('/blog/:id', (req, res) => {
    var id = req.params.id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Blog.findById(id).then((resblog) => {
        if (!resblog) {
            return res.status(404).send()
        }
        res.send({resblog})
    }).catch((e) => {
        res.status(400).send()
    })
})

app.get('/blog', (req, res) => {
    Blog.find().then((resblog) => {
        res.send({resblog})
    }).catch((e) => {
        res.status(400).send()
    })
})

app.post('/blog', authenticate, (req, res) => {
    var blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        _creator: req.user._id,
        _creatorUser: req.user.username
    })
    blog.save().then((resblog) => {
        res.send(resblog)
    }, (e) => {
        res.status(400).send(e)
    })
})

app.delete('/blog/:id', authenticate, (req, res) => {
    var id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    Blog.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((resblog) => {
        if (!resblog) {
            res.status(404).send()
        }
        res.send({resblog})
    }).catch((e) => {
        res.status(400).send()
    })
})

app.patch('/blog/:id', authenticate, (req, res) => {
    var id = req.params.id
    var body = _.pick(req.body, ['title', 'content'])
    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Blog.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
        },
            {
                $set: body
            },
                {
                    $new: true
                }
    ).then((resblog) => {
        if (!resblog) {
            return res.status(404).send()
        }
        
        res.send({resblog})
    }).catch((e) => {
        res.status(400).send()
    })
})

// CHANGING LOG STATE

app.post('/register', (req, res) => {
    var body = _.pick(req.body, ['email','username', 'password'])

    var user = new User(body)
    user.save().then(() => {
        return user.generateAuthToken()
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((e) => {
        res.status(400).send()
    })
})

app.post('/login', ccc, (req, res) => {
    var body = _.pick(req.body, ['username', 'password'])

    User.findByCredentials(body.username, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.send(user)
        })
    }).catch((e) => {
        res.status(400).send()
    })
})

app.delete('/logout', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send()
    }, () => {
        res.status(400).send()
    })
})



app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})