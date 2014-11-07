/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

d3.csv("./data/Addresses.csv", function(error, addresses) {
  addresses.forEach(function (d){
    d.Latitude = +d.Latitude;
    d.Longitude = +d.Longitude;
  });
  
  var cdc = {};
  var rdc = {};
  for (add in addresses) {
    if (addresses[add].Type === "CDC") {
      cdc[addresses[add].Name] = [addresses[add].Longitude, addresses[add].Latitude];
  } else { // is RDC
      rdc[addresses[add].Name] = [addresses[add].Longitude, addresses[add].Latitude];
    }
  }
  
  var graticule = d3.geo.graticule();
  
  var svg = d3.select("svg");
  
  svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);
  
  var ptCdc = svg.append("g")
    .attr("class", "points cdc")
    .selectAll("g")
    .data(d3.entries(cdc))
    .enter().append("g")
    .attr("transform", function(d) { return "translate(" + projection(d.value) + ")"; });

  ptCdc.append("circle")
    .attr("r", 10);

  ptCdc.append("text")
    .attr("y", -25)
    .attr("dy", ".71em")
    .text(function(d) { return d.key; });
    
  var ptRdc = svg.append("g")
    .attr("class", "points rdc")
    .selectAll("g")
    .data(d3.entries(rdc))
    .enter().append("g")
    .attr("transform", function(d) { return "translate(" + projection(d.value) + ")"; });

  ptRdc.append("circle")
    .attr("r", 4.5);

  ptRdc.append("text")
    .attr("y", 10)
    .attr("dy", ".71em")
    .text(function(d) { return d.key; });
});

