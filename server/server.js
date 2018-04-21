require('./config/config')

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');

const {mongoose} = require('./db/mongoose');
const blogRoute = require('./routes/blog');
const logRoute = require('./routes/log');
const registerRoute = require('./routes/register');

const app = express();
const port = process.env.PORT;


app.use(cors());

app.use(bodyParser.json());


app.use('/blog', blogRoute);
app.use('/log', logRoute);
app.use('/register', registerRoute);

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
