const express = require('express');
const issueRouter = express.Router();
const {
    Issue,
    IssueHistory
} = require('../models').models;

issueRouter.post('/', (req, res) => {
    const issueData = req.body;
    let newIssue;

    if (!issueData) {
        return res.sendStatus(400);
    }

    Issue.create(issueData)
        .then(issue => {
            newIssue = issue;
            issue.setUser(issueData.user);
            issue.setStatus(issueData.status);
            issue.setUrgency(issueData.urgency);
            issue.setCriticality(issueData.criticality);

            return createHistoryRecord(issue, 'New issue');
        })
        .then(() => res.send({ id: newIssue.id }))
        .catch(err => res.status(500).send(err));
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
            issue: id
        }
    });

    Promise.all([
        issuePromise,
        issueHistPromise
    ])
        .then(data =>
            data[0]
                ? res.send(data)
                : res.status(422).send('Issue doesn\'t exist')
        )
        .catch(err => res.status(500).send(err));
});

issueRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { data, comment } = req.body;

    if (!data) {
        return res.sendStatus(400);
    }

    Issue.findByPk(id)
        .then(issue =>
            !issue
                ? res.status(422).send('Issue doesn\'t exist')
                : Promise.all([
                    issue.update(data),
                    createHistoryRecord(issue, comment)
                ])
                    .then(() => res.send({ id }))
        )
        .catch(err => res.status(500).send(err));
});

function createHistoryRecord(issue, comment) {
    return IssueHistory.create({
        date: issue.date,
        comment
    })
        .then(issueHist => {
            issueHist.setUser(issue.user_login);
            issueHist.setIssue(issue.id);
            issueHist.setStatus(issue.status);
        })
}

module.exports = issueRouter;
