

import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import cssmin from 'gulp-cssmin';
import browserSync from 'browser-sync';
import fileinclude from 'gulp-html-extend';
import jsmin from 'gulp-jsmin';
import sourcemaps from 'gulp-sourcemaps';


export function includes() {
  return gulp.src(['src/*.html'])
    .pipe(fileinclude({
      annotations: false,
      verbose: false
    }))
    .pipe(gulp.dest('build'))
}

export function reload(done) {
  browserSync.reload();
  done();
}

export function styles() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build/css'));
}

export function script() {
  return gulp.src('src/js/main.js')
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/js'));
}


export function copyImg() {
  return gulp.src('src/img/**')
  .pipe(gulp.dest('build/img'))
}

export function copyFonts() {
  return gulp.src('src/fonts/**')
  .pipe(gulp.dest('build/fonts'))
}


export function build(done) {
  return gulp.series('styles','script','includes','copyImg','copyFonts')(done);
}


export function serve(done) {
  browserSync({
      server: "build/"
  });
  gulp.watch('src/scss/**/*.scss', gulp.series('styles', 'reload'));
  gulp.watch('src/js/main.js', gulp.series('script', 'reload'));
  gulp.watch('src/*.html', gulp.series('includes', 'reload'));

  done();
}

export default function test(done) {
  return gulp.series('build', 'serve')(done);
}
