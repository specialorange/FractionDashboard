angular.module('account', [
    'ui.router'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('account', {
        url: 'account',
        views: {
          'content@': {
            templateUrl: 'partials/account.tpl.html'
          }
        }
      })
    ;
  })
;
