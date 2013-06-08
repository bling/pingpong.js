'use strict';

var express = require('express');
var stream = require('./routes/stream');
var app = module.exports = express();
var io = require('engine.io');

// Configuration
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function() {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  res.render('index');
});
app.get('/partials/:name', function(req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});

app.get('/angular/?', function(req, res) {
  res.render('angular');
});

// streams
app.get('/stream/home/?', stream.home);
app.get('/stream/firehose/?', stream.firehose);

app.get('/can/?', function(req, res) {
  res.render('can');
});

// redirect all others to the index (HTML5 history)
// app.get('*', routes.index);

io.on('connection', function (socket) {
  socket.emit('tweet', {});
});

// Start server
io.attach(app.listen(3000, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
}));

