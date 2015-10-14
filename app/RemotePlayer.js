var RemotePlayer = function(game, id, x, y) {
  var self = this;
  this.game = game;
  this.car = this.game.add.sprite(x, y, 'car');
  this.game.physics.p2.enable(this.car);

  this.id = id;

  this.lastX = x;
  this.lastY = y;
  this.lastRotation = 0;
  this.left = {};
  this.right = {};
  this.up = {};
  this.down = {};

};

RemotePlayer.prototype.updateOther = function() {


   if (this.left) {
     this.car.body.rotateLeft(100);
   } else if (this.right) {
    this.car.body.rotateRight(100);
  } else {
    this.car.body.setZeroRotation();
  }
  if (this.up) {
    this.car.body.thrust(400);
  } else if (this.down) {
    this.car.body.reverse(400);
  }

  if (this.car.body.x !== this.lastX || this.car.body.y !== this.lastY) {
    this.car.body.x = this.lastX;
    this.car.body.y = this.lastY;
    this.car.body.rotation = this.lastRotation;
  }

};

RemotePlayer.prototype.update = function() {

  if (this.left) {
    this.car.body.rotateLeft(100);
  } //ship movement
  else if (this.right) {
    this.car.body.rotateRight(100);
  } else {
    this.car.body.setZeroRotation();
  }
  if (this.up) {
    this.car.body.thrust(400);
  } else if (this.down) {
    this.car.body.reverse(400);
  }

  this.lastX = this.car.body.x;
  this.lastY = this.car.body.y;
  this.lastRotation = this.car.body.rotation;

};
RemotePlayer.prototype.send = function() {
  return {
    id: this.id,
    left: this.left,
    right: this.right,
    up: this.up,
    down: this.down,
    x: this.car.body.x,
    y: this.car.body.y,
    rotation: this.car.body.rotation
  };
};

window.RemotePlayer = RemotePlayer;
