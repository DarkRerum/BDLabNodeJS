/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;*/

module.exports = function(mongoose) {
	var Account = new Schema({
		name: String,
		username: String,
		email: String,
		phone: String,
		language: String,
		owned_products: [ String ]
	});
	
	var models = {
		Accounts : mongoose.model('Accounts', Account)
	};
	return models;
	
	/*var Product = new Schema({
		name: String,
		price: [{cur: String, value: long}],
		description: [{lang: String, text: String}],
		achievements: [{id: int, }]
	})*/;
}