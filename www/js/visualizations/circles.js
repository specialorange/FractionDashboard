function circlesJS() {

   // Just to make sure that JSONData is not altered between examples
  var data = JSONData.slice()
  var data;

  // d3.json("../data/circles.json", function(error, json) {
  //   if (error) return console.warn(error);
  //   data = json;
  //   // refreshGraph();
  // });

  var format = d3.time.format("%a %b %d %Y")
  var amountFn = function(d) { return d.amount }
  var dateFn = function(d) { return format.parse(d.created_at) }

   var x = d3.time.scale()
    .range([10, 280])

  var y = d3.scale.linear()
    .range([180, 10])
  var svg = d3.select("#circles").append("svg:svg")
   .attr("width", 300)
   .attr("height", 200)
  var start = d3.min(data, dateFn)
  var end = d3.max(data, dateFn)

  var refreshGraph = function() {

    x.domain(d3.extent(data, dateFn))
    y.domain(d3.extent(data, amountFn))

    var circles = svg.selectAll("circle").data(data, dateFn)
  
    circles.transition()
     .attr("cx", function(d) { return x(dateFn(d)) })
     .attr("cy", function(d) { return y(amountFn(d)) })

    circles.enter()
     .append("svg:circle")
     .attr("r", 4)
     .attr("cx", function(d) { return x(dateFn(d)) })
     .attr("cy", function(d) { return y(amountFn(d)) })
     .on("click", function(d) {
        d3.select("#circles .value").text("Date: " + d.created_at + " amount: " + d.amount)
     })
   
    circles.exit()
     .remove()
  }

  d3.selectAll("#circles .add-data")
    .on("click", function() {
      var date = new Date(end.getTime() + Math.random() * (end.getTime() - start.getTime()))
      obj = {
        'id': Math.floor(Math.random()*70),
        'amount': Math.floor(1000 + Math.random()*20001),
        'created_at': date.toDateString()
      }
      data.push(obj)
      refreshGraph()
    })

  d3.selectAll("#circles .remove-data")
    .on("click", function() {
      var idx = Math.floor(Math.random() * data.length)
      data.splice( Math.floor(Math.random() * data.length), 1 )
      refreshGraph()
    })

  refreshGraph()
  
};