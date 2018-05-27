"use strict";

const express = require("express");
const httpsRedirect = require("express-https-redirect");
const forceDomain = require('forcedomain');
const compression = require("compression");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyparser = require("body-parser");
//const cookieparser = require("cookie-parser");
//const session = require("express-session");
const jwt = require("jsonwebtoken");

// initialize express app
var app = express();

// ------- node express configurations --------
// add gz deflate - must be the first uses
const conf_gzip = require("./conf/gzip");
app.use(compression({ filter: conf_gzip.shouldCompress }));

// redirect all to secured traffic
app.use(httpsRedirect(true));

app.use(forceDomain({
  hostname: 'www.stratteos.us',
 }));

// connect to database with mongoose
require("./components/utils/dbconnect");

//app.use(cookieparser("secret"));

app.use(logger("dev"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

console.log('Environment: ' + process.env.APP_ENVIRONMENT)

// set the request headers to allow cross origin resource sharing
app.use(["/api", "/token"], function(req, res, next) {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "Content-type": "application/json"
  });

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// generate jwt tokent - simple implementation
app.post("/token", function(req, res) {
  console.log(req.body);
  
  try {
    var token = jwt.sign(
      { email: "jahskee@yahoo.com", role: "admin" },
      "supersecret",
      { expiresIn: 3.154e12 }
    ); // expires in 1 century
    res.json({jwt: token});
  } catch (err) {
    res.send(err);
  }
});

// Protect route with JWT Token
app.use("/api/*", function(req, res, next) {
  
  console.log('Environment '+process.env.APP_ENVIRONMENT)

  if (process.env.APP_ENVIRONMENT === 'dev'){ 
    next(); 
  } else {
    var token = req.query.token;
    jwt.verify(token, "supersecret", function(err, decoded) {
      if (!err) {
        next();
      } else {
        res.send("API Access Not Authorized!");
      }
    });
  }
 
});

/* ============= API Routes =============*/
const setupCrud = require('./components/models/_setup-crud');
setupCrud(app)


// add angular files
app.use("/", express.static(path.join(__dirname, "../client/build")));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  res.end()
  res.redirect("/");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//console.log({...process.env, APP_DB_USER:'', APP_DB_PASSWORD:''});
module.exports = app;
