var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
  preload: preload,
  create: create,
  update: update
});

var socket;
var player;
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
var player = new Player();

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
  player = new RemotePlayer(game);
  //
  // player.car = game.add.sprite(32, game.world.height - 150, 'car');
  // game.physics.p2.enable(player.car);

  socket.on("connect", onSocketConnect);
  socket.on("movePlayer", onMovePlayer);
  socket.on("newPlayer", onNewPlayer);

}
function onNewPlayer(data){
  newPlayer = new RemotePlayer(game);
  newPlayer.id = data.id;
  otherPlayers.push(newPlayer);
}

function onSocketConnect() {
  socket.emit("newPlayer", {
    X: player.x,
    Y: player.Y
  });
}

function onMovePlayer(data) {

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

  player.left = cursors.left.isDown;
  player.right = cursors.right.isDown;
  player.up = cursors.up.isDown;
  player.down = cursors.down.isDown;
  player.update();
  socket.emit('movePlayer', player.send());


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
