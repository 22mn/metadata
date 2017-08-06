var express= require("express");
var multer = require("multer");
var fs     = require("fs");
var path   = require("path");
var app    = express();
var upload = multer({dest:(path.join(__dirname,"/uploads"))});         // file destination
var porty  = process.env.PORT || 8080;
var undone = "<p>Need to upload <a href='https://mgjean-meta.glitch.me/'>back</a><p>"   //redirect home-page

app.set("view engine","pug");                                          // pug view engine 
app.set("views",path.join(__dirname+"/views"));                        // set templates directory
app.use(express.static(path.join(__dirname,"public")));                // asset /add public directory 

app.get("/",function(req,res){
	res.render("index");                                               // render homepage
});
app.post("/upload",upload.single("image"),function(req,res){
	if (req.file===undefined){
		res.send(undone);                                              // if file did not select
	}
	res.json({name:req.file.originalname,size: req.file.size});        // return json 
	fs.unlink(req.file.path,function(err){						       // delete uploaded file
		if (err){return console.log(err)}
		console.log("Removed!")});	
});
  
app.get("/upload",function(req,res){                                   // catch get call to "/upload"
	res.send(undone);                                                  // redirect home-page
});

var listener= app.listen(porty,()=>{
	console.log("Your app is listening on port: "+listener.address().port);
});