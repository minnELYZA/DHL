function checkStatus()
{
    for (count = 0; count < 12; count++)
    {
        if (carrierForm.Carrier[count].checked) {
            var dataTable = dc.dataTable("#dc-table-graph");
            var c1Chart = dc.barChart("#dc-c1-chart");
            // format our data
            var c = count;
            var carrierType = "";
            d3.csv("data/DataWithDates.csv", function (data) {
                data = data.filter(function (row) {
                    console.log(count);
                    if (c == 0){
                        carrierType = "Carrier 1";
                        return row['CarrierRef'] === 'Carrier01';
                    }
                    if (c == 1){
                        carrierType = "Carrier 2";
                        return row['CarrierRef'] === 'Carrier02';
                    }
                    if (c == 2){
                        carrierType = "Carrier 3";
                        return row['CarrierRef'] === 'Carrier03';
                    }
                    if (c == 3){
                        carrierType = "Carrier 4";
                        return row['CarrierRef'] === 'Carrier04';
                    }
                    if (c == 4){
                        carrierType = "Carrier 5";
                        return row['CarrierRef'] === 'Carrier05';
                    }
                    if (c == 5){
                        carrierType = "Carrier 6";
                        return row['CarrierRef'] === 'Carrier06';
                    }
                    if (c == 6){
                        carrierType = "Carrier 7";
                        return row['CarrierRef'] === 'Carrier07';
                    }
                    if (c == 7){
                        carrierType = "Carrier 8";
                        return row['CarrierRef'] === 'Carrier08';
                    }
                    if (c == 8){
                        carrierType = "Carrier 9";
                        return row['CarrierRef'] === 'Carrier09';
                    }
                    if (c == 9){
                        carrierType = "Carrier 10";
                        return row['CarrierRef'] === 'Carrier10';
                    }
                    if (c == 10){
                        carrierType = "Carrier 11";
                        return row['CarrierRef'] === 'Carrier11';
                    }
                    if (c == 11){
                        carrierType = "Carrier 12";
                        return row['CarrierRef'] === 'Carrier12';
                    }
                });
                var dateFormat = d3.time.format("%m-%d-%Y").parse;
                data.forEach(function (d) {
                    d.IndexDate = dateFormat(d.IndexDate);
                    d.Density = Math.round(+d.Density);
                    d.CO2 = Math.round(+d.CO2);
                    d.GCD = Math.round(+d.GCD);
                    d.CO2Metric = +d.CO2Metric;
                    console.log(d.IndexDate);
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
                c1Chart.width(550)
                        .height(150)
                        .margins({top: 10, right: 10, bottom: 20, left: 40})
                        .dimension(deliveryByMonth)
                        .group(deliveryByMonthGroup)
                        .centerBar(true)
                        .gap(65)
                        .x(d3.time.scale().domain(d3.extent(data, function (d) {
                            return d.IndexDate;
                        })));
                dataTable.width(960).height(800)
                        .dimension(timeDimension)
                        .group(function (d) {
                            return "<b><i>"+carrierType+"</i></b>";
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
                                return d.CarrierRef;
                            }
                        ])
                        .sortBy(function (d) {
                            return d.Density;
                        })
                        .order(d3.ascending);
                dc.renderAll();
            });
        }
    }
}
