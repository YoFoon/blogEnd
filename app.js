var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var multer = require('multer');
//var proxy = require('./proxy');

var routes = require('./lib/router');

var app = express();

app.set('port', process.env.PORT || 8000);
//app.set('views', path.join(__dirname, 'view'));

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

routes(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});