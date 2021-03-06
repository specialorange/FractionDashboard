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
                controller: [ '$scope', '$rootScope', function($scope, $rootScope){
                  $scope.l = [1,2,3,5,8];
                  $scope.$on('$viewContentLoaded',
                    function(event){
                      
                    });
                }]
              },
              // 'sidebar@': {
              //   // template: '<div>Overview</div>'
              //   templateUrl: 'partials/common/classroom-sidebar.tpl.html'
              // },
              // 'content@': {
              // },
            }
          })
          // XFilter
          .state('overview.xfilter', {
            url: '/xfilter',

            views: {
              'main@': {
                templateUrl: 'partials/visualizations/crossfilter.html',
                // onEnter: function($scope){
                // }
                // controller would go here
                controller: [ '$scope', '$rootScope', function($scope, $rootScope){
                  // (It's CSV, but GitHub Pages only gzip's JSON at the moment.)
                  d3.csv("data/visualizations/xfilter.json", function(error, questions) {

                    // Various formatters.
                    var formatNumber = d3.format(",d"),
                        formatChange = d3.format("+,d"),
                        formatDate = d3.time.format("%B %d, %Y"),
                        formatTime = d3.time.format("%I:%M %p");

                    // A nest operator, for grouping the question list.
                    var nestByDate = d3.nest()
                        .key(function(d) { return d3.time.day(d.datetime); });

                    // A little coercion, since the CSV is untyped.
                    questions.forEach(function(d, i) {
                      // datetime,wrong,answered,grade,upperLevel,name
                      d.index = i;
                      d.datetime = parseDate(d.datetime);
                      d.wrong = +d.wrong;
                      d.answered = +d.answered;
                      d.grade = +d.grade;
                      d.upperLevel = +d.upperLevel;
                      d.name = d.name;
                    });

                    // Create the crossfilter for the relevant dimensions and groups.
                    var question = crossfilter(questions),
                        all = question.groupAll(),
                        date = question.dimension(function(d) { return d.datetime; }),
                        dates = date.group(d3.time.day),
                        hour = question.dimension(function(d) { return d.datetime.getHours() + d.datetime.getMinutes() / 60; }),
                        hours = hour.group(Math.floor),
                        wrong = question.dimension(function(d) { return Math.max(-60, Math.min(149, d.wrong)); }),
                        wrongs = wrong.group(function(d) { return Math.floor(d / 10) * 10; }),
                        answered = question.dimension(function(d) { return Math.min(1999, d.answered); }),
                        answereds = answered.group(function(d) { return Math.floor(d / 50) * 50; });

                    var charts = [

                      barChart()
                          .dimension(hour)
                          .group(hours)
                        .x(d3.scale.linear()
                          .domain([0, 24])
                          .rangeRound([0, 10 * 24])),

                      barChart()
                          .dimension(wrong)
                          .group(wrongs)
                        .x(d3.scale.linear()
                          .domain([0, 40])
                          .rangeRound([1, 10 * 21])),

                      barChart()
                          .dimension(answered)
                          .group(answereds)
                        .x(d3.scale.linear()
                          .domain([0, 110])
                          .rangeRound([0, 10 * 40])),

                      barChart()
                          .dimension(date)
                          .group(dates)
                          .round(d3.time.day.round)
                        .x(d3.time.scale()
                          .domain([new Date(2013, 7, 1), new Date(2014, 5, 31)])
                          .rangeRound([0, 10 * 90]))
                          // .filter([new Date(2001, 1, 1), new Date(2001, 2, 1)])

                    ];

                    // Given our array of charts, which we assume are in the same order as the
                    // .chart elements in the DOM, bind the charts to the DOM and render them.
                    // We also listen to the chart's brush events to update the display.
                    var chart = d3.selectAll(".chart")
                        .data(charts)
                        .each(function(chart) { chart.on("brush", renderAll).on("brushend", renderAll); });

                    // Render the initial lists.
                    var list = d3.selectAll(".list")
                        .data([questionList]);

                    // Render the total.
                    d3.selectAll("#total")
                        .text(formatNumber(question.size()));

                    renderAll();

                    // Renders the specified chart or list.
                    function render(method) {
                      d3.select(this).call(method);
                    }

                    // Whenever the brush moves, re-rendering everything.
                    function renderAll() {
                      chart.each(render);
                      list.each(render);
                      d3.select("#active").text(formatNumber(all.value()));
                    }

                    // Like d3.time.format, but faster.
                    function parseDate(d) {
                      return new Date(
                        // 0323142109 => feb 23 2014 21:09pm
                        ('20'+d.substring(4, 6)), //Year
                        d.substring(0, 2) - 1, //Month
                        d.substring(2, 4), //Day
                        d.substring(6, 8), //Hour
                        d.substring(8, 10)); //Time
                      // return date;
                    }

                    window.filter = function(filters) {
                      filters.forEach(function(d, i) { charts[i].filter(d); });
                      renderAll();
                    };

                    window.reset = function(i) {
                      charts[i].filter(null);
                      renderAll();
                    };

                    function questionList(div) {
                      var questionsByDate = nestByDate.entries(date.top(40));

                      div.each(function() {
                        var date = d3.select(this).selectAll(".date")
                            .data(questionsByDate, function(d) { return d.key; });

                        date.enter().append("div")
                            .attr("class", "date")
                          .append("div")
                            .attr("class", "day")
                            .text(function(d) { return formatDate(d.values[0].datetime); });

                        date.exit().remove();

                        var question = date.order().selectAll(".question")
                            .data(function(d) { return d.values; }, function(d) { return d.index; });

                        var questionEnter = question.enter().append("div")
                            .attr("class", "question");

                        questionEnter.append("div")
                            .attr("class", "time")
                            .text(function(d) { return formatTime(d.datetime); });

                        questionEnter.append("div")
                            .attr("class", "wrong")
                            .text(function(d) { return d.wrong + ' wrong'; });

                        questionEnter.append("div")
                            .attr("class", "answered")
                            .text(function(d) { return formatNumber(d.answered) + " answered"; });

                        questionEnter.append("div")
                            .attr("class", "grade")
                            .text(function(d) { return d.grade; });

                        questionEnter.append("div")
                            .attr("class", "upperLevel")
                            .text(function(d) { return 'Highest Level: ' + d.upperLevel; });

                        questionEnter.append("div")
                            .attr("class", "name")
                            .text(function(d) { return d.name; });

                        question.exit().remove();

                        question.order();
                      });
                    }

                    function barChart() {
                      if (!barChart.id) barChart.id = 0;

                      var margin = {top: 10, right: 10, bottom: 20, left: 10},
                          x,
                          y = d3.scale.linear().range([100, 0]),
                          id = barChart.id++,
                          axis = d3.svg.axis().orient("bottom"),
                          brush = d3.svg.brush(),
                          brushDirty,
                          dimension,
                          group,
                          round;

                      function chart(div) {
                        var width = x.range()[1],
                            height = y.range()[0];

                        y.domain([0, group.top(1)[0].value]);

                        div.each(function() {
                          var div = d3.select(this),
                              g = div.select("g");

                          // Create the skeletal chart.
                          if (g.empty()) {
                            div.select(".title").append("a")
                                .attr("href", "javascript:reset(" + id + ")")
                                .attr("class", "reset")
                                .text("reset")
                                .style("display", "none");

                            g = div.append("svg")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom)
                              .append("g")
                                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                            g.append("clipPath")
                                .attr("id", "clip-" + id)
                              .append("rect")
                                .attr("width", width)
                                .attr("height", height);

                            g.selectAll(".bar")
                                .data(["background", "foreground"])
                              .enter().append("path")
                                .attr("class", function(d) { return d + " bar"; })
                                .datum(group.all());

                            g.selectAll(".foreground.bar")
                                .attr("clip-path", "url(#clip-" + id + ")");

                            g.append("g")
                                .attr("class", "axis")
                                .attr("transform", "translate(0," + height + ")")
                                .call(axis);

                            // Initialize the brush component with pretty resize handles.
                            var gBrush = g.append("g").attr("class", "brush").call(brush);
                            gBrush.selectAll("rect").attr("height", height);
                            gBrush.selectAll(".resize").append("path").attr("d", resizePath);
                          }

                          // Only redraw the brush if set externally.
                          if (brushDirty) {
                            brushDirty = false;
                            g.selectAll(".brush").call(brush);
                            div.select(".title a").style("display", brush.empty() ? "none" : null);
                            if (brush.empty()) {
                              g.selectAll("#clip-" + id + " rect")
                                  .attr("x", 0)
                                  .attr("width", width);
                            } else {
                              var extent = brush.extent();
                              g.selectAll("#clip-" + id + " rect")
                                  .attr("x", x(extent[0]))
                                  .attr("width", x(extent[1]) - x(extent[0]));
                            }
                          }

                          g.selectAll(".bar").attr("d", barPath);
                        });

                        function barPath(groups) {
                          var path = [],
                              i = -1,
                              n = groups.length,
                              d;
                          while (++i < n) {
                            d = groups[i];
                            path.push("M", x(d.key), ",", height, "V", y(d.value), "h9V", height);
                          }
                          return path.join("");
                        }

                        function resizePath(d) {
                          var e = +(d == "e"),
                              x = e ? 1 : -1,
                              y = height / 3;
                          return "M" + (.5 * x) + "," + y
                              + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
                              + "V" + (2 * y - 6)
                              + "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
                              + "Z"
                              + "M" + (2.5 * x) + "," + (y + 8)
                              + "V" + (2 * y - 8)
                              + "M" + (4.5 * x) + "," + (y + 8)
                              + "V" + (2 * y - 8);
                        }
                      }

                      brush.on("brushstart.chart", function() {
                        var div = d3.select(this.parentNode.parentNode.parentNode);
                        div.select(".title a").style("display", null);
                      });

                      brush.on("brush.chart", function() {
                        var g = d3.select(this.parentNode),
                            extent = brush.extent();
                        if (round) g.select(".brush")
                            .call(brush.extent(extent = extent.map(round)))
                          .selectAll(".resize")
                            .style("display", null);
                        g.select("#clip-" + id + " rect")
                            .attr("x", x(extent[0]))
                            .attr("width", x(extent[1]) - x(extent[0]));
                        dimension.filterRange(extent);
                      });

                      brush.on("brushend.chart", function() {
                        if (brush.empty()) {
                          var div = d3.select(this.parentNode.parentNode.parentNode);
                          div.select(".title a").style("display", "none");
                          div.select("#clip-" + id + " rect").attr("x", null).attr("width", "100%");
                          dimension.filterAll();
                        }
                      });

                      chart.margin = function(_) {
                        if (!arguments.length) return margin;
                        margin = _;
                        return chart;
                      };

                      chart.x = function(_) {
                        if (!arguments.length) return x;
                        x = _;
                        axis.scale(x);
                        brush.x(x);
                        return chart;
                      };

                      chart.y = function(_) {
                        if (!arguments.length) return y;
                        y = _;
                        return chart;
                      };

                      chart.dimension = function(_) {
                        if (!arguments.length) return dimension;
                        dimension = _;
                        return chart;
                      };

                      chart.filter = function(_) {
                        if (_) {
                          brush.extent(_);
                          dimension.filterRange(_);
                        } else {
                          brush.clear();
                          dimension.filterAll();
                        }
                        brushDirty = true;
                        return chart;
                      };

                      chart.group = function(_) {
                        if (!arguments.length) return group;
                        group = _;
                        return chart;
                      };

                      chart.round = function(_) {
                        if (!arguments.length) return round;
                        round = _;
                        return chart;
                      };

                      return d3.rebind(chart, brush, "on");
                    }
                  });
                }]
              }
            }
          })
          // SUNBURST
          .state('overview.sunburst', {
            url: '/sunburst',

            // resolve: {
            //   sunburstData: ['sunburstData',
            //     function( sunburstData){
            //       return sunburstData.all();
            //     }]
            // },

            views: {
              'main@': {
                // templateUrl: 'partials/common/blank-main.tpl.html'
                templateUrl: 'partials/visualizations/sunburst.html',
                // onEnter: function($scope){
                // }
                // controller would go here
                controller: function($scope, $rootScope){
                  $scope.$on('$viewContentLoaded',
                    function(event){
                      // createVisualization();
                    });
                }
              }
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
