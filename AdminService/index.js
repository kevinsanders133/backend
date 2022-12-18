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

app.post('/adminService/isQueryExist', (req, res) => {
    const email = req.body.email;

    try {
        db.query(queries.isQueryExist, [email], (err, result) => {
            if (err) throw err;

            let message = false;

            if (result[0].count === 0) {
                message = true;
            }

            res.send(message);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/adminService/getCountQueries', (_, res) => {
    try {
        db.query(queries.getCountQueries, (err, result) => {
            if (err) throw err;
            console.log(result);

            res.send(result[0].count);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/adminService/deleteQuery', (req, res) => {
    const id = req.body.id;

    try {
        db.query(queries.deleteQuery, [id], (err, _) => {
            if (err) throw err;

            res.sendStatus(200);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/adminService/transferQuery', async (req, res) => {
    const id = req.body.id;
    const rank = req.body.rank;
    const position = req.body.position;

    const res1 = await (new Promise((resolve, reject) => {
        db.query('transferQuery1', [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    }))();

    const email = res1[0].email;
    const password = res1[0].password;
    const name = res1[0].name;
    const surname = res1[0].surname;

    const res2 = await (new Promise((resolve, reject)=>{
        db.query('transferQuery2', [email, name, surname, password, rank, position], (err, result)=>{
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    }))();

    const res3 = await (new Promise((resolve, reject)=>{
        db.query('transferQuery3', [id], (err, result)=>{
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    }))();

    let result = false;
    if (res2 && res3) {
        result = true;
    }
    res.send(result);
});

app.post('/adminService/getQueries', (_, res) => {
    try {
        db.query(queries.getQueries, (err, result) => {
            if (err) throw err;
            console.log(result);

            res.send(result);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/adminService/getQueryById', (req, res) => {
    const id = req.body.id;

    try {
        db.query(queries.getQueryById, [id], (err, result) => {
            if (err) throw err;
            console.log(result[0]);

            res.send(result[0]);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

server.listen(5000, () => {
    console.log('App "AdminService" is running on port 5000.');
});