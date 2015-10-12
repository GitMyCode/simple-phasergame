var express = require("express");
var fs = require("fs");
var url = require("url");
var path = require("path");

var server = express();
server.use(express.static(__dirname + '/app'));
server.listen(process.env.PORT || 5001);
// var app = http.createServer(function(request, response){
//   console.log("process cwd : " +process.cwd());
//   var uri = url.parse(request.url).pathname,
//    filename = path.join(process.cwd(), uri);
//
//   fs.exists(filename, function(exists) {
//     if(!exists) {
//       response.writeHead(404, {"Content-Type": "text/plain"});
//       response.write("404 Not Found\n");
//       response.end();
//       return;
//     }
//
//     console.log(filename);
//     if (fs.statSync(filename).isDirectory()) filename += 'app/index.html';
//
//
//     fs.readFile(filename, "binary", function(err, file) {
//       if(err) {
//         response.writeHead(500, {"Content-Type": "text/plain"});
//         response.write(err + "\n");
//         response.end();
//         return;
//       }
//       console.log('ICI');
//       response.writeHead(200);
//       response.write(file, "binary");
//       response.end();
//     });
//   });
// });
//
//
//
// app.listen(process.env.PORT || 5001);
