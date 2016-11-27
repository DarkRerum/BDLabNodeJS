var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/DBLab", function(err, db) {
	if(!err) {
		console.log("We are connected");
	}
});
console.log('test');
