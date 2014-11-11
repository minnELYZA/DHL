/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 // Set the dimensions of the canvas / graph
            var margin = {top: 30, right: 20, bottom: 30, left: 50},
                width = 600 - margin.left - margin.right,
                height = 270 - margin.top - margin.bottom;

            // Set the ranges
            var x = d3.scale.ordinal().rangeRoundBands([0,width],0.05);
            var y = d3.scale.linear().range([height, 0]);

            // Define the axes
            var xAxis = d3.svg.axis().scale(x)
                .orient("bottom").ticks(5);
            var yAxis = d3.svg.axis().scale(y)
                .orient("left").ticks(5);

            // Adds the svg canvas
            var svg = d3.select("body")
                .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform", 
                          "translate(" + margin.left + "," + margin.top + ")");
                          
            // Get the data                  
            d3.csv("data/CDCSheet2.csv", function(data) {
                data.forEach(function(d) {
                    d.CDC = d.CDC;
                    d.DensityRating = +d.DensityRating;
                });
                
                // Scale the range of the dataTra
                x.domain(data.map(function(d) { return d.CDC; }));
                y.domain([0, d3.max(data, function(d) { return d.TrafficRating; })]); 

                // Add the X Axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", "-.55em")
                    .attr("transform", "rotate(-90)" );

                // Add the Y Axis
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                
                // Add bars to the chart
                svg.selectAll("bar")
                    .data(data)
                    .enter().append("rect")
                    .style("fill", "steelblue")
                    .attr("x", function(d) { return x(d.CDC); })
                    .attr("width", x.rangeBand())
                    .attr("y", function(d) { return y(d.TrafficRating); })
                    .attr("height", function(d) { return height - y(d.TrafficRating); });
            });
