var filesystem = require('fs');
var jsdom = require('jsdom');
var htmlFileName = process.argv[2];

var callback = function(errors, window) {
	console.log(window.document.title);
};

jsdom.env({html: htmlFileName, done: callback});