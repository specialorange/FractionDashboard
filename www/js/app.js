angular.module('cfd', [
    'cfd.alt-one',
    'cfd.alt-two',
    'cfd.alt-three',
    'banner',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('cfd', {
        url: '/',
        views: {
          'header': {
            templateUrl: 'partials/common/header.tpl.html'
          },
          'sidebar': {
            templateUrl: 'partials/common/sidebar.tpl.html'
          },
          'content': {
            templateUrl: 'partials/common/content.tpl.html'
          },
          'footer': {
            templateUrl: 'partials/common/footer.tpl.html'
          }
        }
      });
    $urlRouterProvider.otherwise('/');
  })
;

