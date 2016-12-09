var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var models = require('./models')(mongoose);

mongoose.Promise = global.Promise;

var testAcc = new models.Accounts({
	name: 'rerum',
	username: 'Acinonyx',
	email: 't@example.com',
	phone: "8 800 555 35 35",
	language: 'english',
	owned_products: ['Fallout: New Vegas']
});

testAcc.save(function (err) {
  if (err) return handleError(err);
  // saved!
})
