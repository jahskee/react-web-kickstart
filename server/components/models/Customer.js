/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({   
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {type: Date},
    updatedAt: {type: Date},
});

module.exports = mongoose.model('Customer', schema);