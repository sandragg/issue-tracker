issue-tracker
============
A system for tracking issues in a project provides you to record and store bugs/proposals detected during the testing process.
The interface consists of 3 windows:
- **Authorization**, where user enters credentials to log in the system. After successful authorization you will be redirected on an issue list page.
- **List** of all issues/users recorded in the system (main fields). To open/edit certain list item just click on an id field in the table.
- **Editor** to create the new item or edit existed. In addition, opening of the existed issue shows its history changes in the table. In issue only status can be changed!

![Gif](https://media.giphy.com/media/StKGzbSwSUBWhSG0RU/giphy.gif)

## Dependencies
`node` and `npm`

## Installation 
#### Backend
```
    cd ./backend
    npm i
    npm run start
```
#### Database
Install `SQLite` plugin in your IDE. You may be prompted to create an initial database in the system.
```
    cd ./backend
    npm run reset-db
```
#### Frontend
```
    cd ./frontend
    npm i
    npm start
```

## Stack
#### Frontend
- React
#### Backend
- Node.js
- Express
- Sequelize
- SQLite
