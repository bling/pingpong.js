'use strict';

function AppCtrl($scope, $http) {
  $http({
    method: 'GET',
    url: '/api/name'
  }).
  success(function(data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function(data, status, headers, config) {
    $scope.name = 'Error!';
  });
}

function MyCtrl1() {}
MyCtrl1.$inject = [];

function MyCtrl2() {}
MyCtrl2.$inject = [];

function TweetCtrl($scope) {
}

function StreamCtrl($scope, $http) {
  $scope.tweets = [];

  var source = new EventSource('/stream/home');
  source.onmessage = function (e) {
    while ($scope.tweets.length > 100)
      $scope.tweets.shift();

    $scope.tweets.push(JSON.parse(e.data));
    $scope.$apply();
  };
}
