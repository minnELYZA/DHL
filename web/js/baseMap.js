/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var width = 820,
    height = 720;

var projection = d3.geo.albers()
    .center([0, 34.6])
    .rotate([256.4, 0])
    .parallels([50, 60])
    .scale(1000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection)
    .pointRadius(2);
    
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("/Dashboard/china.json", function(china) {
  svg.selectAll(".subunit")
    .data(topojson.feature(china, china.objects.subunits).features)
    .enter().append("path")
    .attr("class", function(d) { return "subunit " + d.id; })
    .attr("d", path);
  
  svg.append("path")
    .datum(topojson.feature(china, china.objects.places))
    .attr("d", path)
    .attr("class", "place");

  svg.selectAll(".place-label")
    .data(topojson.feature(china, china.objects.places).features)
    .enter().append("text")
    .attr("class", "place-label")
    .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
    .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
    .attr("dy", ".35em")
    .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; })
    .text(function(d) { return d.properties.name; });
    
  svg.selectAll(".subunit-label")
    .data(topojson.feature(china, china.objects.subunits).features)
    .enter().append("text")
    .attr("class", function(d) {return "subunit-label " + d.id;})
    .attr("transform", function(d) {return "translate(" + path.centroid(d) + ")";})
    .attr("dy", ".35em")
    .text(function(d) {return d.properties.name;});
    
});