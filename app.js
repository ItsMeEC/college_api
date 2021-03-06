var express = require('express');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/college/');
var Col = require('./models/collegeModel');
var bodyParser = require('body-parser');
const passport = require('passport');
var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname+ '/views');

const users = require('./users/router');

var port = process.env.PORT||3000; 
var commanRouter = express.Router();

//app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());

//app.use('/users', users);

commanRouter.route('/getColleges')
    .get(function(req,res){
		Col.find(function(err,data){
			if(err)
			   res.status(500).send(err);
			else
				console.log(data);
			res.render('college',{name: data});
		})
});

app.use('/api', commanRouter);

app.use(express.static(__dirname + '/public'));

app.get('/login',function(req,res){
	res.render('login', {name:"Evan"})
})

app.get('/search',function(req,res){
	res.render('search')
})

app.listen(port, function(){
	console.log("running");
});