// Make sure to include the `ui.router` module as a dependency
angular.module('cfd', ['ui.router', 'ngAnimate'])
    .run(
      [        '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }]);
