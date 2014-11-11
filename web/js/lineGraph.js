/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Set the dimensions of the canvas / graph
            var margin = {top: 30, right: 20, bottom: 30, left: 50},
                width = 600 - margin.left - margin.right,
                height = 270 - margin.top - margin.bottom;

            // Parse the date / time
            // var parseDate = d3.time.format("%b %Y").parse; 

            // Set the ranges
            var x = d3.scale.linear().range([0, width]);
            var y = d3.scale.linear().range([height, 0]);

            // Define the axes
            var xAxis = d3.svg.axis().scale(x)
                .orient("bottom").ticks(5);
            var yAxis = d3.svg.axis().scale(y)
                .orient("left").ticks(5);

            // Define the line
            var priceline = d3.svg.line()
                .x(function(d) { return x(d.AveDensity); })
                .y(function(d) { return y(d.TrafficRating); });

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
                    d.TrafficRating = +d.TrafficRating;
                    d.AveDensity = Math.round(+d.AveDensity);
                });
                
                // Scale the range of the dataTra
                x.domain(d3.extent(data, function(d) { return d.AveDensity; }));
                y.domain([0, d3.max(data, function(d) { return d.TrafficRating; })]); 

                // Nest the entries by symbol
                var dataNest = d3.nest()
                    .key(function(d) {return d.symbol;})
                    .entries(data);

                // Loop through each symbol / key
                dataNest.forEach(function(d) {

                    svg.append("path")
                        .attr("class", "line")
                        .attr("d", priceline(d.values)); 

                });

                // Add the X Axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                // Add the Y Axis
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);
            });
