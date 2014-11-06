d3.csv("data/CDCSheet2.csv")
    .row(function(d) { return {key: d.key, value: +d.value}; })
    .get(function(error, rows) { console.log(rows); });