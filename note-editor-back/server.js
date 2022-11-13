const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/connectDb');
const verifyJWT = require('./middleware/verifyJWT');
require('dotenv').config();
const User = require('./models/user');

connectDB();

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));

app.use(verifyJWT);

app.use('/notes', require('./routes/notes'));

mongoose.connection.once('open', async () => {
    console.log('db connected');
});

app.listen(3500, () => {
    console.log('server is running!')
});