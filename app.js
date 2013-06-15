'use strict';

var _ = require('lodash');
var express = require('express');
var app = module.exports = express();
var browserify = require('browserify-middleware');
var feed = require('./modules/feed');

browserify.settings({
  debug: true
});

// Configuration
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  // app.use(express.logger());
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

app.get('/angular/bundle.js', browserify(__dirname + '/public/angular/app.js'));

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

app.get('/can/?', function(req, res) {
  res.render('can');
});

// redirect all others to the index (HTML5 history)
// app.get('*', routes.index);

// Start server
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

var sockets = [];
io.on('connection', function (socket) {
  sockets.push(socket);
});

var f = new feed();
f.on('tweet', function (data) {
  _.each(sockets, function (socket) {
    socket.emit('tweet', data);
  });
});
