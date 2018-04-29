require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./db/mysql');
const blogRoute = require('./routes/blog');
const messageRoute = require('./routes/message');
const logRoute = require('./routes/log');
const registerRoute = require('./routes/register');
const uploadRoute = require('./routes/upload');

const app = express();
const port = process.env.PORT;

sequelize.authenticate().then(() => console.log('Connection has established')).catch(() => console.log('unable to conntet'));
sequelize.sync();


app.use(cors());

app.use(bodyParser.json());


app.use('/blog', blogRoute);
// app.use('/message', messageRoute);
app.use('/log', logRoute);
app.use('/register', registerRoute);
app.use('/upload', uploadRoute);

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
