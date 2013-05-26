var fs = require('fs');
var client = require('../modules/client');

var t = new client();
t.connect();

exports.index = function(req, res) {
  res.render('stream');
};

exports.home = function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  if (req.headers.accept == 'text/event-stream') {
    t.on('tweet', function(tweet) {
      res.write('data:' + tweet.text);
      res.write('\n\n');
    });
  }
};
