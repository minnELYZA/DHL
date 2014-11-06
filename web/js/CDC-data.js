d3.csv("data/CDCSheet2.csv", function (error, data) {
    data.forEach(function (d) {
        var cdc = d.CDC;
        var carriers = d.Carriers;
        var mostUtilisedCarriers = d.MostUtilisedCarrier;
        var lessUtilisedCarrier = d.LessUtilisedCarrier;
        var aveDensity  = d.AveDensity ;
        var deliveries  = d.Deliveries ;
        var aveCO2km  = d.AveCO2km ;
        var trafficRating  = d.TrafficRating ;
        var densityRating  = d.DensityRating ;
        var efficiencyRating  = d.EfficiencyRating ;
    });
});