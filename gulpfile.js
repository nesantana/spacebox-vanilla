'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat	= require('gulp-concat');
var minifyCSS   = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var sassInheritance = require('gulp-better-sass-inheritance');
var chmod = require('gulp-chmod');
var cached = require('gulp-cached');
var gulpif = require('gulp-if');
var wait = require('gulp-wait');
var notify = require('gulp-notify');
var babel = require('gulp-babel');

var SCSS_SRC = './assets/scss/**/*.scss';
var SCSS_Inheritance = './assets/scss/';
var SCSS_DEST = './assets/css';

gulp.task('compile_scss', function() {
  return gulp.src(SCSS_SRC)
    .pipe(wait(200))
    .pipe(gulpif(global.isWatching, cached('sass')))
    .pipe(sassInheritance({base: SCSS_Inheritance}))
    .pipe(sass())
    .on('error', function (err) {
          console.log(err.toString());
          notify.onError({
              title: "Gulp SASS Error"
          })(err);

          this.emit('end');
      })
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(SCSS_DEST));
});

gulp.task('watch_scss', function(){
    gulp.watch(SCSS_SRC, gulp.series('compile_scss'));
});

var js_SRC = ['./assets/js/scripts.js', './assets/js/jquery.min.js'];
var js_DEST = './assets/js';

gulp.task('minify_js', function(){
	gulp.src(js_SRC)
  .pipe(concat('concat.js'))
  .pipe(babel({
      presets: ['es2015']
  }))
  .on('error', function (err) {
    console.log(err.toString());
    notify.onError({
        title: "Gulp error in " + err.plugin,
        message:  err.toString()
    })(err);

    this.emit('end');
  })
	.pipe(uglify())
	.pipe(rename({ suffix: '.min' }))
	.pipe(changed(js_DEST))
	.pipe(gulp.dest(js_DEST));
});

gulp.task('watch_js', function(){
  gulp.watch(js_SRC, ['minify_js']);
});

gulp.task('default', gulp.series('watch_scss'));

