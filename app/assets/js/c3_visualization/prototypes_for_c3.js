/**

Instructor's note: 

There is absolutely no way you are expected to understand how I arrived at the following code.
C3 is a library that is under-maintained and, at the time of writing (Oct 29, 2016), there are 561 issues and 86 pull requests on the Github.
I read into that and it turns out that people are wondering what the future of the library is https://groups.google.com/forum/#!searchin/c3js/future%7Csort:relevance/c3js/2Aqo3Pz10TM/UVi8bG34BwAJ
So, I dug into the source code, mapped it out, and figured out the minimum amount of code necessary to inject a callback after the data is loaded.
That's what you see below. 
Note that I've put this in a separate file so that you can use the current version of C3 without having to use a custom "Dave's version".
Generally, this is preferred. Ideally it's unnecessary since URL load callbacks are standard in just about every other library.
In any case, that's where this came from.
-- Dave

**/

// this tells the library to accept "onload" as an additional parameter in the config
c3.chart.internal.fn.additionalConfig = {"data": {"onfinishloading": undefined }};

// this rewrites the convertUrlToData function to call data.onload() after the data is finished loading
c3.chart.internal.fn.convertUrlToData = function (url, mimeType, headers, keys, done) {
    var $$ = this, type = mimeType ? mimeType : 'csv';
    var req = $$.d3.xhr(url);
    if (headers) {
        Object.keys(headers).forEach(function (header) {
            req.header(header, headers[header]);
        });
    }
    req.get(function (error, data) {
        var d;
        if (!data) {
            throw new Error(error.responseURL + ' ' + error.status + ' (' + error.statusText + ')');
        }
        if (type === 'json') {
            d = $$.convertJsonToData(JSON.parse(data.response), keys);
        } else if (type === 'tsv') {
            d = $$.convertTsvToData(data.response);
        } else {
            d = $$.convertCsvToData(data.response);
        }
        done.call($$, d);
        $$.config.data.onfinishloading();
    });
};