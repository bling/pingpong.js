var fs = require('fs');
var util = require('../modules/util');
var _ = require('lodash');
var feed = require('../modules/feed');

var init = function (req, res) {
  'use strict';
  var f = new feed();
  if (req.headers.accept == 'text/event-stream') {
    req.socket.setTimeout(Infinity);
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write('\n');
    req.on('close', function() {
      console.log('lost connection');
    });
    f.on('tweet', function(tweet) {
      res.write('data:' + util.minify(tweet) + '\n\n');
      console.log('.');
    });
  }
};

exports.home = function (req, res) {
  'use strict';
  console.log('home');
  init(req, res);
};

exports.firehose = function(req, res) {
  'use strict';
  console.log('firehose');
  init(req, res);
};
