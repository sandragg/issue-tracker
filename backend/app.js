const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
    issueRouter,
    userRouter,
    fieldRouter
} = require('./routes');
const authorize = require('./services/authorize');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

app.post('/login', authorize);
app.use('/issue', issueRouter);
app.use('/user', userRouter);
app.use('/field', fieldRouter);

app.listen(port, () => console.log(`Express app listening on localhost:${port}`));
