const express = require('express');
const userRouter = express.Router();
const { User } = require('../models').models;

userRouter.post('/', (req, res) => {
    const { userData } = req.body;

    if (!userData) {
        return res.sendStatus(400);
    }

    User.findByPk(userData.login)
        .then(user => {
            if (user) {
                return res.send('User already exists');
            }
            User.create(userData)
                .then(({ login }) => res.send({ login }));
        })
        .catch(err => res.status(500).send(err))
});

userRouter.get('/', (req, res) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(err => res.status(500).send(err));
});

userRouter.get('/:login', (req, res) => {
    const { login } = req.params;

    User.findByPk(login)
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err));
});

userRouter.put('/:login', (req, res) => {
    const { login } = req.params;
    const { userData } = req.body;

    if (!userData) {
        return res.sendStatus(400);
    }

    User.findByPk(login)
        .then(user => {
            if (!user) {
                return res.send('User doesn\'t exist');
            }
            user.update(userData)
                .then(() => res.send({ login }));
        })
        .catch(err => res.status(500).send(err));
});

module.exports = userRouter;
