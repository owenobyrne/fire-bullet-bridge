var db = require("../db-config");
var bullethq = require("bullethq");
var jwt = require('jsonwebtoken');


exports.get = function(req, res){
	// Get the details of the business based on the endpoint ID
	var config = db.db.get(req.params.id);
	bullethq.initialize(config.email, config.token, config.businessid);

	// Decode the webhook from the JWT
	var webhook = jwt.verify(req.rawBody, config.fireprivatetoken);
	console.log(webhook);

	bullethq.listAllInvoices(function(err, invoices) {
	    	if (err) { console.log(err); return false; }
	
		findMatchingInvoice(webhook, invoices, bullethq);	
	});

	// Immediately return a HTTP 200 OK
	res.status(200).end();
};

var findMatchingInvoice = function(webhook, invoices, bullethq) {
	
	var found = 0;
	invoices.forEach(function(invoice) {

		// Must match amount, currency, and poNumber
		if (parseFloat(invoice.outstandingAmount) == webhook.amount /100  && invoice.currency == webhook.currency && invoice.poNumber == webhook.ref) {
			console.log("Match!");
			found = 1;
			console.log(invoice);	
			createPayment(webhook, invoice, bullethq);

		}
	});

	if (!found) {	
		console.log("No matching invoices!");
		console.log(webhook);
	}
		
};


var createPayment = function(webhook, invoice, bullethq) {
	
	// Try to find the ID of the bank account this was paid to.
	bullethq.listAllBankAccounts(function(err, bankAccounts) {
	    	if (err) { console.log(err); return false; }
		
		bankAccounts.forEach(function(bankAccount) {
			// Match it on the IBAN in the webhook
			if (bankAccount.iban == webhook.iban) {
				console.log("Found Matching Bank Account!");
				console.log(bankAccount);

				var dateReceived = new Date().toISOString().replace(/T.+/, '');

				// Pay the invoice.
				bullethq.createClientPayment({
					currency: webhook.currency,
					amount: webhook.amount / 100,
					dateReceived: dateReceived,
					clientId: invoice.clientId,
					bankAccountId: bankAccount.id,
					invoiceIds: [invoice.id]
				    }, function(err, payment) {
					if (err) { console.log(err); return false; }

					console.log(payment);
				    }
				);
			}
		});
	});
};
