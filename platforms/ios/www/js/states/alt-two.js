angular.module('cfd.alt-two', [
    'ui.router'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('cfd.alt-two', {
        url: '/alt-two',
        views: {
          'content@': {
            templateUrl: 'partials/alt-two.content.tpl.html'
          },
          'header@': {
            templateUrl: 'partials/alt-two.header.tpl.html'
          }
        }
      }
    )
  })
;
