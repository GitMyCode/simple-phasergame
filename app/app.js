
var http = require("http");
var fs = require("fs");

var index = fs.readFileSync(__dirname + "/index.html");

var app = http.createServer(function(req, res){
  res.writeHead(200, {"Content-Type" : "text/html"});
  res.end(index);
});

app.listen(process.env.PORT || 5001);
