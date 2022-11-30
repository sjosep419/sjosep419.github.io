// Global variable representing the dataset from college campuses from 2018
var data2018 = [{"station":"900 W Harrison St","ridership":1789,"date":"2018-01-01T00:00:00.000Z"},
{"station":"Sheffield Ave & Fullerton Ave","ridership":3856,"date":"2018-01-01T00:00:00.000Z"},
{"station":"Sheridan Rd & Greenleaf Ave","ridership":347,"date":"2018-01-01T00:00:00.000Z"},
{"station":"900 W Harrison St","ridership":3241,"date":"2018-04-01T00:00:00.000Z"},
{"station":"Sheffield Ave & Fullerton Ave","ridership":9340,"date":"2018-04-01T00:00:00.000Z"},
{"station":"Sheridan Rd & Greenleaf Ave","ridership":951,"date":"2018-04-01T00:00:00.000Z"},
{"station":"900 W Harrison St","ridership":4198,"date":"2018-07-01T00:00:00.000Z"},
{"station":"Sheffield Ave & Fullerton Ave","ridership":13350,"date":"2018-07-01T00:00:00.000Z"},
{"station":"Sheridan Rd & Greenleaf Ave","ridership":1697,"date":"2018-07-01T00:00:00.000Z"},
{"station":"900 W Harrison St","ridership":2714,"date":"2018-10-01T00:00:00.000Z"},
{"station":"Sheffield Ave & Fullerton Ave","ridership":6702,"date":"2018-10-01T00:00:00.000Z"},
{"station":"Sheridan Rd & Greenleaf Ave","ridership":513,"date":"2018-10-01T00:00:00.000Z"}]

// All variables used throughout the functions as a global variable
var xScale;
var yScale;
var xAxis;
var yAxis;

var X;
var Y;
var Z;
var O;
var D;
var I;
var T;

var line;
var svg;
var path;
var dot;



function LineChart(data, {
    x = ([x]) => x, // given d in data, returns the (temporal) x-value
    y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    z = () => 1, // given d in data, returns the (categorical) z-value
    title, // given d in data, returns the title text
    defined, // for gaps in data
    curve = d3.curveLinear, // method of interpolation between points
    marginTop = 20, // top margin, in pixels
    marginRight = 30, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    xType = d3.scaleUtc, // type of x-scale
    xDomain, // [xmin, xmax]
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // type of y-scale
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    zDomain, // array of z-values
    color = "currentColor", // stroke color of line, as a constant or a function of *z*
    strokeLinecap, // stroke line cap of line
    strokeLinejoin, // stroke line join of line
    strokeWidth = 1.5, // stroke width of line
    strokeOpacity, // stroke opacity of line
    mixBlendMode = "multiply", // blend mode of lines
    voronoi // show a Voronoi overlay? (for debugging)
  } = {}) {
    // Compute values - // Pull out passed in x, y, and z axes from dataset and store in new variables
    X = d3.map(data, x);
    Y = d3.map(data, y);
    Z = d3.map(data, z);
    O = d3.map(data, d => d);
    if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
    D = d3.map(data, defined);
  
    // Compute default domains, and unique the z-domain.
    if (xDomain === undefined) xDomain = d3.extent(X);
    if (yDomain === undefined) yDomain = [0, d3.max(Y, d => typeof d === "string" ? +d : d)];
    if (zDomain === undefined) zDomain = Z;
    zDomain = new d3.InternSet(zDomain);
  
    // Omit any data not present in the z-domain.
    I = d3.range(X.length).filter(i => zDomain.has(Z[i])); // Stores indices for all elements in the zDomain InternSet
  
    // Construct scales and axes.
    xScale = xType(xDomain, xRange);
    yScale = yType(yDomain, yRange);
    xAxis = d3.axisBottom(xScale).ticks(width / 80);
    yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);
  
    // Compute titles.
    T = title === undefined ? Z : title === null ? null : d3.map(data, title);
  
    // Construct a line generator.
    line = d3.line()
        .defined(i => D[i])
        .curve(curve)
        .x(i => xScale(X[i]))
        .y(i => yScale(Y[i]));
  
    // Create a svg with dimension constrains.
    svg = d3.select("#chart") // div in the index.html
        .append("svg") // append the graph to the svg element of the div
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .style("-webkit-tap-highlight-color", "transparent")
        .on("pointerenter", pointerentered)
        .on("pointermove", pointermoved)
        .on("pointerleave", pointerleft)
        .on("touchstart", event => event.preventDefault());
  
    // An optional Voronoi display.
    // if (voronoi) svg.append("path")
    //     .attr("fill", "none")
    //     .attr("stroke", "#ccc")
    //     .attr("d", d3.Delaunay
    //       .from(I, i => xScale(X[i]), i => yScale(Y[i]))
    //       .voronoi([0, 0, width, height])
    //       .render());
  
    // Create xAxis
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis)
  
    // Create yAxis
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        // .call(voronoi ? () => {} : g => g.selectAll(".tick line").clone()
        //     .attr("x2", width - marginLeft - marginRight)
        //     .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 30)
            .attr("fill", "black")
            .attr("text-anchor", "start")
            .style("font-size", "12px")
            .text(yLabel));
    
    // Create label for the x-axis
    svg.append("text")
       .attr("transform", "translate(" + (width/2) + " ," + (height) + ")")
       .style("text-anchor", "middle")
       .style("font-size", "14px")
       .text("Month");
    

    // What we believe the problem is -- should be adding data to the path element
    path = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", typeof color === "string" ? color : null)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-opacity", strokeOpacity)
      .selectAll("path")
      .data(d3.group(I, i => Z[i]))
      .enter().append('path')
        .style("mix-blend-mode", mixBlendMode)
        .attr("stroke", typeof color === "function" ? ([z]) => color(z) : null)
        .attr("d", ([, I]) => line(I));
  
    // Add dots at each input of the line
    dot = svg.append("g")
        .attr("display", "none");
  
    dot.append("circle")
        .attr("r", 2.5);
  
    dot.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .attr("y", -8);
  
    // Function to keep track of the the mouse pointer on the graph
    function pointermoved(event) {
      var [xm, ym] = d3.pointer(event);
      var i = d3.least(I, i => Math.hypot(xScale(X[i]) - xm, yScale(Y[i]) - ym)); // closest point
      path.style("stroke", ([z]) => Z[i] === z ? null : "#ddd").filter(([z]) => Z[i] === z).raise();
      dot.attr("transform", `translate(${xScale(X[i])},${yScale(Y[i])})`);
      if (T) dot.select("text").text(T[i]);
      svg.property("value", O[i]).dispatch("input", {bubbles: true});
    }
  
    function pointerentered() {
      path.style("mix-blend-mode", null).style("stroke", "#ddd");
      dot.attr("display", null);
    }
  
    function pointerleft() {
      path.style("mix-blend-mode", mixBlendMode).style("stroke", null);
      dot.attr("display", "none");
      svg.node().value = null;
      svg.dispatch("input", {bubbles: true});
    }
    
    return Object.assign(svg.node(), {value: null});
  }

  // init function called when window is loaded
  function init() {
    const lines = LineChart(data2018, {
        x: d => d.date,
        y: d => d.ridership,
        z: d => d.station,
        yLabel: "↑ Ridership",
        width: 640,
        height:500,
        color: "steelblue"
      })
  }

  window.onload = init;