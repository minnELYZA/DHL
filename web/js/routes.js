/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var graticule = d3.geo.graticule();
  
var svg = d3.select("svg").select("g");

var cdc = {};
var rdc = {};
var test;
var circles;
var lines;

d3.csv("./data/Addresses.csv", function(error, addresses) {
  addresses.forEach(function (d){
    d.Latitude = +d.Latitude;
    d.Longitude = +d.Longitude;
  });
  
  for (add in addresses) {
    if (addresses[add].Type === "CDC") {
      cdc[addresses[add].Name] = [addresses[add].Longitude, addresses[add].Latitude];
  } else { // is RDC
      rdc[addresses[add].Name] = [addresses[add].Longitude, addresses[add].Latitude];
    }
  }

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
    .attr("name", function(d) {return d.key;})
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
    .attr("name", function(d) {return d.key;})
    .attr("r", 4.5);

  ptRdc.append("text")
    .attr("y", 10)
    .attr("dy", ".71em")
    .text(function(d) { return d.key; });
    

  
  
  // select circles
  circles = svg.selectAll("circle")
          .on("click", function(d){
            console.log(d);
            circles[0].forEach(function(e){
              e.style.fill = null;
            });
            d3.select(this).style("fill", "yellow");
            //return d.key to jiawei
          })
          .on("mouseover", function(d){
            this.style.cursor = "pointer";
            console.log(d.key);
            lines[0].forEach(function(e){
              if (e.hasAttribute("from") && e.getAttribute("from") === d.key) {
                e.style.stroke = "lightcoral";
              } else if (e.hasAttribute("from")) {
                e.style.stroke = "none";
              }
            });
          })
          .on("mouseout", function(d){
            lines[0].forEach(function(e){
              if (e.hasAttribute("from")) {
                e.style.stroke = "grey";
              }
            });
          });
    
  d3.csv("./data/RouteSheet3.csv", function(error, route) {
    for (r in route) {
      var name = route[r].RouteName;
      var name1 = name.substr(0,name.lastIndexOf(",")).trim();
      var name2 = name.substr(name.lastIndexOf(",") + 1).trim();

      var line = {
        route: name,
        type: "LineString",
        coordinates: [
          cdc[name1],
          rdc[name2]
        ]
      };

      svg.append("path")
      .datum(line)
      .attr("from", name1)
      .attr("to", name2)
      .attr("class", "route " + name1)
      .attr("d", path);
    }

    // select lines
    lines = svg.selectAll("path").on("click", function(d){
      console.log(d);
      //return d.route to jiawei
    });
  });
});

