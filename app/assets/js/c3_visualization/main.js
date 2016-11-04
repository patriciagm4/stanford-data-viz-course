// ------------------------------------------------------------------
// set your data

var agency_names = ['Alameda County WD', 'Brisbane/ GVMID', 'Burlingame', 'CWS- Bear Gulch', 'CWS- Mid-Peninsula', 'CWS- South San Francisco', 'Coastside County WD', 'Daly City', 'East Palo Alto', 'Estero MID', 'Hayward', 'Hillsborough', 'Menlo Park', 'Mid-Peninsula WD', 'Millbrae', 'Milpitas', 'Mountain View', 'North Coast County WD', 'Palo Alto', 'Purissima Hills WD', 'Redwood City', 'San Bruno', 'San Jose MWS- North', 'Santa Clara', 'Sunnyvale', 'Westborough WD'];

var my_data = [
	["r_gpcd", 62, 45, 68, 156, 64, 43, 58, 42, 36, 64, 48, 222, 76, 64, 60, 56, 63, 47, 82, 245, 63, 49, 88.2, 69, 68, 47],
  ["income", 95379, 79812, 84854, 136157, 88865, 72405, 99985, 74436, 50142, 116417, 62013, 236528, 112262, 105391, 88451, 95466, 97338, 95880, 121465, 179910, 79419, 78911, 99550, 91583, 100043, 91115],
  ["price", 7.49, 11.33, 12.01, 8.85, 8.63, 9.08, 13.87, 4.85, 6.8, 5.01, 5.95, 13.11, 5.16, 11.69, 11.72, 5.88, 7.82, 8.85, 11.99, 7.81, 8.93, 10.21, 6.16, 5.41, 5.57, 8.67]
];

// ------------------------------------------------------------------
// set your chart parameters

var my_chart_parameters = {
  "bindto": "#c3_visualization_container",
	"data": {
  	"x": "income",
    "y": "r_gpcd",
  	"columns": my_data,
    "type": "scatter",
    "colors": {
    	"r_gpcd": "#0000ff",
    },
    "selection": {
    	"enabled": true
    },
	},
  "tooltip": {
  	"show": true,
    "format": {
    	"title": function(value) { 
        if (my_data[1].indexOf(value) == -1) {
          var index = my_data[3].indexOf(value);
          return agency_names[index - 1];
        } else {
          var index = my_data[1].indexOf(value);
          return agency_names[index - 1];
        }
      }
		}
  },  
  "legend": {
  	"show": true
  },
	"axis": {
		"x": {
    	"label": "Median Hosehold Income [$/yr]",
      "min": 50000,
      "max": 250000,
			"tick": {
      	"values": [50000, 100000, 150000, 200000, 250000],
       }
		},
    "y": {
    	"label": "Residential water use per capita [r_gpcd]"
    }
	},
  "point": {
  	"r": function(price) {
    	return price.value*0.1;
    },
    "show": false,
    "focus": {
    	"expand": {
      	"r": 10,
        "enabled": true
      }
    }
  }
};

// ------------------------------------------------------------------
// init c3

var my_chart_object = c3.generate(my_chart_parameters);

// ------------------------------------------------------------------
// define your slides

var slide_0 = function() {
	my_chart_object.unload({
  	ids: "price"
  	});
 	my_chart_object.regions.remove();
  	my_chart_object.data.names({r_gpcd: "Circle size is proportional to avg. price of water in each utility ($/gal)"});
  	document.getElementById("c3js_message").innerHTML = "Water utilities in the BAWSCA region are diverse in many ways, including climate and demographics. Among these factors, income appears to play the most important role in defining customer's water demands";
	};

var slide_1 = function() {
	my_chart_object.load({
  	columns:[
			["linear_fit", 13.7476, 29.1799, 42.6895, 45.3298, 51.1473, 51.8077, 52.3186, 58.8732, 63.5493, 64.0875, 67.0125, 67.6209, 72.5557, 72.6688, 73.207, 75.1024, 77.978, 78.5435, 78.6189, 85.5713, 94.5036, 99.9051, 106.4675, 125.5671, 182.446, 256.0494]
    ],
    type: "line",
    colors: {
    	lm: "f00000",
    },
  });
  document.getElementById("c3js_message").innerHTML = "There is a strong linear relationship between median household income and residential water use per capita (R-squared = 0.83)";
};

var slide_2 = function() {
	my_chart_object.unload({
  	ids: "linear_fit"
  });
  my_chart_object.select(["r_gpcd"], [0, 1, 3]);  
  document.getElementById("c3js_message").innerHTML = "These utilities have a relatively low madian income and very low water use.";
};

var slide_3 = function() {
  my_chart_object.unselect();
  my_chart_object.select(["r_gpcd"], [23, 24, 25]);
  document.getElementById("c3js_message").innerHTML = "These utilities have a very high income and very high water use.";
};

var slide_4 = function() {
  my_chart_object.regions.add([{
  	axis: "x",
  	start: 50000,
    end: 80000,
  }]);
  my_chart_object.regions.add([{
  	axis: "x",
    start: 130000,
    end: 240000,
  }]);
  my_chart_object.unselect();
	document.getElementById("c3js_message").innerHTML = "High income agencies use more water even if they have to pay higher prices on average."
};

var slide_5 = function() {
	my_chart_object.axis.range({
  	min: {
    	x: 50000,
      y: 0,
    },
    max: {
    	x: 80000,
    	y: 80,
    }
  });
	document.getElementById("c3js_message").innerHTML = "These utilities on average only pay $5 to $8 for 1000 gallons of water."
};

var slide_6 = function() {
	my_chart_object.axis.range({
  	min: {
    	x: 130000,
      y: 140,
    },
    max: {
    	x: 240000,
    	y: 260,
    }
  });
	document.getElementById("c3js_message").innerHTML = "These utilities pay up to $14 for 1000 gallons."
}

var slide_7 = function() {
	my_chart_object.regions.remove();
	my_chart_object.axis.range({
  	min: {
    	x: 50000,
      y: 20,
    },
    max: {
    	x: 250000,
    	y: 260,
    }
  });
	document.getElementById("c3js_message").innerHTML = "This relationship indicates pricing signals may not be the most effective way of incentivizing conservation in the region. Conservation measures should be tailored to each service area's socio-demographic characteristics."
};

// ------------------------------------------------------------------
// populate the c3_slideshow array with your slides

var c3_slideshow = [slide_0, slide_1, slide_2, slide_3, slide_4, slide_5, slide_6, slide_7];

// ------------------------------------------------------------------
// cycle through c3_slideshow

var current_c3_slide_index = 0;

var begin_c3_slideshow = function() {
    c3_slideshow[current_c3_slide_index]();
    current_c3_slide_index += 1;

    if (current_c3_slide_index === c3_slideshow.length) {
        current_c3_slide_index = 0;
        d3.select("#c3js_start_btn").html("Replay");
    } else if(current_c3_slide_index === 1){
        d3.select("#c3js_start_btn").html("Start");
    } else {
        d3.select("#c3js_start_btn").html("Next");
    }
};

// ------------------------------------------------------------------
// button event handler

d3.select("#c3js_start_btn").on("click", begin_c3_slideshow);

// ------------------------------------------------------------------
// start the slideshow

// if loading from a URL, then calling begin_c3_slideshow() here is redundant 
// since 'data.onfinishloading' already calls begin_c3_slideshow() after the data is retrieved
if(c3_chart_parameters.data.onfinishloading == undefined){
    begin_c3_slideshow();
}