var color = d3.scale.linear()
  .domain([0, tbody.selectAll("tr")[0].length-1])
  .interpolate(d3.interpolateRgb)
  .range(["orangered", "silver"])
  
  
  
Questions
========================
1. The domain() function is the data range upon which the scale is calculated. What does d3.selectAll("tbody tr")	[0].length-1 mean?

	the domain function returns the range of values on which the scale is applied. In this case, the given domain 	arguments [0, tbody.selectAll("tr")[0].length -1] returns becomes [0,52]. the 52 term comes from the length o	of the first column across all rows (tbody.selectAll("tr")[0]) which is 53, minus 1 makes 52.
	
2. Add the snippet in your code. Describe, in words, what the following function calls return: color(0), color(10)  	and color(150)?
	
	the calls return hex codes:
	#ff4500: color(0) -- purer red
	#42ffff: color(150)-- purer silver
	#f25e26: color(10)
	which represent different shades of color in between orangered and silver with lower argument values returning 	a color close to "orangered" and higher values returning colors closer to "silver". 

3. If the array passed to domain() was the minimum and maximum rate values, how would that change the scale? In 	what situations would this be appropriate?
	
	If the array passed to the domain([2.6,9]) the colors returned are redish at the top and blue at the bottom.
