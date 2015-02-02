exports.get = function(req, res){
	console.log(req);

/*

	db.addAccount({
			ownerType: res.locals.ownerType,
			ownerId: res.locals.ownerId,
			name: req.body.name,
			bic: bic, 
			iban: iban,
			currency: req.body.currency
		},
		function(results) {
			res.json({id: results.id});
		}
	);
*/
	//res.json({asd:"sdjfkl"});
	res.status(200).end();
};
