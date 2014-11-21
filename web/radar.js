function checkStatusRadar() {
    var w = 500,
            h = 500;
    var colorscale = d3.scale.category10();
//Legend titles
    var LegendOptions = ['Carrier'];
//Data
    var e = document.getElementById("carrierId");
    // format our data
    var c = e.options[e.selectedIndex].value;
    var carrierType = "";
    d3.csv("data/CarrierSheet.csv", function (data) {
        data = data.filter(function (row) {
            carrierType = "Carrier " + c;
            if (c === '--Select one--') {
                var daxis = [
                    [
                        {axis: "Traffic Rating", value: 0},
                        {axis: "Density Rating", value: 0},
                        {axis: "Efficiency Rating", value: 0}
                    ]
                ];
                var mycfg = {
                    w: w,
                    h: h,
                    maxValue: 0.6,
                    levels: 6,
                    ExtraWidthX: 300
                };
                RadarChart.draw("#chart", daxis, mycfg);
                return;
            } else if (c < 10) {
                return row['CarrierNo'] === ('Carrier0' + c);
            } else {
                return row['CarrierNo'] === ('Carrier' + c);
            }
        });
        data.forEach(function (d) {
            d.TrafficRating = +d.TrafficRating;
            d.DensityRating = +d.DensityRating;
            d.EfficiencyRating = +d.EfficiencyRating;
            var traffic = d.TrafficRating;
            var density = d.DensityRating;
            var efficiency = d.EfficiencyRating;
            var daxis = [
                [
                    {axis: "Traffic Rating", value: traffic},
                    {axis: "Density Rating", value: density},
                    {axis: "Efficiency Rating", value: efficiency}
                ]
            ];
//Options for the Radar chart, other than default
            var mycfg = {
                w: w,
                h: h,
                maxValue: 0.6,
                levels: 6,
                ExtraWidthX: 300
            };
//Call function to draw the Radar chart
//Will expect that data is in %'s
            RadarChart.draw("#chart", daxis, mycfg);
////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

            var svg = d3.select('#body')
                    .selectAll('svg')
                    .append('svg')
                    .attr("width", w + 300)
                    .attr("height", h);
//Create the title for the legend
            var text = svg.append("text")
                    .attr("class", "title")
                    .attr('transform', 'translate(90,0)')
                    .attr("x", w - 70)
                    .attr("y", 10)
                    .attr("font-size", "12px")
                    .attr("fill", "#404040")
                    .text("What % of owners use a specific service in a week");
//Initiate Legend	
            var legend = svg.append("g")
                    .attr("class", "legend")
                    .attr("height", 100)
                    .attr("width", 200)
                    .attr('transform', 'translate(90,20)')
                    ;
            //Create colour squares
            legend.selectAll('rect')
                    .data(LegendOptions)
                    .enter()
                    .append("rect")
                    .attr("x", w - 65)
                    .attr("y", function (daxis, i) {
                        return i * 20;
                    })
                    .attr("width", 10)
                    .attr("height", 10)
                    .style("fill", function (daxis, i) {
                        return colorscale(i);
                    })
                    ;
            //Create text next to squares
            legend.selectAll('text')
                    .data(LegendOptions)
                    .enter()
                    .append("text")
                    .attr("x", w - 52)
                    .attr("y", function (daxis, i) {
                        return i * 20 + 9;
                    })
                    .attr("font-size", "11px")
                    .attr("fill", "#737373")
                    .text(function (daxis) {
                        return daxis;
                    })
                    ;
        });
    });
}