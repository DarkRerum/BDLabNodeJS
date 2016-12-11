var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

var models = require('./models')(mongoose);
var functions = require('./functions');

var Account = models.Accounts;
var Product = models.Products;
var Order = models.Orders;
var orderId = new mongoose.mongo.ObjectId('584d116851dbc4203f3a79a3')

functions.closeOrder(models, orderId
	, function(err, da) {
		if (err) {console.log(err.errmsg)}
		else {
			console.log(da);
		}
	}
);


/*functions.addItemToOrder(models, orderId, 'Skyrim', 'rur'
	, function(err, da) {
		if (err) {console.log(err.errmsg)}
		else {
			console.log(da);
		}
	}
);*/	
/*
functions.removeItemFromOrder(models, orderId, 'Skyrim'
	, function(err, da) {
		if (err) {console.log(err.errmsg)}
		else {
			console.log(da);
		}
	}
);	
*/


/*functions.createOrder(models, 'rerum2'
	, function(err, data) {
		if (err) {console.log(err.errmsg)}
		else {
			console.log(data);
		}
	}
);
*/
/*functions.removePriceData(models, 'Skyrim', 'eur'
	, function(err, data) {
		if (err) {console.log(err.errmsg)}
		else {
			console.log(data);
		}
	}
);
*/
/*functions.addPriceData(models, 'Skyrim', 'eur', 88
	, function(err, data) {
		if (err) {console.log(err.errmsg)}
		else {
			console.log(data);
		}
	}
);*/


/*functions.unlockAchievement(models, 'rerum2', 'Fallout: New Vegas', 'finish'
	, function(err, data) {
		if (err) {console.log(err.errmsg)}
		else {
			console.log(data);
		}
	}
);*/
/*functions.getAccountAchievement(models, 'rerum2', 'russian'
	, function(err, data) {
		if (err) {console.log(err.errmsg)}
		else {
			console.log(data);
		}
	}
);*/
/*functions.getAccountData(models, 'rerum2'
	, function(err, data) {
		if (err) {console.log(err.errmsg)}
		else {
			console.log(data);
		}
	}
);*/

/*functions.getOwnedProducts(models, 'rerum2'
	, function(err, data) {
		if (err) {console.log(err.errmsg)}
		else {
			console.log(data);
		}
	}
);*/

/*functions.addPriceData(models, 'Skyrim', 'cny', 55
	, function(err, data) {
		if (err) {console.log(err.errmsg)}
		else {
			console.log(data);
		}
	}
);*/

/*functions.getProductAchievements(models, 'Fallout: New Vegas', 'russian'
	, function(err, names) {
		if (err) {console.log(err.errmsg)}
		else {
			console.log(names);
		}
	}
);
*/
/*functions.getProductPrice(models, 'Fallout: New Vegas', 'ff', function(err, price) {
	if (err) {console.log(err.errmsg)}
	else {
		console.log(price);
	}
});*/


/*var testAcc = new Account({
	name: 'hiso',
	username: 'dsa',
	email: 'rew@example.com',
	phone: "99006664646",
	//language: 'english',
	//owned_products: ['Fallout: New Vegas']
});

testAcc.save(function (err) {
	if (err) {
		console.log(err.errmsg); 
	}
});
*/

/*var testProd = new Product({
	name: 'Skyrim',
	price: [
			{cur: 'rur', value:  350},
			{cur: 'eur', value: 13},
			{cur: 'usd', value: 17}
		],
		description: [
			{lang: 'russian', text: 'описание'},
			{lang: 'english', text: 'descrt'}
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

testProd.save(function (err) {
	if (err) {
		console.log(err.errmsg); 
	}
});
*/

//var testOrder = new Order({});
/*Product.findOne({name: 'Fallout: New Vegas'}).exec(function(err,doc) {
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
	
/*Product.findOne({name: 'Fallout: New Vegas'})
.exec(function(err,doc) {
	if (err) {
		console.log(err);
	}
	else {
		console.log(doc.achievements[0].translations);
	}
});*/

/*Account.findOne({ name: 'rerum2' })
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
*/

