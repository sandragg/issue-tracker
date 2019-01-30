const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const issueRouter = require('./routes/issue');
const userRouter = require('./routes/user');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/issue', issueRouter);
app.use('/user', userRouter);

app.listen(port, () => console.log(`Express app listening on localhost:${port}`));
