angular.module('blink', [])
  .directive('blink', function ($timeout) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function ($scope, $element) {
        function showElement() {
          $element.css("opacity", "1.0");
          $timeout(hideElement, 400);
        }

        function hideElement() {
          $element.css("opacity", "0.0");
          $timeout(showElement, 400);
        }

        showElement();
      },
      template: '<span ng-transclude></span>',
      replace: true
    };
  });