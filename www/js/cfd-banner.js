angular.module('cfd-banner', [
  ])
  .directive('cfdBanner', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/common/banner.tpl.html',
      scope: {
        title: '@'
      }
    }
  })
;
