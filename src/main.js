var co = require('co');

co(function*() {
	'use strict';

	var Mongorito = require('mongorito');
	var Model = Mongorito.Model;

	Mongorito.connect('localhost/DBLab');
	
	console.log('test');
		

	class Account extends Model {	
	}

	var account = new Account({
		name: 'steam_god',
		username: 'gaben',
		email: 't@example.com',
		phone: "8 800 555 35 35",
		language: 'english',
		owned_products: ['Half Life 3']
	});

	yield account.save();

	var accounts = yield Account.all();
	
	console.log(accounts);
	
	Mongorito.disconnect();
});


