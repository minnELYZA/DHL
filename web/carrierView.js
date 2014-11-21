function checkStatus()
{
    var e = document.getElementById("carrierId");
    var dataTable = dc.dataTable("#dc-table-graph");
    var c1Chart = dc.barChart("#carrier-bar-chart");
    // format our data
    var c = e.options[e.selectedIndex].value;
    var carrierType = "";
    d3.csv("data/DataWithDates1.csv", function (data) {
        data = data.filter(function (row) {
            carrierType = "Carrier " + c;
            if (c === null) {
                return;
            } else if (c < 10) {
                return row['CarrierRef'] === ('Carrier0' + c);
            } else {
                return row['CarrierRef'] === ('Carrier' + c);
            }
        });
        var dateFormat = d3.time.format("%m-%d-%Y").parse;
        data.forEach(function (d) {
            d.IndexDate = dateFormat(d.IndexDate);
            d.Density = Math.round(+d.Density);
            d.CO2 = Math.round(+d.CO2);
            d.GCD = Math.round(+d.GCD);
            d.CO2Metric = +d.CO2Metric;
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
        c1Chart.width(628)
                .height(150)
                .margins({top: 10, right: 10, bottom: 20, left: 40})
                .dimension(deliveryByMonth)
                .group(deliveryByMonthGroup)
                .centerBar(true)
                .gap(65)
                .x(d3.time.scale().domain(d3.extent(data, function (d) {
                    return d.IndexDate;
                })));
        dataTable.width(628).height(650)
                .dimension(timeDimension)
                .group(function (d) {
                    return "<b><i>" + carrierType + "</i></b>";
                })
                .size(50)
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
                        return d.Mode;
                    }
                ])
                .sortBy(function (d) {
                    return d.Density;
                })
                .order(d3.ascending);
        dc.renderAll();
    });
}

function seeMode(mode)
{
    var e = document.getElementById("carrierId");
    var dataTable = dc.dataTable("#dc-table-graph");
    var c1Chart = dc.barChart("#carrier-bar-chart");
    // format our data
    var c = e.options[e.selectedIndex].value;
    var carrierType = "";
    d3.csv("data/DataWithDates1.csv", function (data) {
        data = data.filter(function (row) {
            if (c < 10) {
                return row['CarrierRef'] === ('Carrier0' + c) && row['Mode'] === (mode);
            } else {
                return row['CarrierRef'] === ('Carrier' + c) && row['Mode'] === (mode);
            }
        });
        var dateFormat = d3.time.format("%m-%d-%Y").parse;
        data.forEach(function (d) {
            d.IndexDate = dateFormat(d.IndexDate);
            d.Density = Math.round(+d.Density);
            d.CO2 = Math.round(+d.CO2);
            d.GCD = Math.round(+d.GCD);
            d.CO2Metric = +d.CO2Metric;
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
        c1Chart.width(628)
                .height(150)
                .margins({top: 10, right: 10, bottom: 20, left: 40})
                .dimension(deliveryByMonth)
                .group(deliveryByMonthGroup)
                .centerBar(true)
                .gap(65)
                .x(d3.time.scale().domain(d3.extent(data, function (d) {
                    return d.IndexDate;
                })));
        dataTable.width(628).height(650)
                .dimension(timeDimension)
                .group(function (d) {
                    return "<b><i>" + carrierType + "</i></b>";
                })
                .size(10)
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
                        return d.Mode;
                    }
                ])
                .sortBy(function (d) {
                    return d.Density;
                })
                .order(d3.ascending);
        dc.renderAll();
    });
}