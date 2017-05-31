'use strict';
var express = require('express');
var exphbs  = require('express-handlebars');
var body_parser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
app.use(express.static('public'));

app.use(body_parser.urlencoded({ extended: false}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const mongoURL = process.env.MONGO_DB_URL || "mongodb://greets:greets@ds064299.mlab.com:64299/liwa-greetings-webapp";
mongoose.connect(mongoURL);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('We are connected');
});

var testSchema = mongoose.Schema({
    name: String,
    counter: Number
});

var newName = mongoose.model('test', testSchema);

var greetedNames = [];

app.listen(process.env.PORT || 3000, function () {
	console.log('Server running on port 3000');
});

app.get('/', function (req, res) {
	res.render('index');
});

app.post('/', function (req, res) {
    var greetName = req.body.name;
//	console.log(greetName);
	greetedNames.push(greetName);
	var language = req.body.language;
//	console.log(req.body)
    
    var output = '';

	if (language === 'English') {
		output = 'Hello, ' + greetName;
	} else if (language === 'isiXhosa') {
		output = 'Molo, ' + greetName;
	} else if (language === 'Latin') {
		output = 'Salve, ' + greetName;
	}
    

    var uniqNames = {};
	for (var i = 0; i < greetedNames.length; i++) {
		var greets = greetedNames[i];
		uniqNames[greets] = uniqNames[greets] ? uniqNames[greets] : 1;
	}

    var counter = 0;
    for (var key in uniqNames) {
        counter++;
    }
    
    res.render('index', {greeting: output, counter: counter});
    
//    newName.create({name: greetName, counter: 1});
    
    newName.findOne({name: greetName}, function(err, firstName) {
        if(err) {
            return done(err)
        }
        if(firstName) {
            firstName.counter = firstName.counter + 1;
            firstName.save();
        } 
        if(!firstName) {
            newName.create({name: greetName, counter: 1});
        }
    });
    
});



//app.get('/greeted', function(req, res){
//	console.log('Showing greeted Names');
//	res.send('These are greeted greetNames: ' + greetedNames);
//});
//
//app.get('/counter/:user', function (req, res) {
//	var user = req.params.user
//	var uniqNames = {};
//	for(var i = 0; i < greetedNames.length; i++) {
//		var greets = greetedNames[i];
//		uniqNames[greets] = uniqNames[greets] ? uniqNames[greets] + 1 : 1;
//	}
//console.log(uniqNames[user]);
//res.send('Hello, ' + user + ' has been greeted ' + JSON.stringify(uniqNames[user]) + ' time(s)');
//});
