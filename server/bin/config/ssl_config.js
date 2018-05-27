"use strict";
var fs = require("fs");

const privateKey = fs.readFileSync(
  "./bin/sslcert/" + process.env.APP_ENVIRONMENT + "/private.key",
  "utf8"
);
const certificate = fs.readFileSync(
  "./bin/sslcert/" + process.env.APP_ENVIRONMENT + "/certificate.crt",
  "utf8"
);
const ca_bundle = fs.readFileSync(
  "./bin/sslcert/" + process.env.APP_ENVIRONMENT + "/ca_bundle.crt",
  "utf8"
);
const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca_bundle,
  ciphers: [
    "ECDHE-RSA-AES256-SHA384",
    "DHE-RSA-AES256-SHA384",
    "ECDHE-RSA-AES256-SHA256",
    "DHE-RSA-AES256-SHA256",
    "ECDHE-RSA-AES128-SHA256",
    "DHE-RSA-AES128-SHA256",
    "HIGH",
    "!aNULL",
    "!eNULL",
    "!EXPORT",
    "!DES",
    "!RC4",
    "!MD5",
    "!PSK",
    "!SRP",
    "!CAMELLIA"
  ].join(":"),
  honorCipherOrder: true
};

module.exports = credentials;
