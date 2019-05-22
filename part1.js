/**
Data Visualization
Assignment 3 Part I
Oct 7th 2018
By: Saahithi Rao and Yingying Wang
We adopted a starting code based on Lab1's scatterTutorialSolution.js 
and referenced randomPointsSOLUTION.js for interactive effects

Sources:
We learned about Javascript functions through:
https://www.w3schools.com/js/default.asp
We learned how to manipulate svg objects through:
https://www.w3schools.com/graphics/svg_intro.asp
We refered this source for adding info boxes: http://jonathansoma.com/tutorials/d3/hover-notes/
**/


// Constants to define non-data-related parts of the visualization
var w = 200;			// Width of our individual scatterplots in SPLOMs
var h = 200;			// Height of our visualization
var xOffset = 35;		// Space for x-axis labels
var yOffset = 35;		// Space for y-axis labels
var margin = 15;

// Variable is activated when point is selected
var selected = null;

// X and Y values of scatterplots
vals = ['flight_index','num_o_ring_distress','launch_temp','leak_check_pressure','tufte_metric']
// Unique ids of each scatterplot to be associated with the positions in HTML table
// e.g. graph1_2 meaning scatterplot in row1 and colum2
ids = ['#graph1_2','#graph1_3','#graph1_4','#graph1_5','#graph2_1','#graph2_3','#graph2_4','#graph2_5','#graph3_1','#graph3_2','#graph3_4','#graph3_5','#graph4_1','#graph4_2','#graph4_3','#graph4_5','#graph5_1','#graph5_2','#graph5_3','#graph5_4'] 
           

// Load data
d3.csv('challenger.csv', function(csvData) {
	data = csvData;
	
    // For loop that creates 20 scatterplots for SPLOMs
    var i;
    for (i = 0; i < 20; i++) {
        
    // X and Y scales that convert values from our data domain into screen coordinates.
        xScale = d3.scale.linear()
				.domain([d3.min(data, function(d) { return  parseFloat(d[findXval(i)]); }),
                         d3.max(data, function(d) { return parseFloat(d[findXval(i)]); })+1])
				.range([yOffset + margin, w - margin]);
        yScale = d3.scale.linear()
				.domain([d3.min(data, function(d) { return parseFloat(d[findYval(i)]); })-1,
						 d3.max(data, function(d) { return parseFloat(d[findYval(i)]); })+1])
				.range([h - xOffset - margin, margin]); // Notice this is backwards!
  
	// Creates an SVG element to contain our visualization    
	   svg = d3.select(ids[i]).append('svg:svg')
				.attr('width', w)
				.attr('height', h);
	// Builds axes 
        xAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom')
				.ticks(4);
	   xAxisG = svg.append('g')
				.attr('class', 'axis')
				.attr('transform', 'translate(0,' + (h - xOffset) + ')')
				.call(xAxis);
	   yAxis = d3.svg.axis()
				.scale(yScale)
				.orient('left')
				.ticks(4);
	   yAxisG = svg.append('g')
				.attr('class', 'axis')
				.attr('transform', 'translate(' + yOffset + ',0)')
				.call(yAxis);

	   point = svg.selectAll('.point') // Select elements
				.data(data);		// Bind data to elements

	   point.enter().append('svg:circle');	// Create new elements attached to svg circle

	   // Update our selection
	   point
		  .attr('class', 'point')		// Give it a class
		  .attr('cx', function(d) { 
           return xScale(d[findXval(i)]); })	// x-coordinate
		  .attr('cy', function(d) { return yScale(d[findYval(i)]); })	// y-coordinate
		  .style('fill','red')	// color
		  .attr('r', 3) //size
        
        
        // Hovering over point will display infobox of traits and enlarge point 
        .on("mouseover", function(d) {
           //select the data values to display
            d3.select(".infobox .flight_index").text(d['flight_index']);
            d3.select(".infobox .num_o_ring_distress").text(d['num_o_ring_distress']);
            d3.select(".infobox .launch_temp").text(d['launch_temp']);
            d3.select(".infobox .leak_check_pressure").text(d['leak_check_pressure']);
            d3.select(".infobox .tufte_metric").text(d['tufte_metric']);    
            // Show the infobox
            d3.select(".infobox").style('visibility', 'visible');
           // enlarge the moused over item for pop out effect
            d3.select(this)
                .transition()
                .duration(100)
                .attr("r",6);
            })
      
        // When the mouse moves from point, infobox disappears and point returns to origninal size
        .on("mouseout", function(d) {
           //Hide the info 
           d3.select(".infobox").style('visibility', 'hidden');
           d3.select(this)
                .transition()
                .duration(100)
                .attr('r', 3); 
        })
          
        // Change color of selected point to yellow in all plots
        // Changes color back to red when point is selected again
        .on('click', function(d) {
           temporary = d;
           if(!selected){
               selected = temporary;
           d3.selectAll('circle')
           .filter(function(d) {
                return (d === temporary)})
                .style('fill', 'yellow');}
           else if (selected === temporary){
               selected = null;
               d3.selectAll('circle')
           .filter(function(d) {
                return (d === temporary)})
                .style('fill', 'red');}    
           });
    }
    
// Function to find the values we plot on the x-axis for individual scatterplots
function findXval(i) {
    if (i==4 || i==8 || i==12|| i==16){
        return xVal=vals[0];
    }

    else if (i==0 || i==9 || i==13|| i==17){
        return xVal=vals[1];
    }else if (i==1 || i==5 || i==14|| i==18){
        return xVal=vals[2];
    }else if (i==2 || i==6 || i==10|| i==19){
        return xVal=vals[3];
    }else if (i==3 || i==7 || i==11|| i==15){
        return xVal=vals[4];
    }
}

// Function to find the values we plot on the y-axis for individual scatterplots
function findYval(i) {
    if (i>=0 && i<4){
        return yVal=vals[0];
    }else if (i>=4 && i<8){
        return yVal=vals[1];
    }else if (i>=8 && i<12){
        return yVal=vals[2];
    }else if (i>=12 && i<16){
        return yVal=vals[3];
    }else if (i>=16 && i<20){
        return yVal=vals[4];
    }
}
});