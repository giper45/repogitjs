var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
       bodyParser = require('body-parser'),
	app = express(),
	port = +process.env.PORT || 8080, 

	repogitHandler = require('./app/handlers/repogitHandler')


//    album_hdlr = require('./handlers/albums.js'),
//    page_hdlr = require('./handlers/pages.js'),

//var upload = multer({ dest: "uploads/" });

app.use(express.static(__dirname + "/public"));
// Parse application/x-www-form-urlencoded & JSON
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(function (err, req, res, next) {
	res.status(500);
	res.end(err + "\n");
})





// JSON API
//Api labels 
app.get("/repogit/v1/root", repogitHandler.getRootDir)
app.get("/repogit/v1/repos", repogitHandler.getRepos)


//Clone a repo
app.post("/repogit/v1/repos/:reponame", repogitHandler.cloneRepo)
//app.get("/repogit/v1/repos", repogitHandler.)



app.use('/',function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

//function four_oh_four(req, res) {
//    res.writeHead(404, { "Content-Type" : "application/json" }); 
//    res.end(JSON.stringify(helpers.invalid_resource()) + "\n");
//}
//




app.listen(port, function() {console.log("Server listening on port" + port)});
