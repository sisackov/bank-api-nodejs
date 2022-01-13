const express = require('express');
const app = express();

const usersRouter = require('./routes/users');

app.use('/users', usersRouter); //chaining the users router to the app

app.listen(3000);
