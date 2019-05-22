# Multidimensional Visualization
### Authors: Yingying Wang and Saahithi Rao

### Instructions to Open Files:
```
$ python3 -m http.server
``` 
Navigate to localhost:8000 in Chrome. 

Click on Index1.html, which corresponds to the scatterplot matrix. 
Click on Index2.html, which corresponds to the parallel coordinates plot. 

These visualizations use the Challenger dataset. 
This data comes from a combination of sources: a UCI Machine Learning Repository and the metric that Tufte generated for seriousness of damage. The attributes are:

flight_index: corresponds to the temporal order in which the flights were launched
num_o_ring_distress: the number of O-rings that experienced distress during the launch
launch_temp: the temperature in degrees Fahrenheit at launch
leak_check_pressure: a metric corresponding to the pressure of the gas meant to be contained by the O-rings
tufte_metric: the metric Tufte created to measure the damage experienced by the O-rings during launch, described in the reading


What animations/interactions do these visualizations contain?

For the scatterplot matrix, hovering over an item will display the label for that item and enlarge it in each of the plots. Clicking on a point will change its color to yellow in that plot and all corresponding plots. Clicking on that point again will change the color back to red. The point must be unselected before selecting another point. 

For the parallel coordinates plot, hovering over a point will enlarge that point and change its color to yellow and hovering over a line will display that line's values. Clicking a line will change the color of the whole line across all axis to yellow/orange (although if it is behind a green line it may not look like it is changing color). Clicking on the line again will change it back to green. The line must be unclicked before clicking on another line. 



What purpose do they serve? 

The scatterplot matrix shows the relationship of each variable in the dataset to all other variables. The viewer can see how all the variables compare to one another by focusing on each simple scatterplot. The matrix, then, helps faciliate comparisons across multiple variables without complicating the visualization as one can focus on a specific plot and look vertically and horizontally to see that variable in a different plot. The matrix also does not infer a dependent and independent variable as the mirror image is displayed on either side of the diagonal. Since red is a primary color in computer science, we used red to encode the points in order to make them stand out and draw the viewers attention to individual points. We chose to change the color of the points to yellow when selected to provide a strong contrast to the red. The yellow is clearly visible in the midst of the red points in all the plots. This color change allows the viewer to inspect that point's individual values in each plot and illustrates how that point falls in comparison to the other data points. From a big-picture perspective we can see how that point is positioned, whether it is an outlier with extremely high or low values for all the measurements or whether that point has more average values. This allows us to see what an "average" point will look like across all plots in relation to the distribution of all points, which will help us better understand the data than just a number average. For example, leak check pressure is high across all launched temperatures and launched temperatures are spread evenly across all flights, which signals a question about the pressure. We also added a hovering effect to display the point's values in an info box. We placed this info box at the top of the visualization to make it easier to read, which is especially helpful when moving the mouse quickly over multiple points. The info box helps quantify the values of each point in addition to the color encoding. We can hover over the few points that recieved a score of eleven on the tufte metric scale and see the exact values of that point. 

The parallel coordinates plot allows the viewer to see all the variables of the challenger dataset simultaneously, which is incredibly powerful to visualize. It is also easier to interpret all the variables simultaneously in this visual than through the scatterplot matrix. This plot emphasizes the univariate distribution of each variable, the distribution of points of one variable, with the use of the y-axis and exclusion of an x-axis. The path of each item in the data is apparent and is highlighted when the line or point is selected. This allows the viewer to follow the lines and see how that item's values compare to values of all the other points. We can see that the path of some points goes from a high value at one variable to a low value at another variable. We can also see that the range of launch temperatures and leak check pressure is wide while the number of distressed o rings can only be 0, 1, or 2. An info box is displayed again to quantify each item/line's values. Green and yellow are used as they are primary colors in computer science.    

