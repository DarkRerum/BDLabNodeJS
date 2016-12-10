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
  .command('account add <accountname> <username> <email> <language>', "Creates new account.")
  .action(function(args, callback) {	
	
	var testAcc = new Account({
		name: args.accountname,
		username: args.username,
		email: args.email,
		language: args.language
	});
	
	testAcc.save(function (err) {
		if (err) {
			vorpal.log(err.errmsg); 
		} else {
			vorpal.log("Successfully created an account");
		}
	});		
		
    callback();
  });

// needs checking
vorpal
  .command('account ownedproducts <accountname>', "Lists account's owned product names.")
  .action(function(args, callback) {	
	
	functions.getOwnedProducts(models, args.accountname
	, function(err, data) {
		if (err) {vorpal.log(err.errmsg)}
		else {
			for (var i in data) {
				vorpal.log(data[i]);
			}			
		}
	}
	);
		
    callback();
  });  


vorpal
  .command('account printdata <accountname>', "Prints info on given account.")
  .action(function(args, callback) {	
	
	functions.getAccountData(models, args.accountname
	, function(err, data) {
		if (err) {console.log(err.errmsg)}
		else {
			vorpal.log('Name: ' + data.name);
			vorpal.log('Username: ' + data.username);
			vorpal.log('Email: ' + data.email);
			vorpal.log('Language: ' + data.language);
		}
	}
);
		
    callback();
  });  
  
vorpal
.command('order create <accountname>', "Creates a new order for given account.")
.action(function(args, callback) {	
	
	functions.createOrder(models, args.accountname, function(err, data) {
		if (err) {
			vorpal.log(err.errmsg)
		}
		else {			
			vorpal.log("order successfully created");
		}
	});
		
    callback();
  });   
  
vorpal
  .command('product ach <productname> <language>', "Lists product's achievements in specified language.")
  .action(function(args, callback) {	
	
	functions.getProductAchievements(models, args.productname, args.language
	, function(err, data) {
		if (err) {console.log(err.errmsg)}
		else {			
			for (var i in data) {
				vorpal.log(data[i]);
			}
		}
	}
);
		
    callback();
  });  

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