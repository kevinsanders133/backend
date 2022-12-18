const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const cors = require('cors');

const { db } = require('./db');
const { queries } = require('./queries');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/userService/register', (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const pass = req.body.pass;

    try {
        db.query(queries.register, [name, surname, email, pass], (err, _) => {
            if (err) throw err;
    
            res.sendStatus(200);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/userService/checkUserData', (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;

    try {
        db.query(queries.checkUserData, [email, pass], (err, result) => {
            if (err) throw err;
    
            let returnValue = false;
            if (result.length > 0) {
                returnValue = result;
            }

            res.send(returnValue);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/userService/getUsers', (req, res) => {
    const word = req.body.word;

    try {
        db.query(queries.getUsers, [`%${word}%`, `%${word}%`, `%${word}%`], (err, result) => {
            if (err) throw err;

            res.send(result);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/userService/checkEmailExists', (req, res) => {
    const email = req.body.email;

    try {
        db.query(queries.checkEmailExists, [email], (err, result) => {
            if (err) throw err;

            let returnValue = false;
            if (result[0].length > 0) {
                returnValue = true;
            }

            res.send(returnValue);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/userService/refreshOnline', (req, res) => {
    const id = req.body.id;

    const date = new Date();
    // const dateString = date.toLocaleDateString();

    try {
        db.query(queries.refreshOnline, [date, id], (err, _) => {
            if (err) throw err;

            res.sendStatus(200);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

server.listen(5002, () => {
    console.log('App "UserService" is running on port 5002.');
});