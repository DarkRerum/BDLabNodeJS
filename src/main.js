var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;

var AccountSchema = new Schema({
	name: String,
	username: String,
	email: String,
	phone: String,
	language: String,
	owned_products: [ String ]
});

