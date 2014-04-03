// Argh, Chrome 15's stupid iframe SVG bug!

var position = d3.select("#position").append("span").append("div")
    .style("width", "140px")
  .append("svg:svg")
    .attr("width", 140)
    .attr("height", 24);

position.append("svg:path")
    .attr("d", "M0.5,19V10V14.5H139.5V10V19")
    .style("fill", "none")
    .style("stroke", "black");

position.selectAll("circle")
    .data([1, 2, 5, 8, 12])
  .enter()  .append("svg:circle")
    .attr("cx", function(d) { return d * 10; })
    .attr("cy", 14.5)
    .attr("r", 5.5)
    .style("fill", "#1f77b4")
    .style("stroke", "white")
    .style("stroke-width", "1.5px");

var length = d3.select("#length").append("span").selectAll("div")
    .data([2, 3, 5, 8, 12])
  .enter().append("div")
    .style("width", function(d) { return d * 2 + "px"; })
  .append("svg:svg")
    .attr("width", function(d) { return d * 2; })
    .attr("height", 24);

length.append("svg:rect")
    .attr("y", 5)
    .attr("width", function(d) { return d * 2; })
    .attr("height", 19)
    .style("fill", "#1f77b4");

var area = d3.select("#area").append("span").selectAll("div")
    .data([2, 3, 5, 8, 12])
  .enter().append("div")
    .style("width", function(d) { return d * 2 + "px"; })
  .append("svg:svg")
    .attr("width", function(d) { return d * 2; })
    .attr("height", 24);

area.append("svg:circle")
    .attr("cx", Number)
    .attr("cy", 12)
    .attr("r", Number)
    .style("fill", "#1f77b4");

var arc = d3.svg.arc()
    .innerRadius(4)
    .outerRadius(12)
    .startAngle(0)
    .endAngle(Number);

var angle = d3.select("#angle").append("span").selectAll("div")
    .data([2, 3, 5, 8, 12].map(function(d) { return .2 + d / 4; }))
  .enter().append("div")
    .style("width", "12px")
  .append("svg:svg")
    .attr("width", 12)
    .attr("height", 24);

angle.append("svg:path")
    .attr("transform", "translate(0,12)")
    .attr("d", arc)
    .style("fill", "#1f77b4");

var shape = d3.select("#shape").append("span").selectAll("div")
    .data(d3.svg.symbolTypes)
  .enter().append("div")
    .style("width", "12px")
  .append("svg:svg")
    .attr("width", 12)
    .attr("height", 24);

shape.append("svg:path")
    .attr("transform", "translate(12,12)")
    .attr("d", d3.svg.symbol().type(String).size(100))
    .style("fill", "#1f77b4");

var hue = d3.select("#hue").append("span").selectAll("div")
    .data([2, 3, 5, 8, 12])
  .enter().append("div")
  .append("svg:svg")
    .attr("width", 24)
    .attr("height", 24);

hue.append("svg:rect")
    .attr("y", 5)
    .attr("x", 3)
    .attr("width", 19)
    .attr("height", 19)
    .style("fill", d3.scale.category10());

var opacity = d3.select("#opacity").append("span").selectAll("div")
    .data([.1, .3, .5, .7, 1])
  .enter().append("div")
  .append("svg:svg")
    .attr("width", 24)
    .attr("height", 24);

opacity.append("svg:rect")
    .attr("y", 5)
    .attr("x", 3)
    .attr("width", 19)
    .attr("height", 19)
    .style("fill", 'black')
    .style("opacity", function(d) {
      console.log(d);
      return d;
      });

var connection = d3.select("#connection").append("span").append("div")
    .style("width", "140px")
  .append("svg:svg")
    .attr("width", 140)
    .attr("height", 24);

connection.append("svg:defs").append("svg:marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 10)
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5")
    .style("fill", "#1f77b4");

connection.selectAll("circle")
    .data([7, 67])
  .enter().append("svg:circle")
    .attr("cy", 14.5)
    .attr("cx", Number)
    .attr("r", 4.5);

connection.append("svg:path")
    .attr("d", "M14,14.5H61")
    .attr("marker-end", "url(#arrow)")
    .style("fill", "none")
    .style("stroke", "#1f77b4")
    .style("stroke-width", 2);

var encodingsByType = {
  categorical: {position: 1, shape: 1, hue: 1},
  ordinal: {position: 1, length: 1, area: 1, angle: 1},
  quantitative: {position: 1, length: 1, area: 1, angle: 1},
  relational: {position: 1, connection: 1},
  spatial: {position: 1}
};

var typesByEncoding = {
  position: {categorical: 1, ordinal: 1, quantitative: 1, relational: 1, spatial: 1},
  length: {ordinal: 1, quantitative: 1},
  area: {ordinal: 1, quantitative: 1},
  angle: {ordinal: 1, quantitative: 1},
  shape: {categorical: 1},
  hue: {categorical: 1},
  connection: {relational: 1}
};

d3.selectAll("#types li")
    .map(function() { return this.id; })
    // .on("mouseover.show", show(encodingsByType))
    // .on("mouseout.show", showAll);


d3.selectAll("#encodings li")
    .map(function() { return this.id; })
    // .on("mouseover.show", show(typesByEncoding))
    // .on("mouseout.show", showAll);

function show(ids) {
  return function(id) {
    d3.selectAll("li").classed("hidden", function(d) {
      return d != id && !(d in ids[id]);
    });
  };
}

function showAll() {
  d3.selectAll("li").classed("hidden", false);
}