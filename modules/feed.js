var client = require('./client');
var io = require('engine.io');

function Feed() {
  "use strict";

  var that = this;

  //that._client = new client();
  that._client = new (require('events').EventEmitter)();
  setInterval(function () {
    that._client.emit('tweet', {
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

  that._connections = [];
  io.on('connection', function (socket) {
    that._connections.push(socket);
  });

  that._client.on('tweet', function (tweet) {
    _.each(that._connections, function (socket) {
      socket.emit('tweet', tweet);
    });
  });
}

Feed.prototype.subscribeToFirehose = function() {
};

Feed.prototype.subscribeToHome = function() {
};

module.exports = Feed;