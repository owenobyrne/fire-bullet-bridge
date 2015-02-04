/**
 * Module dependencies.
 */

var express = require('express')
	, webhook = require('./routes/webhook')
	, business = require('./routes/business')
	, http = require('http')
	, db = require('./db-config')
	, util = require('util')
	, bodyParser = require('body-parser')

db.init();

var app = express();
var jsonParser = bodyParser.json()
var rawParser = bodyParser.raw({ type: 'application/jwt' })

// all environments
app.set('port', 3002);

app.post('/webhooks/:id', rawParser, webhook.get);
app.get('/businesses', jsonParser, business.get);
app.post('/businesses', jsonParser, business.add);
app.get('/businesses/:bId', jsonParser, business.getById);

process.on('uncaughtException', function(err) {
    // there's an error from the websocket library that I CANNOT catch.
    // do nothing for the moment,
    console.log("Balls");
    console.log(err);
});

var server = http.createServer(app);

server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
