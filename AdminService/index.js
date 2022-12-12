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

server.listen(5000, () => {
    console.log('App "AdminService" is running on port 5000.');
});