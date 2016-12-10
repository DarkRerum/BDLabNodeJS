/*var mongoose = require('mongoose');*/


module.exports = function(mongoose) {
	var Schema = mongoose.Schema;
	
	
	var Account = new Schema({
		name: {
			type: String,
			required: true,
			unique: true
		},
		username: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		phone: String,
		language: {
			type: String,
			default: 'english'
		},
		owned_products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
	});
	
	
	var Product = new Schema({
		name: {
			type: String,
			required: true,
			unique: true
		},
		price: [{cur: String, value:  Number}],
		description: [{lang: String, text: String}],
		achievements: [{
			id: Number,
			translations: [{
				lang: String,
				name: String,
				text: String
			}]
		}]
	});
	
	
	var Order = new Schema({
		owner : {
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'Accounts',
			required: true,			
		},
		items : [{
			product : {type: mongoose.Schema.Types.ObjectId, ref: 'Products'},
			cur: String,
			value: Number
		}],
		purchase_date: Date
	});
	
	var models = {
		Products : mongoose.model('Products', Product),
		Accounts : mongoose.model('Accounts', Account),
		Orders: mongoose.model('Orders', Order)
	};
	return models;
}
/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	price: [{cur: String, value:  Number}],
	description: [{lang: String, text: String}],
	achievements: [{
		id: Number,
		translations: [{
			lang: String,
			name: String,
			text: String
		}]
	}]
});

var Account = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	username: String,
	email: String,
	phone: String,
	language: {
		type: String,
		default: 'en'
	},
	owned_products: [{ type: String, ref: 'Product' }]
});
	
var Order = new Schema({
	owner : [{ type: String, ref: 'Account' }],
	items : [{
		product : {type: String, ref: 'Product'},
		cur: String,
		value: Number
	}]
});

module.exports = {
	Products : mongoose.model('Products', Product),
	Accounts : mongoose.model('Accounts', Account),
	Orders: mongoose.model('Orders', Order)
};
*/