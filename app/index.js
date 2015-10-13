var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
  preload: preload,
  create: create,
  update: update
});

var socket;
var thisPlayer;
var otherPlayers = [];
function Player() {
  var self= this;
  this.car = null;
  this.x = 0;
  this.y = 0;
  this.left = {};
  this.right = {};
  this.up = {};
  this.down = {};
  this.update = function(){
    if (self.left) {
      self.car.body.rotateLeft(100);
    } //ship movement
    else if (self.right) {
      self.car.body.rotateRight(100);
    } else {
      self.car.body.setZeroRotation();
    }
    if (self.up) {
      self.car.body.thrust(400);
    } else if (self.down) {
      self.car.body.reverse(400);
    }
  };
  this.send = function(){
    return {
      left: self.left,
      right: self.right,
      up: self.up,
      down: self.down
    };
  };
}

function preload() {
  game.stage.disableVisibilityChange = true;
  game.load.image('car', 'public/images/car.png');
  game.load.image('tinycar', 'public/images/tinycar.png');
}

function create() {

  socket = io.connect();


  game.physics.startSystem(Phaser.Physics.P2JS);
  // bullets = game.add.group();
  // for (var i = 0; i < 10; i++) {
  //     var bullet = bullets.create(game.rnd.integerInRange(1200, 1700), game.rnd.integerInRange(-200, 400), 'tinycar');
  //     game.physics.p2.enable(bullet,false);
  // }
  cursors = game.input.keyboard.createCursorKeys();
  thisPlayer = new RemotePlayer(game, Math.floor(Math.random() * 150 +1), Math.floor(Math.random() * game.world.height));
  //
  // player.car = game.add.sprite(32, game.world.height - 150, 'car');
  // game.physics.p2.enable(player.car);

  socket.on("connect", onSocketConnect);
  socket.on("movePlayer", onMovePlayer);
  socket.on("newPlayer", onNewPlayer);

}

function onSocketConnect() {
  socket.emit("newPlayer", {x : thisPlayer.x, y : thisPlayer.y});
}

function onNewPlayer(data){
  var newPlayer = new RemotePlayer(game, data.id, data.x, data.y);
  otherPlayers.push(newPlayer);
}

function onMovePlayer(data) {
  var player = playerById(data.id);
  player.left = data.left;
  player.right = data.right;
  player.up = data.up;
  player.down = data.down;

}


function update() {
  //bullets.forEachAlive(moveBullets,this);  //make bullets accelerate to ship
  otherPlayers.forEach(function(p){
      p.update();
  });

  thisPlayer.left = cursors.left.isDown;
  thisPlayer.right = cursors.right.isDown;
  thisPlayer.up = cursors.up.isDown;
  thisPlayer.down = cursors.down.isDown;
  thisPlayer.update();
  socket.emit('movePlayer', thisPlayer.send());


  // if (cursors.left.isDown) {
  //   player.body.rotateLeft(100);
  // } //ship movement
  // else if (cursors.right.isDown) {
  //   player.body.rotateRight(100);
  // } else {
  //   player.body.setZeroRotation();
  // }
  // if (cursors.up.isDown) {
  //   player.body.thrust(400);
  // } else if (cursors.down.isDown) {
  //   player.body.reverse(400);

}


function moveBullets(bullet) {
  accelerateToObject(bullet, player, 30); //start accelerateToObject on every bullet
}

function accelerateToObject(obj1, obj2, speed) {
  if (typeof speed === 'undefined') {
    speed = 60;
  }
  var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
  obj1.body.rotation = angle + game.math.degToRad(90); // correct angle of angry bullets (depends on the sprite used)
  obj1.body.force.x = Math.cos(angle) * speed; // accelerateToObject
  obj1.body.force.y = Math.sin(angle) * speed;
}

function playerById (id) {
  var i;
  for (i = 0; i < otherPlayers.length; i++) {
    if (otherPlayers[i].id === id) {
      return otherPlayers[i];
    }
  }

  return false;
}
