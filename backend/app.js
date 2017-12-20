let express = require('express');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let bodyParser = require('body-parser');

let app = express();

app.use(session({
  secret: 'mysecret'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;
