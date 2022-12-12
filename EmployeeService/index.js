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

app.post('/employeeService/isDayExistForUser', async (req, res) => {
    const userId = req.body.userId;
    const date = req.body.date;

    try {
        db.query(queries.getNumberOfDays, [date, userId], (err, result) => {
            if (err) throw err;

            let message = false;

            if (result[0].count > 0) {
                message = true;
            }

            res.send(message);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/employeeService/getDayForUserByDate', async (req, res) => {
    const date = req.body.date;

    console.log(req.body);

    try {
        db.query(queries.getDayForUserByDate, [date], (err, result) => {
            if (err) throw err;
            console.log(result);

            if (result.length) {
                const dayInfo = [{}, {}];
                dayInfo[0]['time_from'] = result[result.length - 1]['time_from'];
                dayInfo[1]['time_to'] = result[result.length - 1]['time_to'];
                res.send(dayInfo);
            }

            res.send(false);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/employeeService/addDay', async (req, res) => {
    const user = req.body.user;
    const date = req.body.date;
    const from = req.body.from;
    const to = req.body.to;
    const notes = req.body.notes;

    try {
        db.query(queries.getDayForUserByDate, [user, date, from, to, notes], (err, _) => {
            if (err) throw err;
    
            res.sendStatus(200);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/employeeService/deleteUserDay', async (req, res) => {
    const userId = req.body.userId;
    const date = req.body.date;

    try {
        db.query(queries.deleteUserDay, [userId, date], (err, _) => {
            if (err) throw err;
    
            res.sendStatus(200);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/employeeService/isDayExistForAll', async (req, res) => {
    const date = req.body.date;

    try {
        db.query(queries.isDayExistForAll, [date], (err, result) => {
            if (err) throw err;
            console.log(result[0]);

            let message = false;

            if (result[0].count > 0) {
                message = result[0].count;
            }

            res.send(message);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/employeeService/getDayUsersByDate', async (req, res) => {
    const date = req.body.date;

    try {
        db.query(queries.getDayUsersByDate, [date], (err, result) => {
            if (err) throw err;
            console.log(result);

            res.send(result);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/employeeService/getDayById', async (req, res) => {
    const id = req.body.id;

    try {
        db.query(queries.getDayById, [id], (err, result) => {
            if (err) throw err;
            console.log(result);

            res.send(result);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/employeeService/transferDayFromUserToFirm', async (req, res) => {
    const user = req.body.user;
    const date = req.body.date;
    const from = req.body.from;
    const to = req.body.to;
    const notes = req.body.notes;

    try {
        db.query(queries.transferDayFromUserToFirm, [user, date, from, to, notes], (err, _) => {
            if (err) throw err;

            res.sendStatus(200);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/employeeService/getDayFirmByDate', async (req, res) => {
    const date = req.body.date;

    try {
        db.query(queries.getDayFirmByDate, [date], (err, result) => {
            if (err) throw err;
            console.log(result);

            res.send(result);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/employeeService/isGrafikTransferred', async (req, res) => {
    const userId = req.body.userId;
    const date = req.body.date;

    try {
        db.query(queries.isGrafikTransferred, [date, userId], (err, result) => {
            if (err) throw err;

            let message = false;

            if (result[0].count > 0) {
                message = true;
            }

            res.send(message);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/employeeService/deleteDayForUserFromFirmGraphic', async (req, res) => {
    const userId = req.body.userId;
    const date = req.body.date;

    try {
        db.query(queries.deleteDayForUserFromFirmGraphic, [userId, date], (err, _) => {
            if (err) throw err;

            res.sendStatus(200);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/employeeService/isDayReady', async (req, res) => {
    const date = req.body.date;

    try {
        db.query(queries.isDayReady, [date], (err, result) => {
            if (err) throw err;

            let message = false;

            if (result[0].count > 0) {
                message = true;
            }

            res.send(message);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

app.post('/employeeService/getReadyDayForUser', async (req, res) => {
    const userId = req.body.userId;
    const date = req.body.date;

    try {
        db.query(queries.getReadyDayForUser, [date, userId], (err, result) => {
            if (err) throw err;
            console.log(result);

            if (result.length) {
                const dayInfo = [{}, {}];
                dayInfo[0]['time_from'] = result[result.length - 1]['time_from'];
                dayInfo[1]['time_to'] = result[result.length - 1]['time_to'];
                res.send(dayInfo);
            }

            res.send(false);
        });
    } catch(e) {
        res.sendStatus(500);
    }
});

server.listen(5001, () => {
    console.log('App "EmployeeService" is running on port 5001.');
});