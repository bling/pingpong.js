var twit = require('twit');
var nconf = require('nconf').file('./config.json');
var util = require('util');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

function Client() {
  'use strict';

  var that = this;
  this._subscriptions = [];

  var T = new twit({
    consumer_key: nconf.get('consumer_key'),
    consumer_secret: nconf.get('consumer_secret'),
    access_token: nconf.get('access_token'),
    access_token_secret: nconf.get('access_token_secret'),
  });

  this.updateStatus = function(text) {
    T.post(
      'statuses/update',
      { status: text },
      function(err, reply) {
      });
  };

  this.subscribeToHome = function() {
    var stream = T.stream('user');
    stream.on('tweet', function(tweet) {
      that.emit('tweet', tweet);
    });
    this._subscriptions.push(stream);
  };

  this.subscribeToFirehose = function() {
    var stream = T.stream('statuses/sample');
    stream.on('tweet', function(tweet) {
      that.emit('tweet', tweet);
    });
    this._subscriptions.push(stream);
  };

  this.close = function () {
    _.each(this._subscriptions, function (stream) {
      stream.stop();
    });
    this._subscriptions = null;
  };
}

util.inherits(Client, EventEmitter);

module.exports = Client;
