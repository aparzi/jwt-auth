let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let user = new mongoose.Schema({
    first: String,
    email: {type: String, unique: true},
    password: String
}, {timestamp: true});

module.exports = mongoose.model('user', user, 'users');