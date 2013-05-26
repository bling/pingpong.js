'use strict';

angular
  .module('pingpongApp', ['pingpongApp.filters', 'pingpongApp.services', 'pingpongApp.directives'])
  .config([
    '$routeProvider',
    '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.when('/stream/home', {
        templateUrl: 'partials/stream',
        controller: StreamCtrl
      });
      $routeProvider.when('/stream/firehose', {
        templateUrl: 'partials/stream',
        controller: StreamCtrl
      });
      $routeProvider.otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
    }
  ]);
