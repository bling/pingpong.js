var _ = require('lodash')
var fs = require('fs');
var client = require('../modules/client');

var t = new client();
t.connect();

function minify(tweet) {
  var t = {};
  _.each(['created_at','id_str','text'], function (key) {
    t[key] = tweet[key];
  });

  t.user = {};
  _.each(['name','screen_name','profile_image_url_https'], function(key) {
    t.user.key = tweet.user.key;
  })

  return JSON.stringify(t);
}

exports.index = function(req, res) {
  res.render('partials/stream');
};

exports.home = function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  if (req.headers.accept == 'text/event-stream') {
    t.on('tweet', function(tweet) {
      res.write('data:' + minify(tweet));
      res.write('\n\n');
    });
  }
};
