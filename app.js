var express = require("express");
var http = require('http');
var fs = require("fs");
var url = require("url");
var path = require("path");
var io = require("socket.io");
var PlayerCar = require("./PlayerCar");


var app = module.exports.app = express();
app.use(express.static(__dirname + '/app'));

var server = http.createServer(app);
server.listen(process.env.PORT || 5001);

var players = [];


var tinycars;
var socket = io.listen(server);
socket.sockets.on('connection', onClientConnection);

function onClientConnection(client){

   client.on("newPlayer", onNewPlayer);
   client.on("movePlayer", onMovePlayer);
   client.on("disconnect", onDisconnect);
}

var onNewPlayer = function(data){
  var player =  new PlayerCar(this.id, data.x ,data.y);
  this.broadcast.emit('newPlayer', player.send());
  for(var i=0; i< players.length; i++){
      this.emit("newPlayer", players[i].send());
  }
  players.push(player);
};

function onMovePlayer(data){
  var player = playerById(this.id);
  player.update(data);
  this.broadcast.emit('movePlayer', player.send());
}

function onDisconnect(){
  players.splice(players.indexOf(playerById(this.id), 1));
  this.broadcast.emit('removePlayer', {id: this.id});
}

function playerById (id) {
  var i;
  for (i = 0; i < players.length; i++) {
    if (players[i].id === id) {
      return players[i];
    }
  }

  return false;
}

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
