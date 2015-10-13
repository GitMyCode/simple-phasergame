
var RemotePlayer = function(game){
    var self= this;
  this.game = game;
  this.car = game.add.sprite(32, game.world.height - 150, 'car');
  game.physics.p2.enable(this.car);

  this.id = null;

  this.x = 0;
  this.y = 0;
  this.left = {};
  this.right = {};
  this.up = {};
  this.down = {};

};

RemotePlayer.prototype.update = function(){
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
      left: this.left,
      right: this.right,
      up: this.up,
      down: this.down
    };
  };

window.RemotePlayer = RemotePlayer;
