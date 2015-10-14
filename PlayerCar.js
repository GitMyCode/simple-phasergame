

var PlayerCar = function(idParams, X, Y){
  var x = X;
  var y = Y;
  var id = idParams;
  var left ;
  var right ;
  var up ;
  var down ;
  var rotation;
  var velocity;

  // Getters and setters
  var getX = function () {
    return x;
  };

  var getY = function () {
    return y;
  };

  var setX = function (newX) {
    x = newX;
  };

  var setY = function (newY) {
    y = newY;
  };

  var update = function(data){
    left = data.left;
    right = data.right;
    up = data.up;
    down = data.down;
    x = data.x;
    y = data.y;
    rotation = data.rotation;
    velocity = data.velocity;
  };

  var send = function(){
    return {
      id : id,
      x : x,
      y : y,
      rotation: rotation,
      left: left,
      right: right,
      up :up ,
      down: down,
      velocity : velocity
    };
  };
  // Define which variables and methods can be accessed
  return {
    getX: getX,
    getY: getY,
    setX: setX,
    setY: setY,
    update: update,
    id: id,
    send: send,
    left: left,
    right: right,
    up :up ,
    down: down,
    rotation: rotation,
    velocity : velocity
  };
};

// Export the Player class so you can use it in
// other files by using require("Player")
module.exports = PlayerCar;
