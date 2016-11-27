
var co = require('co');

 co(function*() {
	'use strict';

	var Mongorito = require('mongorito');
	var Model = Mongorito.Model;

	Mongorito.connect('localhost/test');			

		class Account extends Model {
		
		configure () {
			this.before('save', 'validate');
		}
		
		* validate(next) {			
			console.log(this.get('name'));
			console.log(this.attributes.email);
			
			var testVal = this.get('name')
			
			if (typeof testVal === 'undefined' || testVal === null) {
				console.log('Name is missing');
				throw new Error('Name is missing');
			}
			
			testVal = this.get('email')
			if (typeof testVal === 'undefined' || testVal === null) {
				console.log('Email is missing');
				throw new Error('Email is missing');
			}			
			//yield next;
		}
		
	}

	class Product extends Model {
		
	}
	
	class Order extends Model {
	}
	
	var account = new Account({
		name: 'steam_god',
		username: 'gaben',
		email: 't@example1.com',
		phone: "8 800 555 35 35",
		language: 'english',
		owned_products: ['Half Life 3']
	});
	yield account.save();
	
	var account2 = new Account({
		name: 'steam_god2',
		username: 'gaben2',
		email: 't@example2.com',
		phone: "8 800 555 35 352",
		language: 'english',
		owned_products: ['Half Life 3']
	});
	yield account2.save();
	
	var accountbad = new Account({
		username: 'gaben',
		email: 't@example1.com',
		phone: "8 800 555 35 35",
		language: 'english',
		owned_products: ['Half Life 3']
	});
	try {
		yield accountbad.save();
	}
	catch (e) {
		
	}

	var product = new Product({
		name: 'Skyrim',
		price: [
			{cur: "usd", value: 20},
			{cur: "rur", value: 450},
			{cur: "eur", value: 15} 
		],
		description: [
			{lang: "english", text: "Skyrim description in English"},
			{lang: "russian", text: "Описание Скайрима на русском языке"}
		]
	});
	
	yield product.save();
	
	/*var order = new Order({
		owner: "steam_god",
		items: [
		{ product_id: ObjectId("5826f5d162aeb5c31e1e82fc"), cur: "rur", value: 299 }			
		],
	});
	
	
	yield order.save();*/
	

	

	var accounts = yield Account.all();
	//console.log(accounts);
	console.log(accounts.get('owned_products'));
	
	Mongorito.disconnect();
	process.exit();
});


