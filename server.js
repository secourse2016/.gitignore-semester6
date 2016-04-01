var express = require("express");
var path    = require('path');
var app = express();
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/",function(req,res){
	res.render("index.html");
});

app.listen(8000);
