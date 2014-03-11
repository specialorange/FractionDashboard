angular.module('cfd.alt-three', [
    'ui.router',
    'blink'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('cfd.alt-three', {
        url: '/alt-three',
        views: {
          'content@': {
            templateUrl: 'partials/alt-three.content.tpl.html'
          },
          'header@': {
            templateUrl: 'partials/alt-three.header.tpl.html'
          },
          'one@cfd.alt-three': {
            template: '<div class="alert-info">Sub One</div>'
          },
          'two@cfd.alt-three': {
            template: '<div class="alert-success">Sub Two</div>'
          }
        }
      }
    )
  })
;
