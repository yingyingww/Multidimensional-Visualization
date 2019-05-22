/**
Data Visualization
Assignment 3 Part II
Oct 7th 2018
By Saahithi Rao and Yingying Wang
We adopted a starting code based on Lab1's scatterTutorialSolution.js 
and refered to randomPointsSOLUTION.js for interactive effects

Sources:
We learned about Javascript functions through:
https://www.w3schools.com/js/default.asp
We learned how to manipulate svg functions through:
https://www.w3schools.com/graphics/svg_intro.asp
We refered this source for adding info boxes: http://jonathansoma.com/tutorials/d3/hover-notes/
**/

// Constants to define non-data-related parts of the visualization
var w = 900;			// Width of our individual scatterplots in SPLOMs
var h = 500;			// Height of our visualization
var xOffset = 35;		// Space for x-axis labels
var margin = 10;		// Margin around visualization
var selected = null;

    // Constants to space on y-axis along x-axis
    xVal = [150, 300, 450, 600, 750];
    // Y-axis
    yVal = ['flight_index','num_o_ring_distress','launch_temp','leak_check_pressure','tufte_metric']; 
    yVal0 = yVal[0] // initial Y-value set to flight-index


// Load data 
d3.csv('challenger.csv', function(csvData) {
	data = csvData;
    svg = d3.select('#pointsSVG').append('svg:svg')
            .attr('width', w)
            .attr('height', h);
    
    // for loop that creates five lines for coordinates
    for (i = 0; i < 5; i++) {
        x = xVal[i];
        x1 = xVal[i + 1];
        y = yVal[i];
        y1 = yVal[i + 1];
        
        // Y-scale of axis
        yScale = d3.scale.linear()
				.domain([d3.min(data, function(d) { return parseFloat(d[y]); })-1,
						 d3.max(data, function(d) { return parseFloat(d[y]);})+1])
				.range([h - xOffset - margin, margin]);
        
        yScale1 = d3.scale.linear()
				.domain([d3.min(data, function(d) { return parseFloat(d[y1]); })-1,
						 d3.max(data, function(d) { return parseFloat(d[y1]); })+1])
				.range([h - xOffset - margin, margin]);
        
        // Builds axis
        yAxis = d3.svg.axis()
                .scale(yScale)
				.orient('left')
				.ticks(5);
	    yAxisG = svg.append('g')
				.attr('class', 'axis')
				.attr('transform', 'translate(' + x + ',0)')
				.call(yAxis)
	    yLabel = svg.append('text')
				.attr('class','label')
				.attr('x', x)
				.attr('y', h - 30)
				.text(y)
    
        // Selects and binds data to points 
        point = svg.selectAll('.point')
                .data(data);
    
            point.enter().append('svg:circle');

        // Give point class, x and y coordinate, colors it blue, and sets size
        point
		  .attr('class', function(d) { return 'i' + d[yVal0]; })	
		  .attr('cx', x)
		  .attr('cy', function(d) { return yScale(d[y]); })
		  .style('fill','blue')
          .style('opacity', 0.7)
		  .attr('r', 2.5)									
        
        // Hovering over point will display info box
          .on("mouseover", function(d) {
           //select the data values to display
            d3.select(".infobox .flight_index").text(d['flight_index']);
            d3.select(".infobox .num_o_ring_distress").text(d['num_o_ring_distress']);
            d3.select(".infobox .launch_temp").text(d['launch_temp']);
            d3.select(".infobox .leak_check_pressure").text(d['leak_check_pressure']);
            d3.select(".infobox .tufte_metric").text(d['tufte_metric']);    
            // Show the infobox
            d3.select(".infobox").style('visibility', 'visible');
           // Enlarges the moused over point for pop out effect
            d3.select(this)
                .transition()
                .duration(100)
                .attr("r",6)
            })
        
        // Clicking point will change it to yellow and back to blue when de-selected
        // and change line from green to orange and back to green when de-selected
        .on("click", function(d) {
            temporary =d;
           if(!selected){
               selected = temporary;
               d3.selectAll('circle')
               .filter(function(d) {
                return (d === temporary)})
                .style('fill', 'yellow');
                d3.selectAll('line')
               .filter(function(d) {
                return (d === temporary)})
                .attr('style', "stroke:orange;stroke-width:2");
           }else if (selected == temporary){
               selected = null;
               d3.selectAll('circle')
               .filter(function(d) {
                return (d === temporary)})
               .style('fill', 'blue');
               d3.selectAll('line')
               .filter(function(d) {
                return (d === temporary)})
                .attr('style', "stroke:green;stroke-width:2");
           }
        })

        // Moving mouse away will hide info box and return point to original size
        .on("mouseout", function(d) {
           //Hide the info 
           d3.select(".infobox").style('visibility', 'hidden');
           d3.select(this)
                .transition()
                .duration(100)
                .attr('r', 2.5);
            })
        
        // Loops through and binds data to line
        if (i < 4) {
            line = svg.selectAll('.line')
                .data(data);

        line.enter().append('svg:line');
        
        // Gives line a class, x and y-coordinate at each end, and green color
        line
		.attr('class', function(d) { return 'i' + d[yVal0]; })	
		.attr('x1', x)
		.attr('y1', function(d) { return yScale(d[y]); })
		.attr('x2', x1)
		.attr('y2', function(d) { return yScale1(d[y1]); })
        .attr('style', 'stroke:green;stroke-width:2')
            // Mouse over
          .on("mouseover", function(d) {
           // Select data values to display
            d3.select(".infobox .flight_index").text(d['flight_index']);
            d3.select(".infobox .num_o_ring_distress").text(d['num_o_ring_distress']);
            d3.select(".infobox .launch_temp").text(d['launch_temp']);
            d3.select(".infobox .leak_check_pressure").text(d['leak_check_pressure']);
            d3.select(".infobox .tufte_metric").text(d['tufte_metric']);    
            // Show the infobox
            d3.select(".infobox").style('visibility', 'visible');
            })
            
        // Clicking on line will change it to orange and back to green when de-selected
        // And change point to yellow and back to blue when de-selected
        .on("click", function(d) {
            temporary =d;
           if(!selected){
               selected = temporary;
               d3.selectAll('circle')
               .filter(function(d) {
                return (d === temporary)})
                .style('fill', 'yellow');
                d3.selectAll('line')
               .filter(function(d) {
                return (d === temporary)})
                .attr('style', "stroke:orange;stroke-width:2");
           }else if (selected == temporary){
               selected = null;
               d3.selectAll('circle')
               .filter(function(d) {
                return (d === temporary)})
               .style('fill', 'blue');
               d3.selectAll('line')
               .filter(function(d) {
                return (d === temporary)})
                .attr('style', "stroke:green;stroke-width:2");
           }
        })

        // When mouse is removed, infobox is hidden and point returns to orgininal size
        .on("mouseout", function(d) {

           //Hide the info 
           d3.select(".infobox").style('visibility', 'hidden');
           d3.select(this)
                .transition()
                .duration(100)
                .attr('r', 2.5)
                .style('opacity', 1);
            })
      }
    }
});