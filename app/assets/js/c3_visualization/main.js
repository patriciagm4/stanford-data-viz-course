console.warn("------------------- c3_visualization/main.js START -------------------");
// ------------------------------------------------------------------
// set your data

/**
    * Action Required: IF YOU ARE USING AN API, then set 'c3_data_url' to your URL, OTHERWISE IGNORE THIS STEP
    * example: http://data.datavizcourse.com/api/v1.0/data/c3_data/ ---> http://punctual-cheesecake-5159.herokuapp.com/api/v1.0/data/c3_data/
    * make sure you use HTTP and not HTTPS
**/

var c3_data_url = "http://data.datavizcourse.com/api/v1.0/data/c3_data/";

console.warn("Action Required: In c3_visualization/main.js line 10, IF your are using an api, THEN change the 'c3_data_url' variable to your url.")

/* end action required section */



/**
    * Action Required: if your are NOT using an api, then change 'my_c3_data' to your own data
    * an example is shown below
    ** Important note: my_c3_data is NOT the same as the data returned by the API at c3_data_url, however the chart configuration produces the same result
**/

var my_c3_data = [
    ["X Label", 43500, 30400, 20000, 44700, 20800, 40200, 27400, 32500, 26000, 33100, 42300, 19400, 44400, 25700, 49700, 43900, 31200, 23600, 58500, 38300, 24700, 41900, 28800, 34100, 23900, 34800, 57900, 60500, 44900, 39000, 53500, 20900, 25500, 25300, 50500, 36700, 40900, 30000, 31000, 43900, 20400, 34600, 26200, 42200, 18900, 52400, 27400, 29500, 37400, 28700, 43300, 30500, 47100, 26300, 40000, 25300, 191400, 35000, 29300, 35600, 31200, 40800, 23700, 44300, 45600, 39400, 45900, 27100, 46600, 22000, 36000, 46600, 24000, 48700, 30000, 31100, 24500, 17100, 32500, 30500, 22300, 22300, 22000, 28300, 122900, 40600, 26300, 38600, 27500, 34100, 38500, 42000, 58100, 60500, 51000, 35000, 30000, 59200, 30700, 35500, 52200, 22000, 33700, 20500, 29800, 24400, 30500, 44900, 25700, 38800, 18600, 46200, 66700, 58300, 40400, 32400, 22100, 31400, 36700, 28400, 24100, 32600, 45000, 23200, 20900, 27500, 47700, 17300, 35500, 23900, 24500, 26000, 24700, 56500, 30600, 37600, 30200, 31600, 79500, 85800, 21200, 52700, 34000, 27100, 36100, 30700, 50900, 38700, 23400, 39000, 49100, 48900, 24000, 47000, 30800, 49500, 55100, 38400, 46000, 49900, 24900, 38300, 31900, 44900, 27000, 38100, 19700, 35000, 28600, 56600, 25900, 33200, 44200, 38300, 28900, 38000, 56000, 72000, 21400, 43200, 25100, 49900, 37200, 34600, 19700, 20300, 32600, 33600, 17000, 33100, 31800, 60500, 60500, 39400, 42600, 50600, 33900, 43200, 28900, 24000, 44100, 35300, 29600, 48900, 93200, 32800, 27000, 38200, 28000, 24000, 19100, 39700, 42500, 17900, 31200, 68300, 30800, 30800, 24400, 41500, 46100, 24400, 43300, 33300, 34700, 26100, 33900, 27100, 27400, 28700, 46500, 66600, 20200, 42200, 30900, 24100, 29700, 62000, 54400, 28000, 37400, 65500, 44500, 29600, 31200, 31200, 35800, 37900, 24400, 31100, 21100, 29200, 34700, 39300, 41200, 37500, 18700, 30900, 30300, 18600, 29100, 53500, 32200, 23500, 43800, 40200, 23600, 22300, 42300, 54600, 24100, 25900, 28400, 33200, 26900, 40400, 23800, 16800, 39000, 227000, 52200, 25200, 28500, 48900, 36700, 77000, 24400, 49600, 18000, 42000, 27300, 21900, 32300, 53500, 46100, 21100, 26300, 29100, 36400, 26500],
    ["Y Label", 101558.45, 55592.03, 42191.75, 84043.96, 13644.02, 69572.67, 15769.65, 42299.79, 16971.15, 26703.39, 40111.12, 23560.91, 64999.51, 14556.0, 74730.25, 78999.04, 37801.01, 50408.99, 122480.57, 38338.06, 64578.27, 75153.97, 41604.11, 28365.73, 16509.19, 18790.79, 92968.08, 47023.93, 61460.45, 94178.23, 81964.64, 23087.91, 14671.53, 14773.61, 99677.32, 26867.67, 51471.07, 20166.54, 14314.47, 73621.04, 13269.85, 30784.23, 45488.41, 86819.79, 6078.55, 78739.55, 24085.78, 26968.35, 74375.88, 26254.7, 57021.76, 19771.75, 59579.65, 64283.4, 61046.44, 14773.61, 18470.15, 21712.73, 56136.35, 72751.34, 27253.57, 81372.39, 19852.54, 76990.02, 48558.75, 72972.81, 88787.07, 23109.77, 91299.92, 9422.1, 31209.92, 80731.12, 17218.54, 28499.02, 32529.88, 47819.38, 34825.56, 11889.69, 29814.52, 77768.98, 61836.94, 28810.02, 13533.8, 18314.56, 21103.51, 62041.39, 21216.06, 47093.14, 20674.88, 35405.77, 67902.81, 36363.01, 115142.41, 47023.93, 115567.69, 32858.72, 21902.85, 29059.07, 23399.21, 44650.53, 70810.85, 17407.37, 45050.23, 11863.04, 25081.31, 18800.55, 24580.03, 54294.39, 22290.69, 20297.51, 10832.18, 57445.07, 42156.62, 103263.14, 37120.97, 26534.35, 14975.55, 34623.82, 59482.33, 23815.73, 52430.64, 29795.57, 75952.19, 18385.19, 32253.91, 53212.71, 73261.15, 20773.13, 45522.19, 16509.19, 21434.93, 20112.06, 19021.52, 78359.31, 58150.53, 32126.24, 18065.27, 40068.12, 19468.03, 125770.36, 16254.79, 71813.4, 16648.69, 35771.79, 60271.01, 22458.56, 51136.11, 33499.45, 21332.9, 69847.54, 104626.75, 49157.22, 17218.54, 83620.71, 35373.22, 87118.24, 94258.6, 69085.18, 64379.94, 27433.12, 18312.11, 59535.84, 24657.68, 55721.97, 24511.58, 27562.46, 17095.52, 25041.49, 47801.79, 94283.08, 15154.05, 33353.99, 60446.33, 68803.77, 20501.21, 19901.87, 56926.77, 87306.5, 15801.08, 69992.09, 21089.6, 64411.44, 28901.96, 48989.06, 7716.9, 32547.44, 32091.32, 25446.91, 32015.45, 34268.8, 26534.39, 47023.93, 47023.93, 38375.53, 62680.61, 33082.85, 21365.82, 41191.94, 22686.67, 15173.88, 27630.62, 27867.28, 25835.11, 77986.69, 51853.53, 26003.74, 19027.83, 42912.59, 20546.99, 19190.15, 17362.33, 42301.82, 59212.25, 24534.82, 21914.97, 60843.23, 22884.7, 22180.1, 27597.13, 56874.59, 70725.24, 19201.33, 66034.18, 40329.97, 33473.31, 21270.58, 24279.24, 18835.29, 25476.09, 28644.37, 67569.73, 91124.17, 45011.01, 23295.64, 18580.6, 14933.38, 22528.08, 76131.15, 96751.26, 25740.57, 29424.27, 71628.0, 100605.48, 25076.31, 27788.32, 24948.04, 49661.57, 59971.93, 12821.33, 39555.28, 14657.1, 30371.87, 18951.18, 26653.56, 70519.43, 94505.71, 41096.13, 15251.73, 30406.54, 32056.01, 32508.46, 81964.64, 20000.12, 17971.97, 64873.01, 25320.42, 50408.99, 25013.83, 35840.05, 79730.12, 24120.35, 17812.88, 23232.74, 57223.79, 19504.4, 22022.96, 39831.94, 8964.72, 61864.66, 22469.45, 54096.53, 29484.2, 13500.15, 69768.51, 58219.63, 99004.36, 12821.33, 47764.86, 6342.8, 36363.01, 20654.97, 20380.38, 36820.44, 81964.64, 68399.37, 48889.14, 16667.0, 23454.05, 38618.99, 22090.03],
    ["X Label (some category)", 67600, 95300, 88000, 88400, 130500, 128400, 83200, 99700, 113000, 99600, 113400, 67900, 81400, 123400],
    ["Y Label (some category)", 96962.74, 73769.14, 123618.48, 107166.93, 60645.79, 95848.89, 106459.04, 102621.61, 89090.02, 59265.49, 87200.75, 104516.71, 103616.9, 83177.59]
];

