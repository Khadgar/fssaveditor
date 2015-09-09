var express = require('express');
var path = require('path');
var app = express();
var busboy = require('connect-busboy');

app.use(express.static('public'));

app.use(busboy());

//routes
require(path.join(__dirname, './routes/index.js')).Index(app,busboy);


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('The server is listening on http://%s:%s', host, port);
});