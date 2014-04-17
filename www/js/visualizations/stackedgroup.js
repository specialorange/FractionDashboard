// function stackedGroupJS(){
//   var n = 2, // number of layers
//         m = 30, // number of samples per layer
//         stack = d3.layout.stack(),
//         layers = stack(d3.range(n).map(function() { return bumpLayer(m, .1); })),
//         yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
//         yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

//     var margin = {top: 40, right: 10, bottom: 20, left: 10},
//         width = 960 - margin.left - margin.right,
//         height = 500 - margin.top - margin.bottom;

//     var x = d3.scale.ordinal()
//         .domain(d3.range(m))
//         .rangeRoundBands([0, width], .1);

//     var y = d3.scale.linear()
//         .domain([0, yStackMax])
//         .range([height, 0]);

//     var color = d3.scale.linear()
//         .domain([0, n - 1])
//         .range(["#aad", "#556"]);

//     var xAxis = d3.svg.axis()
//         .scale(x)
//         .tickSize(0)
//         .tickPadding(6)
//         .orient("bottom");

//     var svg = d3.select("#stacked-group").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     var layer = svg.selectAll(".layer")
//         .data(layers)
//       .enter().append("g")
//         .attr("class", "layer")
//         .style("fill", function(d, i) { return color(i); });
  
//     var rect = layer.selectAll("rect")
//         .data(function(d) { return d; })
//       .enter().append("rect")
//         .attr("x", function(d) { return x(d.x); })
//         .attr("y", height)
//         .attr("width", x.rangeBand())
//         .attr("height", 0);
  
//     rect.transition()
//         .delay(function(d, i) { return i * 10; })
//         .attr("y", function(d) { return y(d.y0 + d.y); })
//         .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });
  
//     svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis);

//     d3.selectAll(".add-data")
//         .on("click", function() {
//           var start = d3.min(layers, dateFn)
//           var end = d3.max(layers, dateFn)
//           var time = start.getTime() + Math.random() * (end.getTime() - start.getTime())
//           var date = new Date(time)

//           obj = {
//             'id': Math.floor(Math.random() * 70),
//             'amount': Math.floor(1000 + Math.random() * 20001),
//             'created_at': date.toDateString()
//           }
//           data.push(obj)
//           refreshGraph()
//         });

//     d3.selectAll("#demoAddRandomAndDelete .remove-data")
//       .on("click", function() {
//         var idx = Math.floor(Math.random() * data.length)
//         data.splice( Math.floor(Math.random() * data.length), 1 )
//         refreshGraph()
//       })

//     d3.selectAll("input").on("change", change);
  
//     var timeout = setTimeout(function() {
//       d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
//     }, 2000);
  
//     function change() {
//       clearTimeout(timeout);
//       if (this.value === "grouped") transitionGrouped();
//       else transitionStacked();
//     }
  
//     function transitionGrouped() {
//       y.domain([0, yGroupMax]);
  
//       rect.transition()
//           .duration(500)
//           .delay(function(d, i) { return i * 10; })
//           .attr("x", function(d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
//           .attr("width", x.rangeBand() / n)
//         .transition()
//           .attr("y", function(d) { return y(d.y); })
//           .attr("height", function(d) { return height - y(d.y); });
//     }
  
//     function transitionStacked() {
//       y.domain([0, yStackMax]);
  
//       rect.transition()
//           .duration(500)
//           .delay(function(d, i) { return i * 10; })
//           .attr("y", function(d) { return y(d.y0 + d.y); })
//           .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
//         .transition()
//           .attr("x", function(d) { return x(d.x); })
//           .attr("width", x.rangeBand());
//     }
  
//     // Inspired by Lee Byron's test data generator.
//     function bumpLayer(n, o) {
  
//       function bump(a) {
//         var x = 1 / (.1 + Math.random()),
//             y = 2 * Math.random() - .5,
//             z = 10 / (.1 + Math.random());
//         for (var i = 0; i < n; i++) {
//           var w = (i / n - y) * z;
//           a[i] += x * Math.exp(-w * w);
//         }
//       }
  
//       var a = [], i;
//       for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
//       for (i = 0; i < 5; ++i) bump(a);
//       return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
//     }
// };



// // (function() {
// //    // Just to make sure that JSONData is not altered between examples
// //    var data = JSONData.slice()
// //    var x = d3.time.scale()
// //     .range([10, 280])

// //   var y = d3.scale.linear()
// //     .range([180, 10])
// //   var svg = d3.select("#demoAddRandomAndDelete").append("svg:svg")
// //    .attr("width", 300)
// //    .attr("height", 200)
// //   var start = d3.min(data, dateFn)
// //   var end = d3.max(data, dateFn)

// //   var refreshGraph = function() {

// //     x.domain(d3.extent(data, dateFn))
// //     y.domain(d3.extent(data, amountFn))

// //     var circles = svg.selectAll("circle").data(data, dateFn)
  
// //     circles.transition()
// //      .attr("cx", function(d) { return x(dateFn(d)) })
// //      .attr("cy", function(d) { return y(amountFn(d)) })

// //     circles.enter()
// //      .append("svg:circle")
// //      .attr("r", 4)
// //      .attr("cx", function(d) { return x(dateFn(d)) })
// //      .attr("cy", function(d) { return y(amountFn(d)) })
// //      .on("click", function(d) {
// //         d3.select("#demoAddRandomAndDelete .value").text("Date: " + d.created_at + " amount: " + d.amount)
// //      })
   
// //     circles.exit()
// //      .remove()
// //   }

// //   d3.selectAll("#demoAddRandomAndDelete .add-data")
// //     .on("click", function() {
// //       var date = new Date(end.getTime() + Math.random() * (end.getTime() - start.getTime()))
// //       obj = {
// //         'id': Math.floor(Math.random()*70),
// //         'amount': Math.floor(1000 + Math.random()*20001),
// //         'created_at': date.toDateString()
// //       }
// //       data.push(obj)
// //       refreshGraph()
// //     })

// //   d3.selectAll("#demoAddRandomAndDelete .remove-data")
// //     .on("click", function() {
// //       var idx = Math.floor(Math.random() * data.length)
// //       data.splice( Math.floor(Math.random() * data.length), 1 )
// //       refreshGraph()
// //     })

// //   refreshGraph()
  
// // })();
