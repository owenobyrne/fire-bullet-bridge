/**
 * Module dependencies.
 */

var express = require('express')
	, webhook = require('./routes/webhook')
	, business = require('./routes/business')
	, http = require('http')
	, db = require('./db-config')
	, util = require('util')

db.init();

var app = express();

// all environments
app.set('port', 3002);
app.use(express.favicon());
app.use(express.logger('dev'));

// Force Express to gather the raw data (not part of it's remit.)
// http://stackoverflow.com/questions/9920208/expressjs-raw-body
app.use(function(req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
        data += chunk;
    });
    req.on('end', function() {
        req.rawBody = data;
        next();
    });
});

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.post('/webhooks/:id', webhook.get);
app.get('/businesses', business.get);
app.post('/businesses', business.add);
app.get('/businesses/:bId', business.getById);

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
