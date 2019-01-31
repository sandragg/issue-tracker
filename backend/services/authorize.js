const { User } = require('../models').models;

module.exports = (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.sendStatus(400);
    }

    User.findByPk(login)
        .then(user => {
            if (user && user.password === password) {
                return res.send({
                    login: user.login,
                    name: user.name,
                    surname: user.surname
                });
            }
            res.status(403).send('Wrong login or password');
        })
        .catch(err => res.status(500).send(err))
};
