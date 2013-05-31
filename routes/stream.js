var fs = require('fs');
var client = require('../modules/client');
var util = require('../modules/util');
var _ = require('lodash');

// var tclient = new client();

var tclient = new (require('events').EventEmitter)();
tclient.subscribeToFirehose = function() { }
tclient.subscribeToHome = function() { }
setInterval(function() {
  tclient.emit('tweet', {
    created_at: new Date(),
    id_str: 'id',
    text: 'the time is ' + (new Date()),
    user: {
      name: 'name',
      screen_name: 'screen',
      profile_image_url_https: 'img.gif'
    }
  });
}, 1000);

var connections = [];
var init = function (req, res) {
  if (req.headers.accept == 'text/event-stream') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write('\n');
    connections.push(res);
    req.on('close', function() {
      console.log('lost connection');
    });
    tclient.on('tweet', function(tweet) {
      //res.write('data:' + util.minify(tweet) + '\n\n');
      res.write('data: wtf\n\n');
      console.log('.');
    });
  }
};

exports.home = function (req, res) {
  console.log('home');
  tclient.subscribeToHome();
  init(req, res);
};

exports.firehose = function(req, res) {
  console.log('firehose');
  tclient.subscribeToFirehose();
  init(req, res);
};
