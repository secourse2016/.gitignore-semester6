var express = require("express");
var path    = require('path');
var app = express();
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/",function(req,res){
	res.render("index.html");
});
app.route('/about').get(function(req, res) { 
    return res.sendFile(__dirname + '/public/index.html'); 
});

app.route('/help').get(function(req, res) { 
    return res.sendFile(__dirname + '/public/index.html'); 
});

app.route('/contact	').get(function(req, res) { 
    return res.sendFile(__dirname + '/public/index.html'); 
});

app.listen(80);
