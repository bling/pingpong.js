/* Directives */
angular.module('pingpongApp.directives', [])
  .directive('tweet', function() {
    return {
      template: '<div>hello world from tweet</div>',
      link: function ($scope, $el, $attr) {
      }
    };
  })
  .directive('tweetList', function() {
    return {
      template: '<ul><li>tweet list</li></ul>',
      link: function ($scope, $el, $attr) {
      }
    };
  });
