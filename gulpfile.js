var gulp = require("gulp");
var livereload = require("gulp-livereload");
var bower = require('gulp-bower');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var spawn = require('child_process').spawn;

var dest = "app/public/";


var node;
livereload({
  start: true
});

gulp.task("server", function() {
  if (node) {
    node.kill();
  }
  node = spawn("node", ['./app.js'], {
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
   gulp.run("bower");
   gulp.watch(["app/*.html", "*.*"], function() {
     gulp.run("server");
     gulp.run("bower");
     gulp.src("*.*").pipe(livereload());
   });
});

gulp.task('bower', function() {
  return gulp.src(mainBowerFiles())
  .pipe(filter("**/*.js"))
  .pipe(concat("vendor.js"))
  .pipe(gulp.dest(dest));
});