console.warn("Action Required: In c3_visualization/main.js lines 25-30, IF your are NOT using an api, THEN change 'my_c3_data' to your own data.")

/* end action required section */


// ------------------------------------------------------------------
// set your chart parameters

/**
    * Action Required: set your chart parameters
    * example: http://data.datavizcourse.com/api/v1.0/data/c3_data/ ---> http://punctual-cheesecake-5159.herokuapp.com/api/v1.0/data/c3_data/
    * note that "c3js_visualization_container" is the ID of the div where your c3 visualization will go
    * Like many libraries, C3 requires a '#' prefix for IDs, so we reference this ID as "#c3js_visualization_container"
    * IF YOU ARE USING AN API, then comment out lines 67-72  -- AND -- uncomment line 62
    * ELSE, if you are NOT using an API, then leave lines 67-72 uncommented -- AND -- leave line 62 commented
**/

var c3_chart_parameters = {
    "bindto": "#c3js_visualization_container",
    "data": {
        "xs": {
            "X Label": "Y Label",
            "X Label (some category)": "Y Label (some category)"
        },
        "selection": {
            "enabled": true
        },
        "type": "scatter",


        // start -- IF you are NOT using an API, then this line is useful
        // "columns": my_c3_data,
        // end


        // start -- IF you are using an API then, these lines are useful
        "url": c3_data_url,
        "mimeType": 'json',
        "keys":{
            "value": ["X Label", "X Label (some category)", "Y Label", "Y Label (some category)"]
        },
        "onfinishloading": function(){ begin_c3_slideshow(); } // load the zeroth slide after the chart is finished loading
        // end

    },
    "legend": {
        "show": true
    },
    "point": {
        "r": 6,
        "focus": {
            "expand": {
                "r": 8,
                "enabled": true
            }
        },
        "select": {
            "r": 10
        }
    },
    "axis": {
        "x": {
            "label": {
                "text": "Descriptive Label for X Axis (units)",
                "position": "outer-center"
            },
            "tick": {
                "values": [25000, 50000, 75000, 100000, 125000],
                "fit": true
            }
        },
        "y": {
            "label": {
                "text": "Descriptive Label for Y Axis (units)",
                "position": "outer-middle"
            }
        }
    }
};

