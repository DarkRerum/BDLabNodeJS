var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var conn = mongoose.connection;
var models = require('./models')(mongoose);

var testAcc = new models.Accounts({
	name: 'rerum',
	username: 'Acinonyx',
	email: 't@example.com',
	phone: "8 800 555 35 35",
	language: 'english',
	owned_products: ['Fallout: New Vegas']
});
conn.collection('accounts').insert(testAcc);
process.exit();
