d3.csv("data/DataWithDates.csv", function (data) {
    var dateFormat = d3.time.format('%m/%d/%Y');
    var numberFormat = d3.format('.2f');

    data.forEach(function (d) {
        d.dd = dateFormat.parse(d.IndexDate);
        d.month = d3.time.month(d.dd); // pre-calculate month for better performance
        d.close = +d.close; // coerce to number
        d.open = +d.open;
    });

    var ndx = crossfilter(data);
    var all = ndx.groupAll();

    dc.dataTable('.dc-data-table')
            .dimension(dateDimension)
            // data table does not use crossfilter group but rather a closure
            // as a grouping function
            .group(function (d) {
                var format = d3.format('02d');
                return d.dd.getFullYear() + '/' + format((d.dd.getMonth() + 1));
            })
            .size(10) // (optional) max number of records to be shown, :default = 25
            // There are several ways to specify the columns; see the data-table documentation.
            // This code demonstrates generating the column header automatically based on the columns.
            .columns([
                'date', // d['date'], ie, a field accessor; capitalized automatically
                'open', // ...
                'close', // ...
                {
                    label: 'Change', // desired format of column name 'Change' when used as a label with a function.
                    format: function (d) {
                        return numberFormat(d.close - d.open);
                    }
                },
                'volume'   // d['volume'], ie, a field accessor; capitalized automatically
            ])

            // (optional) sort using the given field, :default = function(d){return d;}
            .sortBy(function (d) {
                return d.dd;
            })
            // (optional) sort order, :default ascending
            .order(d3.ascending)
            // (optional) custom renderlet to post-process chart using D3
            .renderlet(function (table) {
                table.selectAll('.dc-table-group').classed('info', true);
            });

});