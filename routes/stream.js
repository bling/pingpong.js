var fs = require('fs');
var client = require('../server/client');

var t = new client();
t.connect();

exports.index = function(req, res) {
  res.render('stream');
  // console.log('stream.index')
  // res.writeHead(200, {'Content-Type': 'text/html'});
  // res.write(fs.readFileSync(__dirname + '/../sse-node.html'));
  // res.end();
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
