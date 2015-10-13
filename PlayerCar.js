

var PlayerCar = function(id, X, Y){
  var x = X;
  var y = Y;
  var id = id;
  var left ;
  var right ;
  var up ;
  var down ;

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
  };

  var send = function(){
    return {
      id : id,
      x : x,
      y : y,
      left: left,
      right: right,
      up :up ,
      down: down
    };
  }
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
    down: down
  };
};

// Export the Player class so you can use it in
// other files by using require("Player")
module.exports = PlayerCar;
