var express = require ("express");
var bodyParser = require("body-parser");
var db = require("./models/index.js");

var app = express();

var Hashids = require("hashids"),
    hashids = new Hashids("this is my salt");

// 

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:false}));

app.get("/", function(req, res) {
	res.render("index");
});

app.post("/create", function(req, res){
	// res.send(req.body);
	db.Url.create(req.body).done(function(err, data) {
		var hashVariable = hashids.encode(data.id);
		data.hash = hashVariable;
		data.save().done(function(err1, data2) {
			// res.send(data2);
			res.render("create",{data2:data2});
			console.log(data2);
		});
	})
});

app.get("/:hash2", function(req, res){
	db.Url.find({where: {hash:req.params.hash2}}).done(function(err,data){
		// console.log(data.url);
		if (data.url.substring(0, 7) == "http://") {
			res.redirect(data.url);
		} else {
			res.redirect("http://" + data.url);
		}
	})
});



app.listen(3000, function(){
	console.log("Ready to go on 3000!");
})