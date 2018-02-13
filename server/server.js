require('./config/config')

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');

const {mongoose} = require('./db/mongoose');
const blogRoute = require('./routes/blog');
const logRoute = require('./routes/log');
const registerRoute = require('./routes/register');

var app = express();
var port = process.env.PORT

var serverOptions = {
        origin: ['http://localhost:8080', 'https://blog-jordan.herokuapp.com'],
        methods: ['GET', 'POST', 'DELETE', 'PATCH'],
        allowedHeaders: ['x-auth', 'Content-Type'],
        exposedHeaders: 'x-auth',
        credentials: true,
        preflightContinue: true
}


app.options('*', cors(serverOptions))

app.use(bodyParser.json())



app.use('/blog', blogRoute);
app.use('/log', logRoute);
app.use('/register', registerRoute);

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})
