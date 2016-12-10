var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

var models = require('./models')(mongoose);

var Account = models.Accounts;
var Product = models.Products;
var Order = models.Orders;


var testAcc = new Account({
	name: 'rerum2',
	username: 'Acinonyx',
	email: 't@example.com',
	phone: "8 800 555 35 35",
	//language: 'english',
	//owned_products: ['Fallout: New Vegas']
});


var testProd = new Product({
	name: 'Fallout: New Vegas',
	price: [
			{cur: 'rur', value:  400},
			{cur: 'eur', value: 15},
			{cur: 'usd', value: 20}
		],
		description: [
			{lang: 'russian', text: 'эммм'},
			{lang: 'english', text: 'hmmm'}
			],
		achievements: [
			{
				id: 1,
				translations: [
					{lang: 'russian', name: 'старт', text: 'стартани'},
					{lang: 'english', name: 'start', text: 'start game'}
				]
			}
		]
});

var testOrder = new Order({});

/*testProd.save(function (err) {
	if (err) {
		console.log(err.errmsg); 
	}
});*/
/*
Product.findOne({name: 'Fallout: New Vegas'}).exec(function(err,doc) {
	if (err) {
	  console.log(err);
	}
	else {
		console.log(0);
		console.log(doc);
		testAcc.owned_products = doc._id;
		console.log(1);
		console.log(testAcc);
		testAcc.save(function (err) {
			if (err) {
				console.log(err.errmsg);
			}
			else {
				console.log(2);
			}
		});
	}
});
*/
	
/*Product
.findOne({name: 'Fallout: New Vegas'})
.exec(function(err,doc) {
	if (err) {
		console.log(err);
	}
	else {
		console.log(doc.achievements[0].translations);
	}
});*/

Account
.findOne({ name: 'rerum2' })
//.populate('owned_products description') // <--
.exec(function (err, acc) {
	if (err) {console.log(err)}
	else {
		testOrder.owner = acc._id;
		Product.findOne({name: 'Fallout: New Vegas'})
		.exec(function(err,prod) {
			if (err) {console.log(err)}
			else {
				testOrder.items = [{
					product: prod._id, 
					cur: 'rur', 
					value: 400
				}];
				testOrder.save(function (err) {
					if (err) {console.log(err)}
					else {
						console.log('success');
					}
				});
			}
		});
	}
});

