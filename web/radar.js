function checkStatusRadar() {
    var w = 300,
            h = 350;
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
            };
//Call function to draw the Radar chart
//Will expect that data is in %'s
            RadarChart.draw("#carrier-radar-chart", daxis, mycfg);
        });
    });
}