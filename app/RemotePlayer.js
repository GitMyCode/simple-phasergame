
var RemotePlayer = function(game,id, x ,y){
    var self= this;
  this.game = game;
  this.car = game.add.sprite(x, y , 'car');
  game.physics.p2.enable(this.car);

  this.id = id;

  this.lastX = x;
  this.lastY = y;
  this.left = {};
  this.right = {};
  this.up = {};
  this.down = {};

};

RemotePlayer.prototype.updateOther = function(){
    this.car.body.x = this.lastX;
    this.car.body.y = this.lastY;
    if (this.left) {
      this.car.body.rotateLeft(100);
    } //ship movement
    else if (this.right) {
      this.car.body.rotateRight(100);
    } else {
      this.car.body.setZeroRotation();
    }
    // if (this.up) {
    //   this.car.body.thrust(400);
    // } else if (this.down) {
    //   this.car.body.reverse(400);
    // }

};

RemotePlayer.prototype.update = function(){

    this.lastX = this.car.body.x;
    this.lastY = this.car.body.y;
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
  };
RemotePlayer.prototype.send = function(){
    return {
      id: this.id,
      left: this.left,
      right: this.right,
      up: this.up,
      down: this.down,
      x: this.car.body.x,
      y: this.car.body.y
    };
  };

window.RemotePlayer = RemotePlayer;
