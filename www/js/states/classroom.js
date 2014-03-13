angular.module('classroom', [
    'ui.router'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('classroom', {
        url: '/classroom',
        views: {
          'content@': {
            templateUrl: 'partials/classroom.tpl.html'
          }
        }
      })
    ;
  })
;
