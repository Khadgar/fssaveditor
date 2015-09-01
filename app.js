var express = require('express');
var path = require('path');
var app = express();
app.use(express.static('files'));

//routes
require(path.join(__dirname, './routes/index.js')).Index(app);


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('The server is listening on http://%s:%s', host, port);
});