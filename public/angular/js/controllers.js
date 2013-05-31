'use strict';

function AppCtrl($scope, $http) {
}

function TweetCtrl($scope) {
}

function HomeStreamCtrl($scope, $http) {
}

function FirehoseStreamCtrl($scope, $http) {
  $scope.tweets = [];

  this.source = new EventSource('/stream/firehose');
  this.source.onerror = function(e) {
    console.log(e);
  };
  this.source.onmessage = function (e) {
    $scope.$apply(function() {
      while ($scope.tweets.length > 10)
        $scope.tweets.shift();

      $scope.tweets.push(JSON.parse(e.data));
    });
  };
}
