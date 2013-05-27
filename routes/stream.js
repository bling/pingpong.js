var fs = require('fs');
var client = require('../modules/client');
var util = require('../modules/util');

// var t = new client();
// t.connect();

var t = new (require('events').EventEmitter)();
setInterval(function() {
  'use strict';
  t.emit('tweet', {
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

exports.index = function(req, res) {
  'use strict';
  res.render('partials/stream');
};

exports.home = function(req, res) {
  'use strict';
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  if (req.headers.accept == 'text/event-stream') {
    t.on('tweet', function(tweet) {
      res.write('data:' + util.minify(tweet));
      res.write('\n\n');
    });
  }
};
