console.warn("------------------- dc_visualization/main.js START -------------------");
/**
    * Action Required: change the data URL to your own Heroku URL
    * example: http://data.datavizcourse.com/api/v1.0/data/iris/ ---> http://punctual-cheesecake-5159.herokuapp.com/api/v1.0/data/iris/
    * make sure you use HTTP and not HTTPS
**/

var data_url = "http://data.datavizcourse.com/api/v1.0/data/iris/";

console.warn("Action Required: In dc_visualization/main.js line 10, change the 'data_url' variable to your own Heroku Application's URL.");

/* end action required section */


// ------------------------------------------------------------------
// load data, upon downloading the remote data, execute the callback function defined in the second argument

d3.json(data_url, function(remote_json){
	
  // ------------------------------------------------------------------
  // initialize crossfilter
  // note, this is why crossfilter.js is loaded separate from (and before) dc.js in your html

  var cf = crossfilter(remote_json);
  
  // ------------------------------------------------------------------
  // define dimensions for each variable in the iris dataset, and round each dimension's value to the nearest .5

  var dim_sepal_length  = cf.dimension(function(d){ return Math.round(d.sepal_length * 2)/2; });

  /**
      * Action Required: define accessor functions for each dimension 
      * hint: dim_sepal_length is done for you, the others look the same (except dim_species)
      * freebie: var dim_species = cf.dimension(function(d){ return d.species; });
  **/
  
  var dim_sepal_width   = null;
  var dim_petal_length  = null;
  var dim_petal_width   = null;
  var dim_species       = null;

  console.warn("Action Required: In dc_visualization/main.js lines 37-40, change null to an accessor function for each dimension.")

  /* end action required section */

  // ------------------------------------------------------------------
  // define grouping function for each dimension

  var group_sum_sepal_length = dim_sepal_length.group().reduceSum(function(d){ return d.sepal_length; });
 
  /**
      * Action Required: define grouping functions for each dimension 
      * hint: group_sum_sepal_length is done for you, the others look the same (except group_count_species)
      * freebie: var group_count_species = dim_species.group().reduceCount();
  **/

  var group_sum_sepal_width  = null;
  var group_sum_petal_length = null;
  var group_sum_petal_width  = null;
  var group_count_species    = null;

  console.warn("Action Required: In dc_visualization/main.js lines 57-60, change null to  groups on the dimensions.")

  /* end action required section */

  // ------------------------------------------------------------------
  // get unique species (used in the species chart below)
  // no action required

  var species_names = _.chain(remote_json).pluck("species").uniq().value();

  // ------------------------------------------------------------------
  // build charts
  // note that the ids for each chart are provided for you (these ids are reflected in index.html)

  var sepal_length_chart = dc
    .barChart("#sepal_length_chart")
    .width(250)
    .height(200)
    .dimension(dim_sepal_length)
    .group(group_sum_sepal_length)
    .centerBar(true)
    .x( d3.scale.linear().domain([3,10]) )
    .xUnits(dc.units.fp.precision(.5));

  /**
      * Action Required: define grouping functions for each dimension 
      * hint: The div ids are written for you and commented out. These reference each chart's unique div id as specified in index.html
      * hint: sepal_length_chart is done for you, the others look the same (except species_chart)
      * freebie: 
        var species_chart = dc
          .barChart("#species_chart")
          .width(250)
          .height(200)
          .dimension(dim_species)
          .group(group_count_species)
          .centerBar(true)
          .x(d3.scale.ordinal().domain(species_names))
          .xUnits(dc.units.ordinal)
  **/

  var sepal_width_chart = dc
    // .barChart("#sepal_width_chart")
    
  var petal_length_chart = dc
    //.barChart("#petal_length_chart")

  var petal_width_chart = dc
    //.barChart("#petal_width_chart")

  var species_chart = dc
    //.barChart("#species_chart")

  console.warn("Action Required: In dc_visualization/main.js lines 102-112, finish building the charts.")

  /* end action required section */

  
  /**  
  ==================================================================
   No Further Action Required: the rest is provided for you 
  ================================================================== 
  **/


  
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


    console.warn("------------------- dc_visualization/main.js END -------------------"); console.log("");
});