function pieChart() {
    // set the dimensions and margins of the graph
    var width = 450
    height = 450
    margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'pie_my_dataviz'
    var svg = d3.select("#pie_my_dataviz")
    .append("svg")
        .attr("width", width)
        .attr("height", height)
    .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // create 2 data_set
    var data1 = {a: 9, b: 20, c:30, d:8, e:12}
    var data2 = {a: 6, b: 16, c:20, d:14, e:19, f:12}
    var data3 = {a: 2, b: 4, c:2, d:4, e:1, f:6}

    // set the color scale
    var color = d3.scaleOrdinal()
    .domain(["a", "b", "c", "d", "e", "f"])
    .range(d3.schemeDark2);

    // A function that create / update the plot for a given variable:
    function pieupdate(data) {

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function(d) {return d.value; })
        .sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
    var data_ready = pie(d3.entries(data))

    // map to data
    var u = svg.selectAll("path")
        .data(data_ready)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    u.enter()
        .append('path')
        .merge(u)
        .transition()
        .duration(1000)
        .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
        )
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1)

    // remove the group that is not present anymore
    u.exit()
        .remove()

    }
    // Initialize the plot with the first dataset
    pieupdate(data1)
}


function lineChart() {
    // create 2 data_set
    var data1 = {a: 9, b: 20, c:30, d:8, e:12}
    var data2 = {a: 6, b: 16, c:20, d:14, e:19, f:12}
    var data3 = {a: 2, b: 4, c:2, d:4, e:1, f:6}

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 100, bottom: 30, left: 30},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    //Read the data
    d3.csv("https://raw.githubusercontent.com/sjosep419/sjosep419.github.io/main/csv2020%401.csv", function(data) {
    
        // List of groups (here I have one group per column)
        var allGroup = ["UIC", "DePaul", "Loyola"]
    
        // add the options to the button
        d3.select("#selectButton")
        .selectAll('myOptions')
            .data(allGroup)
        .enter()
            .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button
    
        // Add X axis --> it is a date format
        var x = d3.scaleLinear()
        .domain([1,4])
        .range([ 0, width ]);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    
        // Add Y axis
        var y = d3.scaleLinear()
        .domain( [0,8000])
        .range([ height, 0 ]);
        svg.append("g")
        .call(d3.axisLeft(y));
    
        // Initialize line with group a
        var line = svg
        .append('g')
        .append("path")
            .datum(data)
            .attr("d", d3.line()
            .x(function(d) { return x(+d.time) })
            .y(function(d) { return y(+d.UIC) })
            )
            .attr("stroke", "black")
            .style("stroke-width", 4)
            .style("fill", "none")
    
        // Initialize dots with group a
        var dot = svg
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
            .attr("cx", function(d) { return x(+d.time) })
            .attr("cy", function(d) { return y(+d.UIC) })
            .attr("r", 7)
            .style("fill", "#69b3a2")
    
    
        // A function that update the chart
        function update(selectedGroup) {
    
        // Create new data with the selection?
        var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })
    
        // Give these new data to update line
        line
            .datum(dataFilter)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                .x(function(d) { return x(+d.time) })
                .y(function(d) { return y(+d.value) })
            )
        dot
            .data(dataFilter)
            .transition()
            .duration(1000)
            .attr("cx", function(d) { return x(+d.time) })
            .attr("cy", function(d) { return y(+d.value) })
        }
    
        // When the button is changed, run the updateChart function
        d3.select("#selectButton").on("change", function(d) {
            // recover the option that has been chosen
            var selectedOption = d3.select(this).property("value")
            // run the updateChart function with this selected option
            update(selectedOption)
        })
    
    })
}

function init() {
    pieChart();
}
window.onload()