angular.module('cfd.alt-one', [
    'ui.router'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('cfd.alt-one', {
        url: 'alt-one',
        views: {
          'content@': {
            templateUrl: 'partials/alt-one.content.tpl.html'
          }
        }
      })
    ;
  })
;