console.warn("Action Required: In c3_visualization/main.js lines 49 - 110, set 'c3_chart_parameters' your own chart parameters.")

/* end action required section */

// ------------------------------------------------------------------
// init c3

var my_chart_object = c3
    .generate(c3_chart_parameters)

// ------------------------------------------------------------------
// define your slides

/**
    * Action Required: Define your chart slides
    * An example is shown below
    * note that "c3js_message" is the ID of the div that show the text
    * Like many libraries, D3 requires a '#' prefix for IDs, so we reference this ID as "#c3js_visualization_container"
**/

var slide_0 = function() {
    my_chart_object.hide("X Label (some category)")
    d3.select("#c3js_message").html("<h3>Example C3 Visualization</h3> of x and y, across some time t. Each point represents an individual category.");
};

var slide_1 = function() {
    d3.select("#c3js_message").html("The relationship between x and y appears mostly linear, with higher x corresponding to higher y. However, there are some notable outliers. The most dramatic are certain types of x.");
    setTimeout(function() {
        my_chart_object.select(["X Label"], [44, 84]);
    }, 500);
};

var slide_2 = function() {
    my_chart_object.unselect();
    setTimeout(function() {
        my_chart_object.select(["X Label"], [54, 70]);
    }, 500);
    d3.select("#c3js_message").html("Other outliers with Y value compared to X value are of this type.");
}

var slide_3 = function() {
    setTimeout(function() {
        my_chart_object.show("X Label (some category)");
    }, 500);
    my_chart_object.unselect();
    d3.select("#c3js_message").html("The points added in orange are intersting because of reasons a,b,c.");
};

var slide_4 = function() {
    setTimeout(function() {
        my_chart_object.select(["X Label (some category)"], [3]);
    }, 500);
    d3.select("#c3js_message").html("For context, here's where we are!");
};

var slide_5 = function() {
    setTimeout(function() {
        my_chart_object.focus("X Label (some category)");
        my_chart_object.ygrids.add([{
            value: 40014,
            text: "Mean of Y Label"
        }]);
    }, 500);
    my_chart_object.unselect();
    d3.select("#c3js_message").html("Take a look at the mean of Y, it indicates this important thing.");
};

var slide_6 = function() {
    setTimeout(function() {
        my_chart_object.xgrids.add([{
            value: 44357.46,
            text: "Mean of X Label",
        }]);
    }, 500);
    d3.select("#c3js_message").html("Now take a look at the mean of X, it indicates this other interesting thing.");
};

var slide_7 = function() {
    my_chart_object.revert();
    setTimeout(function() {
        my_chart_object.xgrids.remove();
        my_chart_object.ygrids.remove();
    }, 250);
    d3.select("#c3js_message").html("Clearly, the relationship between X and Y warrants further investigation. Press \"Replay\" to restart this presentation.");
};

console.warn("Action Required: In c3_visualization/main.js lines 132 - 196, define the functions for each of your slides.")

/* end action required section */


// ------------------------------------------------------------------
// populate the c3_slideshow array with your slides

/**
    * Action Required: Populate the 'c3_slideshow' array with your chart slides
    * An example is shown below
**/

var c3_slideshow = [slide_0, slide_1, slide_2, slide_3, slide_4, slide_5, slide_6, slide_7];

console.warn("Action Required: In c3_visualization/main.js line 211, populate the 'c3_slideshow' array with your own chart slides.")

/* end action required section */


/**  
==================================================================
No Further Action Required: the rest is provided for you 
================================================================== 
**/


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

console.warn("------------------- c3_visualization/main.js END -------------------"); console.log("");