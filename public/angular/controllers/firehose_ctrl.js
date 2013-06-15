function FirehoseCtrl($scope, $http) {
  'use strict';

  $scope.tweets = [];

  var socket = io.connect('http://nodejs-6787.use1.actionbox.io:3000');
  socket.on('connect', function () {
    socket.on('tweet', function(data) {
      $scope.$apply(function() {
        while ($scope.tweets.length > 20)
          $scope.tweets.shift();

        $scope.tweets.push(data);
      });
    });
  });
}

module.exports = FirehoseCtrl;

