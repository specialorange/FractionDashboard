angular.module('cfd.overview', [
    'ui.router',
    'cfd-banner'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('cfd.overview', {
        url: '/overview',
        views: {
          'content@': {
            templateUrl: 'partials/overview.tpl.html'
          }
        }
      })
    ;
  })
;
