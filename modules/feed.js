var util = require('util');
var client = require('./client');
var EventEmitter = require('events').EventEmitter;

function Feed() {
  "use strict";

  var that = this;

  setInterval(function () {
    that.emit('tweet', {
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
}

Feed.prototype.subscribeToFirehose = function() {
};

Feed.prototype.subscribeToHome = function() {
};

util.inherits(Feed, EventEmitter);

module.exports = Feed;
