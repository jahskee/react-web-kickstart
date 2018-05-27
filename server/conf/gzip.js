const compression = require('compression')

exports.shouldCompress = function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }
  return compression.filter(req, res);
}
