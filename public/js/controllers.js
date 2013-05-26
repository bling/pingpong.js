'use strict';

function AppCtrl($scope, $http) {
}

function TweetCtrl($scope) {
}

function StreamCtrl($scope, $http) {
  $scope.tweets = [];

  var source = new EventSource('/stream/home');
  source.onmessage = function (e) {
    $scope.$apply(function() {
      while ($scope.tweets.length > 100)
        $scope.tweets.shift();

      $scope.tweets.push(JSON.parse(e.data));
    });
  };
}
