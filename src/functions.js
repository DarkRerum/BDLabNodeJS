function findProduct(models, productName, callback) {
	models.Products.findOne({name: productName})
	.exec(function (err, prod) {
		if (err) {return callback(err, null)}
		else {
			if (prod === null) {
				return callback({errmsg: 'There isn\'t such product'}, null);
			}
			return callback(null, prod);
		}
	});
}


function findAccount(models, accountName, callback) {
	models.Accounts.findOne({name: accountName})
	.exec(function (err, acc) {
		if (err) {return callback(err, null)}
		else {
			if (acc === null) {
				return callback({errmsg: 'There isn\'t such account'}, null);
			}
			return callback(null, acc);
		}
	});
}


module.exports.getProductPrice = function(models, productName, currency, callback) {
	findProduct(models, productName, function(err, prod) {
		if (err) {return callback(err, null)}
		
		for (var i in prod.price) {
			if (prod.price[i].cur === currency) {
				return callback(null, prod.price[i].value);
			}
		}
		
		return callback({errmsg: 'This product has no price in this currency'}, null);
	});
}


module.exports.getProductAchievements = function(models, productName, language, callback) {
	findProduct(models, productName, function(err, prod) {
		if (err) {return callback(err, null)}
		
		var names = [];
		var idx = 0;
		
		for (var i in prod.achievements) {
			for (var j in prod.achievements[i].translations) {
				if (prod.achievements[i].translations[j].lang === language) {
					names[idx] = prod.achievements[i].translations[j].name;
					idx++;
				}
			}
		}
		
		if (names.length === 0) {
			return callback({errmsg: 'This product has no achievements in this language'}, null);
		}
		else {
			return callback(null, names);
		}
	});
}


module.exports.getAccountData = findAccount;


module.exports.getOwnedProducts = function(models, accountName, callback) {
	models.Accounts.findOne({name: accountName})
	.populate('owned_products')
	.exec(function (err, acc) {
		if (err) {return callback(err, null)}
		else {
			if (acc === null) {
				return callback({errmsg: 'There isn\'t such account'}, null);
			}
			
			var names = [];
			
			for (var i = 0; i < acc.owned_products.length; i++) {
				names[i] = acc.owned_products[i].name;
			}
			
			if (names.length === 0) {
				return callback({errmsg: 'This product has no owned products'}, null);
			}
			else {
				return callback(null, names);
			}
		}
	});
}