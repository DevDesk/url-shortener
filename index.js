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


// var models = require("./models");
 
// models.Urls.findOrCreate({where:{url:"testurl654"}}).done(function(err,myUrl,isThisABrandNewRecord){
 
//     console.log('--------- WAS CREATED:',isThisABrandNewRecord);
 
//     //if it was isThisABrandNewRecord CREATE HASH
//     if(isThisABrandNewRecord){
//         myUrl.hash="testhash";
//         myUrl.save().done(function(err,savedObject){
//             console.log('--------- GENERATED HASH!!',savedObject.hash);
//             //res.render
//         });
//     }else{
//         //res.render
//         console.log('--------- ALREADY HAS HASH!!',myUrl.hash)
//     }
// });


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
	db.Url.find({where: {'hash':req.params.hash2}}).done(function(err,data){
		// console.log(data.url);
		if (data.url.substring(0, 7) == "http://") {
			res.redirect(data.url);
		} else {
			res.redirect("http://" + data.url);
		}
	})
});



app.listen(process.env.PORT || 3000);