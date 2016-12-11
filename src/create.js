var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

var models = require('./models')(mongoose);
var functions = require('./functions');

var Account = models.Accounts;
var str= 'aaa',
    s= str;



for (var i = 0; i < 10000; i++) {
	var testAcc = new Account({
		name: str,
		username: 'dsa',
		email: 'rew@example.com',
		phone: i
	});
	
	str= ((parseInt(str, 36)+1).toString(36)).replace(/0/g,'a');
	s+= ' '+str;
	
	testAcc.save(function(err, data) {
		if (err) {console.log(err.errmsg)}
		else if (data.phone === 9999) {
			console.log('Done');
			process.exit();
		}
	});
}