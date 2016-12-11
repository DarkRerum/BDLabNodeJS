var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

var models = require('./models')(mongoose);
var functions = require('./functions');
functions.getAccountData(models, 'eot'
	, function(err, data) {
		process.exit();
	})