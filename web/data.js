// Create the dc.js chart objects & link to div
var dataTable = dc.dataTable("#dc-table-graph");
var RDCChart = dc.barChart("#dc-RDC-chart");
var DEChart = dc.barChart("#dc-DE-chart");


// load data from a csv file
d3.csv("data/RDCSheet2.csv", function (data) {

    data.forEach(function (d) {
        d.AveDensity = Math.round(+d.AveDensity);
        d.Deliveries = +d.Deliveries;
        d.AveCO2km = (+d.AveCO2km).toFixed(3);
        d.TrafficRating = +d.TrafficRating;
        d.DensityRating = +d.DensityRating;
        d.EfficiencyRating = +d.EfficiencyRating;
    });

    // Run the data through crossfilter and load our 'facts'
    var facts = crossfilter(data);
    var all = facts.groupAll();

    // Create avedensity value
    var densityValue = facts.dimension(function (d) {
        return d.AveDensity;
    });
    var densityValueGroupCount = densityValue.group()
            .reduceCount(function (d) {
                return d.AveDensity;
            });
    var densityValueGroupSum = densityValue.group()
            .reduceSum(function (d) {
                return d.AveDensity;
            });

    // for traffic rating
    var trValue = facts.dimension(function (d) {
        return d.TrafficRating;
    });
    var trValueGroup = trValue.group();

    // Density rating
    var deValue = facts.dimension(function (d) {
        return d.DensityRating;
    });
    var deValueGroup = deValue.group();

    // Efficiency rating
    var eValue = facts.dimension(function (d) {
        return d.EfficiencyRating;
    });
    var eValueGroup = eValue.group();

    // Create dataTable dimension
    var timeDimension = facts.dimension(function (d) {
        return d.AveDensity;
    });

    RDCChart.width(480)
            .height(150)
            .margins({top: 10, right: 10, bottom: 20, left: 40})
            .dimension(densityValue)
            .group(densityValueGroupCount)
            .transitionDuration(500)
            .centerBar(true)
            .gap(65)
            .filter([3, 5])
            .x(d3.scale.linear().domain(d3.extent(data, function (d) {
                return d.AveDensity;
            })))
            .elasticY(true)
            .xAxis().tickFormat();

    DEChart.width(480)
            .height(150)
            .margins({top: 10, right: 10, bottom: 20, left: 40})
            .dimension(deValue)
            .group(deValueGroup)
            .transitionDuration(500)
            .centerBar(true)
            .gap(65)
            .x(d3.scale.linear().domain([0, 5]))
            .elasticY(true)
            .xAxis().tickFormat();

    // Table of earthquake data
    dataTable.width(960).height(800)
            .dimension(timeDimension)
            .group(function (d) {
                return "CDC Table";
            })
            .size(10)
            .columns([
                function (d) {
                    return d.AveDensity;
                },
                function (d) {
                    return d.Deliveries;
                },
                function (d) {
                    return d.AveCO2km;
                },
                function (d) {
                    return d.TrafficRating;
                },
                function (d) {
                    return d.DensityRating;
                },
                function (d) {
                    return d.EfficiencyRating;
                }
            ])
            .sortBy(function (d) {
                return d.AveDensity;
            })
            .order(d3.ascending);

    // Render the Charts


    dc.renderAll();


});
