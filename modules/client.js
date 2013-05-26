var twit = require('twit');
var nconf = require('nconf').file('./config.json');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Client() {
  var that = this;

  var T = new twit({
    consumer_key: nconf.get('consumer_key'),
    consumer_secret: nconf.get('consumer_secret'),
    access_token: nconf.get('access_token'),
    access_token_secret: nconf.get('access_token_secret'),
  });

  this.updateStatus = function(text) {
    T.post(
      'statuses/update', {
      status: text
    }, function(err, reply) {});
  };

  this.connect = function() {
    var stream = T.stream('user');
    stream.on('tweet', function(tweet) {
      that.emit('tweet', tweet);
    });
    stream = T.stream('statuses/sample');
    stream.on('tweet', function(tweet) {
      that.emit('tweet', tweet);
    });
  };
}

util.inherits(Client, EventEmitter);

module.exports = Client;
