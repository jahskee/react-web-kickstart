'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

// connect to mongodb
mongoose.connect(`mongodb://${process.env.APP_DB_USER}:${process.env.APP_DB_PASSWORD}@cluster0-shard-00-00-gv7jy.mongodb.net:27017,cluster0-shard-00-01-gv7jy.mongodb.net:27017,cluster0-shard-00-02-gv7jy.mongodb.net:27017/${process.env.APP_DB_DATABASE}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`);
var db = mongoose.connection;

db.on('open', function() {
  console.log('connected to remote mongodb database');
});

module.exports = db;