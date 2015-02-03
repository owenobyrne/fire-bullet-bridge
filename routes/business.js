var db = require("../db-config");
var uuid = require('node-uuid');

exports.get = function(req, res){
	res.json(db.db.keys());
};

exports.add = function(req, res){
	var bId = uuid.v4();	
	db.db.put(bId, { email: req.body.email, token: req.body.token, businessid: req.body.businessid, fireprivatetoken: req.body.fireprivatetoken }, function() {
		res.json(bId);
	});
};

exports.getById = function(req, res){
	var bId = req.params.bId;	
	res.json(db.db.get(bId));
};
