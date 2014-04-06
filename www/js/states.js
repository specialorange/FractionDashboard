// Make sure to include the `ui.router` module as a dependency.
angular.module('cfd', [
    'cfd-banner',
    'ui.router'
  ])
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
        // Redirects and Otherwise
        // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
        $urlRouterProvider

          // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
          // Here we are just setting up some convenience urls.
          .when('/c?id', '/contacts/:id')
          .when('/user/:id', '/contacts/:id')

          // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
          // .otherwise('/error');
          .otherwise('/');

        // State Configurations
        // Use $stateProvider to configure your states.
        // Home
        $stateProvider
          .state('cfd', {
            // Use a url of "/" to set a states as the "index".
            url: '/',
            views: {
              // 'messages': {
              //   templateUrl: 'partials/common/messages.tpl.html'
              // },
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
          })
          //   // Example of an inline template string. By default, templates
          //   // will populate the ui-view within the parent state's template.
          //   // For top level states, like this one, the parent template is
          //   // the index.html file. So this template will be inserted into the
          //   // ui-view within index.html.
          //   template: '<p class="lead">Welcome to the UI-Router Demo</p>' +
          //     '<p>Use the menu above to navigate. ' +
          //     'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' +
          //     '<p>Click these links—<a href="#/c?id=1">Alice</a> or ' +
          //     '<a href="#/user/42">Bob</a>—to see a url redirect in action.</p>'

          // })

          // Alt-one
          .state('cfd.alt-one', {
            url: 'alt-one',
            
            views: {
              'content@': {
                templateUrl: 'partials/alt-one.content.tpl.html'
              }
            }
          })
          // Alt-two
          .state('cfd.alt-two', {
            url: 'alt-two',
            
            views: {
              'header@': {
                templateUrl: 'partials/alt-two.header.tpl.html'
              },
              'content@': {
                templateUrl: 'partials/alt-two.content.tpl.html'
              }
            }
          })
          // Alt-three
          .state('cfd.alt-three', {
            url: 'alt-three',
            
            views: {
              'header@': {
                templateUrl: 'partials/alt-three.header.tpl.html'
              },
              'content@': {
                templateUrl: 'partials/alt-three.content.tpl.html'
              }
            }
          })

          // OVERVIEW
          .state('overview', {
            url: '/overview',
            views: {
              'main@': {
                // template: '<div>Overview</div>'
                templateUrl: 'partials/overview.tpl.html'
                // templateUrl: 'partials/common/sidebar.tpl.html'
              },
              'footer': {
                templateUrl: 'partials/common/footer.tpl.html'
              }
            }
          })
          // STACKED GROUP
          .state('overview.stackedgroup', {
            url: '/stackedgroup',
            views: {
              'main@': {
                // templateUrl: 'partials/common/blank-main.tpl.html'
                templateUrl: 'partials/visualizations/stackedgroup.html',
                // onEnter: function($scope){
                // }
                // controller would go here
                controller: function($scope, $rootScope){
                  $scope.$on('$viewContentLoaded',
                    function(event){
                      stackedGroupJS();
                    });
                }
              },
              // 'sidebar@': {
              //   // template: '<div>Overview</div>'
              //   templateUrl: 'partials/common/classroom-sidebar.tpl.html'
              // },
              // 'content@': {
              // },
            }
          })
          // Circles
          .state('overview.circles', {
            url: '/circles',
            views: {
              'main@': {
                // templateUrl: 'partials/common/blank-main.tpl.html'
                templateUrl: 'partials/visualizations/circles.html',
                // onEnter: function($scope){
                // }
                // controller would go here
                controller: function($scope, $rootScope){
                  $scope.$on('$viewContentLoaded',
                    function(event){
                      circlesJS();
                    });
                }
              }
            }
          })
        // CLASSROOM
          .state('classroom', {
            url: '/classroom',
            views: {
              'header': {
                templateUrl: 'partials/common/header.tpl.html'
              },
              'sidebar': {
                // template: '<div>Overview</div>'
                templateUrl: 'partials/common/classroom-sidebar.tpl.html'
              },
              'content': {
                templateUrl: 'partials/classroom.tpl.html'
              },
              'footer': {
                templateUrl: 'partials/common/footer.tpl.html'
              }
            }
          })
        // CLASSROOM STUDENTS
          .state('classroom.students', {
            url: '/students',
            
            resolve: {
              students: ['students',
                function( students){
                  return students.all();
                }]
            },

            views: {
              'content@': {
                templateUrl: 'partials/classroom.list.tpl.html',
                // templateUrl: 'partials/classroom.list.tpl.html'
                controller: ['$scope', 'students',
                    function($scope, students){
                                  $scope.title = 'My Students';
                                  $scope.students = students;
                                }]
              }
            }

          })

          // School
          .state('school', {
            url: '/school',
            
            views: {
              'header': {
                templateUrl: 'partials/common/header.tpl.html'
              },
              'sidebar': {
                templateUrl: 'partials/common/sidebar.tpl.html'
              },
              'content': {
                templateUrl: 'partials/common/content.tpl.html'
              }
            }
          })

          // ERROR
          .state('error', {
            url: '/error',
            
            views: {
              'main@': {
                templateUrl: 'partials/common/error.tpl.html'
              }
            }
          })






          // Contacts
          .state('contacts', {

            // With abstract set to true, that means this state can not be explicitly activated.
            // It can only be implicitly activated by activating one of it's children.
            abstract: true,

            // This abstract state will prepend '/contacts' onto the urls of all its children.
            url: '/contacts',

            // Example of loading a template from a file. This is also a top level state,
            // so this template file will be loaded and then inserted into the ui-view
            // within index.html.
            templateUrl: 'contacts.html',

            // Use `resolve` to resolve any asynchronous controller dependencies
            // *before* the controller is instantiated. In this case, since contacts
            // returns a promise, the controller will wait until contacts.all() is
            // resolved before instantiation. Non-promise return values are considered
            // to be resolved immediately.
            resolve: {
              contacts: ['contacts',
                function( contacts){
                  return contacts.all();
                }]
            },

            // You can pair a controller to your template. There *must* be a template to pair with.
            controller: ['$scope', '$state', 'contacts', 'utils',
              function (  $scope,   $state,   contacts,   utils) {

                // Add a 'contacts' field in this abstract parent's scope, so that all
                // child state views can access it in their scopes. Please note: scope
                // inheritance is not due to nesting of states, but rather choosing to
                // nest the templates of those states. It's normal scope inheritance.
                $scope.contacts = contacts;

                $scope.goToRandom = function () {
                  var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);

                  // $state.go() can be used as a high level convenience method
                  // for activating a state programmatically.
                  $state.go('contacts.detail', { contactId: randId });
                };
              }]
          })
          // Contacts > List
          // Using a '.' within a state name declares a child within a parent.
          // So you have a new state 'list' within the parent 'contacts' state.
          .state('contacts.list', {

            // Using an empty url means that this child state will become active
            // when its parent's url is navigated to. Urls of child states are
            // automatically appended to the urls of their parent. So this state's
            // url is '/contacts' (because '/contacts' + '').
            url: '',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            templateUrl: 'contacts.list.html'
          })
          // Contacts > Detail
          // You can have unlimited children within a state. Here is a second child
          // state within the 'contacts' parent state.
          .state('contacts.detail', {

            // Urls can have parameters. They can be specified like :param or {param}.
            // If {} is used, then you can also specify a regex pattern that the param
            // must match. The regex is written after a colon (:). Note: Don't use capture
            // groups in your regex patterns, because the whole regex is wrapped again
            // behind the scenes. Our pattern below will only match numbers with a length
            // between 1 and 4.

            // Since this state is also a child of 'contacts' its url is appended as well.
            // So its url will end up being '/contacts/{contactId:[0-9]{1,8}}'. When the
            // url becomes something like '/contacts/42' then this state becomes active
            // and the $stateParams object becomes { contactId: 42 }.
            url: '/{contactId:[0-9]{1,4}}',

            // If there is more than a single ui-view in the parent template, or you would
            // like to target a ui-view from even higher up the state tree, you can use the
            // views object to configure multiple views. Each view can get its own template,
            // controller, and resolve data.

            // View names can be relative or absolute. Relative view names do not use an '@'
            // symbol. They always refer to views within this state's parent template.
            // Absolute view names use a '@' symbol to distinguish the view and the state.
            // So 'foo@bar' means the ui-view named 'foo' within the 'bar' state's template.
            views: {

              // So this one is targeting the unnamed view within the parent state's template.
              '': {
                templateUrl: 'contacts.detail.html',
                controller: ['$scope', '$stateParams', 'utils',
                  function (  $scope,   $stateParams,   utils) {
                    $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
                  }]
              },

              // This one is targeting the ui-view="hint" within the unnamed root, aka index.html.
              // This shows off how you could populate *any* view within *any* ancestor state.
              'hint@': {
                template: 'This is contacts.detail populating the "hint" ui-view'
              },

              // This one is targeting the ui-view="menu" within the parent state's template.
              'menuTip': {
                // templateProvider is the final method for supplying a template.
                // There is: template, templateUrl, and templateProvider.
                templateProvider: ['$stateParams',
                  function (        $stateParams) {
                    // This is just to demonstrate that $stateParams injection works for templateProvider.
                    // $stateParams are the parameters for the new state we're transitioning to, even
                    // though the global '$stateParams' has not been updated yet.
                    return '<hr><small class="muted">Contact ID: ' + $stateParams.contactId + '</small>';
                  }]
              }
            }
          })
          // Contacts > Detail > Item
          .state('contacts.detail.item', {

            // So following what we've learned, this state's full url will end up being
            // '/contacts/{contactId}/item/:itemId'. We are using both types of parameters
            // in the same url, but they behave identically.
            url: '/item/:itemId',
            views: {

              // This is targeting the unnamed ui-view within the parent state 'contact.detail'
              // We wouldn't have to do it this way if we didn't also want to set the 'hint' view below.
              // We could instead just set templateUrl and controller outside of the view obj.
              '': {
                templateUrl: 'contacts.detail.item.html',
                controller: ['$scope', '$stateParams', '$state', 'utils',
                  function (  $scope,   $stateParams,   $state,   utils) {
                    $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);

                    $scope.edit = function () {
                      // Here we show off go's ability to navigate to a relative state. Using '^' to go upwards
                      // and '.' to go down, you can navigate to any relative state (ancestor or descendant).
                      // Here we are going down to the child state 'edit' (full name of 'contacts.detail.item.edit')
                      $state.go('.edit', $stateParams);
                    };
                  }]
              },

              // Here we see we are overriding the template that was set by 'contact.detail'
              'hint@': {
                template: ' This is contacts.detail.item overriding the "hint" ui-view'
              }
            }
          })
          // Contacts > Detail > Item > Edit
          // Notice that this state has no 'url'. States do not require a url. You can use them
          // simply to organize your application into "places" where each "place" can configure
          // only what it needs. The only way to get to this state is via $state.go (or transitionTo)
          .state('contacts.detail.item.edit', {
            views: {

              // This is targeting the unnamed view within the 'contact.detail' state
              // essentially swapping out the template that 'contact.detail.item' had
              // had inserted with this state's template.
              '@contacts.detail': {
                templateUrl: 'contacts.detail.item.edit.html',
                controller: ['$scope', '$stateParams', '$state', 'utils',
                  function (  $scope,   $stateParams,   $state,   utils) {
                    $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);
                    $scope.done = function () {
                      // Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
                      $state.go('^', $stateParams);
                    };
                  }]
              }
            }
          })
      }]);
