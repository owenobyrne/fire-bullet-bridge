var flatfile = require('flat-file-db');
var db = flatfile('/tmp/fire-bullet-bridge.db');
 
exports.init = function() {
	db.on('open', function() {
	    console.log("Connected to Flat File DB.");
	});
};

exports.db = db;
