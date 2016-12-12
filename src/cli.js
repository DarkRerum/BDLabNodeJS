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
			for (var i = 0; i < data.length; i++) {
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
			vorpal.log("order '%s' successfully created", data);
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
			var response = data.split(',');
			for (var i in response) {
				vorpal.log(response[i]);
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
  .command('account printach <accountname> <language>', 'Gets achievement names in specified language')
  .action(function(args, callback) {	
	
	functions.getAccountAchievement(models, args.accountname, args.language
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
  .command('account unlockach <accountname> <productname> <achname>', 'Unlocks achievement in specified account and product')
  .action(function(args, callback) {	
	
	functions.unlockAchievement (models, args.accountname, args.productname, args.achname
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
  .command('order additem <orderid> <productname> <currency>', 'Adds product to order in specified currency')
  .action(function(args, callback) {	
	
	functions.addItemToOrder(models, args.orderid, args.productname, args.currency
	, function(err, data) {
		if (err) {console.log(err.errmsg)}
		else {
			vorpal.log('Product successfully added!');
		}
	}
);
    callback();
  });
  
  
  
  vorpal
  .command('list orders <accountname>', 'Lists account orders')
  .action(function(args, callback) {	
	
	functions.getAccountOrders(models, args.accountname
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
  .command('order removeitem <orderid> <productname>', 'Removes product from order')
  .action(function(args, callback) {	
	
	functions.removeItemFromOrder (models, args.orderid, args.productname
	, function(err, data) {
		if (err) {console.log(err.errmsg)}
		else {
			vorpal.log('Product successfully removed from order');
		}
	}
);	
    callback();
  });
  
 
 
 vorpal
  .command('order close <orderid>', 'Closes order')
  .action(function(args, callback) {	
	
	functions.closeOrder(models, args.orderid
	, function(err, data) {
		if (err) {console.log(err.errmsg)}
		else {
			vorpal.log('Order successfully closed');
		}
	}
);	
    callback();
  });

  
     vorpal
  .command('price add <productname> <currency> <value>', 'Adds or replace product price in specified currency')
  .action(function(args, callback) {	
	
	functions.addPriceData (models, args.productname, args.currency, args.value
	, function(err, data) {
		if (err) {console.log(err.errmsg)}
		else {
			vorpal.log('Price successfully added');
		}
	}
);	
    callback();
  });
 
   vorpal
  .command('price remove <productname> <currency>', 'Removes product price in specified currency')
  .action(function(args, callback) {	
	
	functions.removePriceData (models, args.productname, args.currency.toString()
	, function(err, data) {
		if (err) {console.log(err.errmsg)}
		else {
			vorpal.log('Price successfully removed');
		}
	}
);	
    callback();
  });
  
 vorpal
  .command('product create <productname>', 'Creates new product')
  .action(function(args, callback) {	
	var newProduct = new Product({
		name: args.productname
	});
	
	newProduct.save(function (err) {
		if (err) {
			vorpal.log(err.errmsg); 
		} else {
			vorpal.log("Successfully created an product");
		}
	});		
    callback();
  });
  
  
vorpal
  .delimiter('steam$')
  .show();