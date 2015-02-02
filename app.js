/**
 * Module dependencies.
 */

var express = require('express')
	, webhook = require('./routes/webhook')
	, http = require('http')
	, db = require('./db-config')
	, util = require('util')

db.init();

var app_bupa = express();

// all environments
app_bupa.set('port', 3002);
app_bupa.use(express.favicon());
app_bupa.use(express.logger('dev'));
app_bupa.use(express.bodyParser());
app_bupa.use(express.methodOverride());
app_bupa.use(app_bupa.router);

app_bupa.post('/login', webhook.get);

process.on('uncaughtException', function(err) {
    // there's an error from the websocket library that I CANNOT catch.
    // do nothing for the moment,
    console.log("Balls");
    console.log(err);
});

var server = http.createServer(app_bupa);

server.listen(app_bupa.get('port'), function() {
	console.log('Express server listening on port ' + app_bupa.get('port'));
});
