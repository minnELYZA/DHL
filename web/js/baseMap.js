/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var width = 650,
    height = 550;

var projection = d3.geo.albers()
    .center([0, 34.6])
    .rotate([253.4, 0])
    .parallels([50, 60])
    .scale(900)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection)
    .pointRadius(2);
    
var zoom = d3.behavior.zoom()
    .translate([0, 0])
    .scale(1)
    .scaleExtent([1, 8])
    .on("zoom", zoomed);
    
var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(zoom);

var g = svg.append("g");

var base = g.append("g")
    .attr("id", "base");

var features = g.append("g")
    .attr("id", "features");

/* svg.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .call(zoom); */

d3.json("/Dashboard/china.json", function(china) {
  base.selectAll(".subunit")
    .data(topojson.feature(china, china.objects.subunits).features)
    .enter().append("path")
    .attr("class", function(d) { return "subunit " + d.id; })
    .attr("d", path);
  
//  svg.append("path")
//    .datum(topojson.feature(china, china.objects.places))
//    .attr("d", path)
//    .attr("class", "place");

//  svg.selectAll(".place-label")
//    .data(topojson.feature(china, china.objects.places).features)
//    .enter().append("text")
//    .attr("class", "place-label")
//    .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
//    .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
//    .attr("dy", ".35em")
//    .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; })
//    .text(function(d) { return d.properties.name; });
    
  base.selectAll(".subunit-label")
    .data(topojson.feature(china, china.objects.subunits).features)
    .enter().append("text")
    .attr("class", function(d) {return "subunit-label " + d.id;})
    .attr("transform", function(d) {return "translate(" + path.centroid(d) + ")";})
    .attr("dy", ".35em")
    .text(function(d) {return d.properties.name;});
    
});

function zoomed() {
  g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  //base.select(".subunit").style("stroke-width", 1.5 / d3.event.scale + "px");
  //base.select(".subunit-label").style("stroke-width", 1.5 / d3.event.scale + "px");
  //features.select(".graticule").style("stroke-width", 0.5 + "px");
  d3.selectAll("circle")
      .attr("r", 4.5/d3.event.scale)
      .attr("style", "stroke-width:" + 2/d3.event.scale + "px;");
  d3.selectAll("rect")
      .attr("x", -5/d3.event.scale)
      .attr("y", -5/d3.event.scale)
      .attr("height", 10/d3.event.scale)
      .attr("width", 10/d3.event.scale)
      .attr("style", "stroke-width:" + 2/d3.event.scale + "px;");
  d3.selectAll(".rdc").selectAll("text")
      .attr("y", -15/d3.event.scale)
      .attr("style", "font-size:" + 10/d3.event.scale + ";");
  d3.selectAll(".cdc").selectAll("text")
      .attr("y", 15/d3.event.scale)
      .attr("style", "font-size:" + 13/d3.event.scale + ";");
  d3.selectAll(".route").selectAll("path")
      .attr("style", "stroke-width:" + 1/d3.event.scale + "px;");
}

d3.select(self.frameElement).style("height", height + "px");