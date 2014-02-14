var margin = {top: 50, bottom: 10, left:300, right: 40};
    var width = 900 - margin.left - margin.right;
    var height = 900 - margin.top - margin.bottom;

    var xScale = d3.scale.linear().range([0, width]);
    var yScale = d3.scale.ordinal().rangeRoundBands([0, height], .8, 0);

    var bar_height = 15;

    var state = function(d) { return d.State; };
    

    var svg = d3.select("body").append("svg")
      .attr("width", width+margin.left+margin.right)
      .attr("height", height+margin.top+margin.bottom);
      
 	svg.append("text")
		 		.attr("x", ((width+margin.left+margin.right)/2))
		 		.attr("y", 50)
		 		.attr("text-anchor","middle")
		 		.style("font-size","16px")
				.text("Unemployment Rates for States");
				
    var g = svg.append("g")
      .attr("transform", "translate("+margin.left+","+margin.top+")");
      
   
	
    d3.tsv("unemp_states_us_nov_2013.tsv", function(data) {
	
      var max = d3.max(data, function(d) { return d.Rate; } );
      var min = 0;
      

      xScale.domain([min, max]);
      yScale.domain(data.map(state));

      var groups = g.append("g")
        .selectAll("g")
        .data(data)
      	.enter()
        .append("g")
        .attr("transform", function(d, i) { return "translate(0, " + yScale(d.State) +")"; });

      var bars = groups
        .append("rect")
        .attr("width", function(d) { return xScale(d.Rate); })
        .attr("height", bar_height);

	groups.append("text")
        .attr("x", function(d) { return xScale(d.Rate); })
        .attr("y", function(d) { return bar_height/2; })
        .text(function(d) { return d.Rate; })
        
   	groups.append("text")
   		 .attr("x", function(d) {return 5; })
   		 .attr("y", function(d) { return (bar_height/2)+5;})
   		 .text(function(d) {return d.State;})
   		 
 //d3.select("input").on("change",reorder());
 	
 	/*function reorder(d,i) {
 		svg.selectAll("rect")
 			if (d3.select(this).attr("id") != "stateSort") {
 				svg.selectAll("rect").attr("id", "stateSort")
 				g.sort(function(a, b) {return d3.ascending(a[state], b[state]);})}
 			else{svg.select(this).attr("id","")
 				g.sort(function(a,b){return d3.ascending(a[d.rate],b[d.rate]);})}	
 	groups
   		.transition()
  		.duration(750)
   		.delay(function(d, i) { return i * 10; })
  		.attr("transform", function(d, i) { return "translate(0," + yScale(d.Rank)+")"; })}; */
    });
