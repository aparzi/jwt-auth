const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const routes = express.Router();
const auth = require('../middleware/auth');

routes.route('/').get(function (req, res) {
    res.send('Hello Worls');
});

routes.route('/secret').get(auth, function (req, res) {
    res.json({ "message" : "THIS IS SUPER SECRET, DO NOT SHARE!" })
});

routes.route('/readme').get(function (req, res) {
    res.json({ "message" : "This is open to the world!" })
});

routes.route('/jwt').get(function (req, res) {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token = jwt.sign({ "body": "stuff" }, privateKey, { expiresIn: 86400 }); //expires in 24h
    res.send(token);
});

module.exports = routes;