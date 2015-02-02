var flatfile = require('flat-file-db');
var db = flatfile('/tmp/fire-bullet-bridge.db');
 
exports.init = function() {
	db.on('open', function() {
	    console.log(db.get('hello')) // prints {world:1} 
	});
};

