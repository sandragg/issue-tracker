const express = require('express');
const fieldRouter = express.Router();
const { models } = require('../models');
const { Field } = models;

fieldRouter.get('/:model', (req, res) => {
    const { model } = req.params;
    let fields = null;
    let selectFields = null;

    Field.findAll({ where: { model } })
        .then(data => {
            fields = data;
            selectFields = fields.filter(
                field => field.type === 'select'
            );

            return Promise.all(
                selectFields.map(field =>
                    models[getModelName(field.key)].findAll()
                )
            );
        })
        .then(selectOpts => {
            selectFields.forEach((field, index) => {
                field.dataValues.options = selectOpts[index];
            });
            res.send(fields);
        })
        .catch(err => res.status(500).send(err));
});

function getModelName(key) {
    return key[0].toUpperCase() + key.slice(1);
}

module.exports = fieldRouter;
