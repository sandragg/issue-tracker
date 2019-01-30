const { User } = require('../models').models;

module.exports = (req, res) => {
    const { login, password } = req.body;

    User.findByPk(login)
        .then(user => {
            if (user && user.password === password) {
                return res.send({ id: user.id, name: user.name });
            }
            res.status(403).send('Wrong login or password');
        })
        .catch(err => res.status(500).send(err))
};
