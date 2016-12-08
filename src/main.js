var mongoose = require('mongoose');

var models = require('./models')(mongoose);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');


var testAcc = new models.Accounts({
	name: 'rerum',
	username: 'Acinonyx',
	email: 't@example.com',
	phone: "8 800 555 35 35",
	language: 'english',
	owned_products: ['Fallout: New Vegas']
});

testAcc.save(function (err) {
  if (err) {
		console.log("err");
		return err;
  }
  else {
  	console.log("saved");
  }
});

process.exit();