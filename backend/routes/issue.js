const express = require('express');
const issueRouter = express.Router();
const {
    Issue,
    IssueHistory
} = require('../models').models;

// TODO need fixes in post/put methods
issueRouter.post('/', (req, res) => {
    const { issueData } = req.body;
    let newIssue;

    if (!issueData) {
        return res.sendStatus(400);
    }

    Issue.create(issueData)
        .then(issue => {
            newIssue = issue;
            return IssueHistory.create({ date: newIssue.date })
        })
        .then(issueHist => {
            issueHist.setUser(newIssue.userLogin);
            issueHist.setIssue(newIssue.id);
            issueHist.setStatus(newIssue.statusId);
            res.send({ id: newIssue.id });
        })
        .catch(err => res.status(500).send(err))
});

issueRouter.get('/', (req, res) => {
    Issue.findAll()
        .then(issues => res.send(issues))
        .catch(err => res.status(500).send(err));
});

issueRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const issuePromise = Issue.findByPk(id);
    const issueHistPromise = IssueHistory.findAll({
        where: {
            issueId: id
        }
    });

    Promise.all([
        issuePromise,
        issueHistPromise
    ])
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err));
});

issueRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { issueData, comment } = req.body;

    if (!issueData) {
        return res.sendStatus(400);
    }

    Issue.findByPk(id)
        .then(issue => {
            if (!issue) {
                return res.send('Issue doesn\'t exist');
            }
            Promise.all([
                issue.update(issueData),
                // IssueHistory.create()
            ]).then(data =>
                res.send({ id: data[0].id }
            ));
        })
        .catch(err => res.status(500).send(err));
});

module.exports = issueRouter;
