const vorpal = require('vorpal')();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

var models = require('./models')(mongoose);
var functions = require('./functions');

var Account = models.Accounts;
var Product = models.Products;
var Order = models.Orders;


vorpal
  .command('product price <productname> <currency>', 'Gets product price in provided currency')
  .action(function(args, callback) {	
	
	functions.getProductPrice(models, args.productname, args.currency
	, function(err, data) {
		if (err) {console.log(err.errmsg)}
		else {
			vorpal.log(data);
		}
	}
);
		
    callback();
  });

vorpal
  .delimiter('steam$')
  .show();