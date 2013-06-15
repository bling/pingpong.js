require('./controllers/firehose_ctrl.js');
require('./services.js');
require('./directives.js');
require('./filters.js');

angular
  .module('pingpongApp', ['pingpongApp.filters', 'pingpongApp.services', 'pingpongApp.directives'])
  .config([
    '$routeProvider',
    '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.when('/angular', {
        templateUrl: 'partials/ng-tweets',
        controller: require('./controllers/firehose_ctrl')
      });
      $routeProvider.otherwise({
        redirectTo: '/angular',
      });
      $locationProvider.html5Mode(true);
    }
  ]);
