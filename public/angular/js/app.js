'use strict';

angular
  .module('pingpongApp', ['pingpongApp.filters', 'pingpongApp.services', 'pingpongApp.directives'])
  .config([
    '$routeProvider',
    '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.when('/angular/home', {
        templateUrl: 'partials/ng-tweets',
        controller: HomeStreamCtrl
      });
      $routeProvider.when('/angular/firehose', {
        templateUrl: 'partials/ng-tweets',
        controller: FirehoseStreamCtrl
      });
      $routeProvider.otherwise({
        redirectTo: '/angular'
      });
      $locationProvider.html5Mode(true);
    }
  ]);
