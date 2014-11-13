var dataTable = dc.dataTable("#dc-table-graph");
var RDCChart = dc.barChart("#dc-RDC-chart");
var DEChart = dc.barChart("#dc-DE-chart");
var CO2Chart = dc.barChart("#dc-CO2-chart");

// format our data

function getName(x)
{
  document.getElementById("charts").className = "col-md-6";
  d3.csv("data/DataWithDates.csv", function (data) {
    data = data.filter(function (row) {
      return row['EnglishOrigin'] === x || row['EnglishDestination'] === x;
    });
    var dateFormat = d3.time.format("%m-%d-%Y").parse;
    data.forEach(function (d) {
      d.IndexDate = dateFormat(d.IndexDate);
      d.Density = Math.round(+d.Density);
      d.CO2 = Math.round(+d.CO2);
      d.GCD = Math.round(+d.GCD);
      d.RDCTrafficRating = +d.RDCTrafficRating;
      d.RDCDensityRating = +d.RDCDensityRating;
      d.RDCEfficiencyRating = +d.RDCEfficiencyRating;
    });
    // Run the data through crossfilter and load our 'facts'
    var facts = crossfilter(data);
    var all = facts.groupAll();

    // timechart
    var deliveryByMonth = facts.dimension(function (d) {
      return d.IndexDate;
    });
    var deliveryByMonthGroup = deliveryByMonth.group()
            .reduceCount(function (d) {
              return d.IndexDate;
            });

    // Create density value
    var densityValue = facts.dimension(function (d) {
      return d.Density;
    });
    var densityValueGroupCount = densityValue.group()
            .reduceCount(function (d) {
              return d.Density;
            });
    var densityValueGroupSum = densityValue.group()
            .reduceSum(function (d) {
              return d.Density;
            });
    var co2Value = facts.dimension(function (d) {
      return d.CO2;
    });
    var co2ValueGroupCount = co2Value.group()
            .reduceCount(function (d) {
              return d.CO2;
            });
    var co2ValueGroupSum = co2Value.group()
            .reduceSum(function (d) {
              return d.CO2;
            });
    var timeDimension = facts.dimension(function (d) {
      return d.Density;
    });

    RDCChart.width(628)
            .height(150)
            .margins({top: 10, right: 10, bottom: 20, left: 30})
            .dimension(deliveryByMonth)
            .group(deliveryByMonthGroup)
            .transitionDuration(500)
            .centerBar(true)
            .gap(65)
            .filter([3, 5])
            .x(d3.time.scale().domain(d3.extent(data, function (d) {
              return d.IndexDate;
            })))
            .elasticY(true)
            .xAxis().tickFormat();

    DEChart.width(628)
            .height(150)
            .margins({top: 10, right: 10, bottom: 20, left: 30})
            .dimension(densityValue)
            .group(densityValueGroupCount)
            .transitionDuration(500)
            .centerBar(true)
            .gap(65)
            .x(d3.scale.linear().domain(d3.extent(data, function (d) {
              return d.Density;
            })))
            .elasticY(true)
            .xAxis().tickFormat();

    CO2Chart.width(628)
            .height(150)
            .margins({top: 10, right: 10, bottom: 20, left: 30})
            .dimension(co2Value)
            .group(co2ValueGroupCount)
            .transitionDuration(500)
            .centerBar(true)
            .gap(65)
//                .x(d3.scale.linear().domain([0, 5000]))
//                .y(d3.scale.linear().domain([15, 20]))
            .x(d3.scale.linear().domain(d3.extent(data, function (d) {
              return d.CO2;
            })))
            .elasticY(true)
            .elasticY(true)
            .xAxis().tickFormat();

    // Table of earthquake data
    dataTable.width(1288).height(800)
            .dimension(timeDimension)
            .group(function (d) {
              return "<b><i>RDC Table</i></b>";
            })
            .size(1000)
            .columns([
              function (d) {
                return d.Density;
              },
              function (d) {
                return d.GCD;
              },
              function (d) {
                return d.CO2;
              },
              function (d) {
                return d.IndexDate.toString().substring(4, 15);
              },
              function (d) {
                return d.EnglishOrigin;
              },
              function (d) {
                return d.EnglishDestination;
              },
              function (d) {
                return d.CO2Metric;
              },
              function (d) {
                return d.RDCTrafficRating;
              },
              function (d) {
                return d.RDCDensityRating;
              },
              function (d) {
                return d.RDCEfficiencyRating;
              }
            ])
            .sortBy(function (d) {
              return d.Density;
            })
            .order(d3.ascending);

    // Render the Charts
    dc.filterAll();
    dc.renderAll();
  });
}