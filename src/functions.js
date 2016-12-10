module.exports.getProductPrice = function(models, productName, currency, callback) {
	models.Products.findOne({name: productName})
	.exec(function (err, prods) {
		if (err) {return callback(err, null)}
		else {
			if (prods === null) {
				return callback({errmsg: 'There isn\'t such product'}, null);
			}
			for (var i in prods.price) {
				if (prods.price[i].cur === currency) {
					return callback(null, prods.price[i].value);
				}
			}
			return callback({errmsg: 'This product has no price in this currency'}, null);
		}
	});
	
}