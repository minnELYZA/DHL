d3.csv("data/CDCSheet2.csv", function (error, data) {
    data.forEach(function (d) {
        d.CDC;
        d.Carriers = +d.Carriers;
        d.MostUtilisedCarrier;
        d.LessUtilisedCarrier;
        d.AveDensity = +d.AveDensity;
        d.Deliveries  = +d.Deliveries;
        d.AveCO2km  = +d.AveCO2km;
        d.TrafficRating  = +d.TrafficRating;
        d.DensityRating  = +d.DensityRating;
        d.EfficiencyRating  = +d.EfficiencyRating;
    });
    
    
});

