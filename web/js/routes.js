/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var graticule = d3.geo.graticule();
  
var svg = d3.select("svg").select("#features");

var cdc = {};
var rdc = {};
var test;
var rects;
var circles;
var lines;
var rectSelected = false;
var circleSelected = false;

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

  ptCdc.append("rect")
    .attr("name", function(d) {return d.key;})
    .attr("x", -5)
    .attr("y", -5)
    .attr("height", 10)
    .attr("width", 10);

  ptCdc.append("text")
    .attr("y", 15)
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
    .attr("y", -15)
    .attr("dy", ".71em")
    .text(function(d) { return d.key; });
  
  // select rects
  rects = svg.selectAll("rect")
          .on("click", function(d){
            circleSelected = false;
            rectSelected = true;
            console.log(d);
            // insert code here to clear prev selected nodes
            rects[0].forEach(function(e){
              e.style.fill = null;
            });
            circles[0].forEach(function(e){
              e.style.fill = null;
            });
            d3.select(this).style("fill", "yellow");
            lines[0].forEach(function(e){
              if (e.hasAttribute("from") && e.getAttribute("from") === d.key) {
                e.style.stroke = "lightcoral";
              } else if (e.hasAttribute("from")) {
                e.style.stroke = "none";
              }
            });
            getName(d.key);
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
            if (!rectSelected) {
              lines[0].forEach(function(e){
                if (e.hasAttribute("from")) {
                  e.style.stroke = null;
                }
              });
            }
          });
  
  // select circles
  circles = svg.selectAll("circle")
          .on("click", function(d){
            rectSelected = false;
            circleSelected = true;
            console.log(d);
            circles[0].forEach(function(e){
              e.style.fill = null;
            });
            rects[0].forEach(function(e){
              e.style.fill = null;
            });
            d3.select(this).style("fill", "yellow");
            lines[0].forEach(function(e){
              if (e.hasAttribute("to") && e.getAttribute("to") === d.key) {
                e.style.stroke = "lightcoral";
              } else if (e.hasAttribute("to")) {
                e.style.stroke = "none";
              }
            });
            getName(d.key);
          })
          .on("mouseover", function(d){
            this.style.cursor = "pointer";
            console.log(d.key);
            lines[0].forEach(function(e){
              if (e.hasAttribute("to") && e.getAttribute("to") === d.key) {
                e.style.stroke = "lightcoral";
              } else if (e.hasAttribute("to")) {
                e.style.stroke = "none";
              }
            });
          })
          .on("mouseout", function(d){
            if (!circleSelected) {
              lines[0].forEach(function(e){
                if (e.hasAttribute("to")) {
                  e.style.stroke = null;
                }
              });
            }
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
      rectSelected = false;
      circleSelected = false;
      console.log(d);
      circles[0].forEach(function(e){
        e.style.fill = null;
      });
      lines[0].forEach(function(e){
        if (e.hasAttribute("geometry")) {
          e.style.stroke = null;
        } else {
          if (e.hasAttribute("from") && d.route === e.getAttribute("from") + " , " + e.getAttribute("to")) {
            test = e;
            e.style.stroke = "lightcoral";
          } else if (e.hasAttribute("from")) {
            e.style.stroke = null;
          } else {
            e.style.stroke = null;
          }
        }
      });
      //return d.route to jiawei
    });
  });
});

