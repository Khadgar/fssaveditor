var express = require('express');
var path = require('path');
var app = express();
var busboy = require('connect-busboy');
var bodyParser = require("body-parser");
var http = require('http').Server(app);
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));

app.use(busboy());
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

//routes
require(path.join(__dirname, './routes/index.js')).Index(app,busboy);


//create server
http.listen(app.get('port'), function() {
  console.log('Fallout Shelter SAV editor is running:' + app.get('port'));
});