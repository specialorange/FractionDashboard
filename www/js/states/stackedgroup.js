angular.module('cfd.overview.stackedgroup', [
    'ui.router',
    'cfd-banner'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('cfd.overview.stackedgroup', {
        url: '/stackedgroup',
        views: {
          'content@': {
            templateUrl: 'partials/visualizations/stackedgroup.html'
          }
        }
      })
    ;
  })
;
