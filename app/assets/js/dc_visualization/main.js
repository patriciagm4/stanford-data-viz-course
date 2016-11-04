
var dc_data_url = "http://floating-retreat-19012.herokuapp.com/api/v1.0/data/iris/";


// ------------------------------------------------------------------
// load data, upon downloading the remote data, execute the callback function defined in the second argument

d3.json(dc_data_url, function(remote_json){
	
  // ------------------------------------------------------------------
  // initialize crossfilter
  // note, this is why crossfilter.js is loaded separate from (and before) dc.js in your html

  var cf = crossfilter(remote_json);
  
  // ------------------------------------------------------------------
  // define dimensions for each variable in the iris dataset, and round each dimension's value to the nearest .5

  var dim_sepal_length  = cf.dimension(function(d){ return Math.round(d.sepal_length * 2)/2; });
  var dim_sepal_width   = cf.dimension(function(d){return Math.round(d.sepal_width * 2)/2;});
  var dim_petal_length  = cf.dimension(function(d){return Math.round(d.petal_length * 2)/2;});
  var dim_petal_width   = cf.dimension(function(d){return Math.round(d.petal_width * 2)/2;});
  var dim_species       = cf.dimension(function(d){ return d.species;

  // ------------------------------------------------------------------
  // define grouping function for each dimension

  var group_sum_sepal_length = dim_sepal_length.group().reduceSum(function(d){ return d.sepal_length; });
  var group_sum_sepal_width  = sepal_width.group().reduceSum(function(d){return d.sepal_width; });
  var group_sum_petal_length = petal_length.group().reduceSum(function(d){return d.petal_length; });
  var group_sum_petal_width  = petal_width.group().reduceSum(function(d){return d.petal_width; });
  var group_count_species    = dim_species.group().reduceCount();

  // ------------------------------------------------------------------
  // get unique species (used in the species chart below)
  // no action required

  var species_names = _.chain(remote_json).pluck("species").uniq().value();

  // ------------------------------------------------------------------
  // build charts
  // note that the ids for each chart are provided for you (these ids are reflected in index.html)

  var species_chart = dc
    .barChart("#species_chart")
    .width(240)
    .height(200)
    .dimension(dim_species)
    .group(group_count_species)
    .centerBar(true)
    .x(d3.scale.ordinal().domain(species_names))
    .xUnits(dc.units.ordinal);
    
  var sepal_length_chart = dc
    .barChart("#sepal_length_chart")
    .width(240)
    .height(200)
    .dimension(dim_sepal_length)
    .group(group_sum_sepal_length)
    .centerBar(true)
    .x( d3.scale.linear().domain([3,10]) )
    .xUnits(dc.units.fp.precision(.5));
  
  var sepal_width_chart = dc
    .pieChart("#sepal_width_chart")
  	.width(240)
  	.height(200)
  	.radius(100)
  	.innerRadius(50)
  	.dimension(dim_sepal_width)
  	.group(group_sum_sepal_width)   
  	.renderLabel(true);

  var petal_length_chart = dc
    .barChart("#petal_length_chart")
    .width(240)
    .height(200)
    .dimension(dim_petal_length)
    .group(group_sum_petal_length)
    .centerBar(true)
    .x( d3.scale.linear().domain([0,8]) )
    .xUnits(dc.units.fp.precision(0.5));

  var petal_width_chart = dc
    .pieChart("#petal_width_chart")
  	.width(240)
  	.height(200)
  	.radius(100)
  	.innerRadius(50)
  	.dimension(dim_petal_width)
  	.group(group_sum_petal_width)
  	.renderLabel(true);

  
  // ------------------------------------------------------------------
  // render everything

  dc.renderAll();

  // ------------------------------------------------------------------
  // handle the reset button

  d3.select("#dcjs_reset_btn")
    .on("click", function(){
      // try-catch since the code for sepal_width_chart, petal_length_chart, ... etc may be incomplete
      try{ sepal_length_chart.filter(null); } catch(e){ }
      try{ sepal_width_chart.filter(null);  } catch(e){ }
      try{ petal_length_chart.filter(null); } catch(e){ }
      try{ petal_width_chart.filter(null);  } catch(e){ }
      try{ species_chart.filter(null);      } catch(e){ }

      // after resetting the filters, redraw all of the charts (automatically removes the filter overlay)
      dc.redrawAll(); 
    });
});