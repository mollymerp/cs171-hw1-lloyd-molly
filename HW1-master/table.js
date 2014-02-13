d3.text("unemp_states_us_nov_2013.tsv", function(error,unparsedData){

// parse data, force rank/rate to float

var data = d3.tsv.parseRows(unparsedData).map(function(d,i) {if i!=0 {return [+d[0], d[1], +d[2] ]}
															else {return [d[0],d[1],d[2]]}});
var columns = data[0]
    title = (["Unemployment Rates for States","Monthly Rankings","Seasonally Adjusted","Dec. 2013"]);


//create reference vars
var table = d3.select("body").append("table"),
    thead = table.append("thead"),
    tbody = table.append("tbody");

//create header text  
var titles = thead.append("tr").append("th")
                  .attr("align","center")
                  .attr("colspan","4")
                  .selectAll("h1")
                  .data(title)
                  .enter()
                  .append("h1")
                  .text(function(d) {return d;});
//create column titles                  
thead.append("tr")
		.selectAll("td")
		.data(columns)
		.enter()
		.append("td")
		.text(function(col) {return col; })
		.attr("class", function(d,i){return "tcol"+i });


console.log(data.shift());
//create rows
var rows = tbody.selectAll("tr")
				.data(data)
				.enter()
				.append("tr");



//sort by rank/rate on load
table.on("load", function(d,i) {
		rows.sort(function(a, b)  {
			return d3.ascending(a[2], b[2]);})});
			
//highlight cross-hairs effect  (rows)           
rows.style("background-color", function(d,i) {
                                  if (i%2 == 0) {
                                     return "grey";
                                } else {
                                     return "white";}})  
     .on("mouseover", function(){d3.select(this).style("background-color","yellow")})
     .on("mouseout", function(d,i) { d3.select(this).style("background-color", function(d1,j) {
                                   if (i%2 === 0) {
                                     return "grey";
                                     } else {
                                     return "white";}})});
//creates cell contents
var cells = rows.selectAll("td")
      			.data(function(row) {
        				return d3.range(Object.keys(row).length).map(function(column, i){
          															return row[Object.keys(row)[i]];
																						});
								})
				.enter()
				.append("td")
				.text(function(d) {return d; });
				
//highlight cross-hairs effect (columns)
cells.attr("class", function(d,i){return "col" + i;})
	 .on("mouseover", function(d,i) {
	 								d3.selectAll("td.col" + i)
                           			  .style("background-color", "yellow");
                           			  })
	 .on("mouseout", function(d,i) { 
	 				d3.selectAll("td.col" + i)
                          .style("background-color", null); 
                    rows.style("background-color", function(d1,j) {
                                   	if (j%2 == 0) {
                                    	 return "grey";
                                   } else {
                                     return "white";}});
                //preserves rate color effect                     
                     tbody.selectAll("tr td.col2")
     					  //.style("background-color", function(d,i) {return color(i)});  
     					  .style("background-color", function(d,i) {return color(d)});                  
                                });
//creates bar chart column
rows.insert("td").append("svg")
	.attr("width", 70)
	.attr("height", 20)
	.append("rect")
	.attr("height", 10)
	.attr("width", function(d) { return d[0]; });

//click sort business
thead.selectAll("td") 
	 .on("click", function(d,i) {
                      if (d3.select(this).attr("id")!= "sorted") {
                             thead.select("td.tcol"+i).attr("id","sorted");          
                             rows.sort(function(a, b) {if (a != b) {return d3.ascending(a[i], b[i]);}
                                                        	else  {return rows.sort(function(a,b) {
                                                        			return d3.ascending(a[1],b[1]);})}});
							 rows.style("background-color", function(d1,j) {
															if (j%2 == 0) {
                                       							return "grey";
															} else {
                                       							return "white";}});}
                                       							
                     else {thead.select("td#sorted.tcol" + i).attr("id","");
                             rows.sort(function(a, b) {if (a != b) {return d3.descending(a[i], b[i]);}
                                                        else  {return rows.sort(function(a,b) {return 																					d3.descending(a[1],b[1]);})}});
                             rows.style("background-color", function(d1,j) {
                                     							if (j%2 == 0) {
                                      								 return "grey";
																} else {
																	 return "white";}});}    });


//adds color scale
var color = d3.scale.linear()
  .domain([0, tbody.selectAll("tr")[0].length-1])
  .interpolate(d3.interpolateRgb)
  .range(["orangered", "silver"]);

          
//invokes color scale for rate column
tbody.selectAll("tr td.col2")
//comment out first implementation task
     //.style("background-color", function(d,i) {return color(i)});
     .style("background-color", function(d,i) {return color(d)});        

      });
