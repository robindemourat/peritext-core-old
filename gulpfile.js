var gulp = require('gulp');
var strip = require('gulp-strip-comments');
var babel = require('gulp-babel');

gulp.task('build', function(){
  gulp.src([
      'src/*.js',
      'src/**/*.js'
    ])
    .pipe(babel({
      presets: ['es2015'],
      plugins: [
        "add-module-exports",
        "transform-class-properties",
        "transform-decorators-legacy"
      ]
    }))
    .pipe(gulp.dest('dist'));
  gulp.src([
      'src/**/*.json'
    ])
    .pipe(strip())
    .pipe(gulp.dest('dist'));
  gulp.src([
      'src/**/*.css'
    ])
    .pipe(gulp.dest('dist'));
});
