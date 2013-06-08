'use strict';


function AppCtrl($scope, $http) {
}

function TweetCtrl($scope) {
}

function HomeStreamCtrl($scope, $http) {
}

function FirehoseStreamCtrl($scope, $http) {
  $scope.tweets = [];

  var socket = require('socket.io')('ws://localhost');
  socket.onopen = function() {
    socket.onmessage = function(data) {
      console.log(data);
    };
  };
}
