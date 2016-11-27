var co = require('co');

co(function*() {
	'use strict';

	var Mongorito = require('mongorito');
	var Model = Mongorito.Model;

	Mongorito.connect('localhost/test');
	
	console.log('test');
		

	class Account extends Model {	
		configure () {
			this.before('save', 'validate');
		}
		
		* validate (next) {
			console.log(this);
			
			yield next;
		}
		
	}

	var account = new Account({
		name: 'steam_god',
		username: 'gaben',
		email: 't@example1.com',
		phone: "8 800 555 35 35",
		language: 'english',
		owned_products: ['Half Life 3']
	});
	
	var account2 = new Account({
		name: 'steam_god2',
		username: 'gaben2',
		email: 't@example2.com',
		phone: "8 800 555 35 352",
		language: 'english',
		owned_products: ['Half Life 3']
	});

	yield account.save();

	var accounts = yield Account.all();
	
	console.log(accounts);
	
	Mongorito.disconnect();
	process.exit();
});


