var gulp = require("gulp");
var livereload = require("gulp-livereload");
var spawn = require('child_process').spawn;

var node;
livereload({
  start: true
});

gulp.task("server", function() {
  if (node) {
    node.kill();
  }
  node = spawn("node", ['./app/app.js'], {
    stdio: 'inherit'
  });
  node.on('close', function(code) {
    if (code === 8) {
      gulp.log("erreur");
    }
  });
});


gulp.task("default", function() {
  gulp.run("server");
  gulp.watch(["app/*.html","*.*"], function() {
    gulp.run("server");
    gulp.src("*.*").pipe(livereload());
  });
});
