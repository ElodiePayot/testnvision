

import gulp from 'gulp'; // pareil que var gulp = require('gulp')
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import cssmin from 'gulp-cssmin';
import browserSync from 'browser-sync';
import fileinclude from 'gulp-html-extend';
import jsmin from 'gulp-jsmin';
import sourcemaps from 'gulp-sourcemaps';



/*
  export permet d'utiliser la fonction cleanBuild dans le (gulp cleanBuild) si on n'a pas "export" devant "function" on aura un message d'erreur qui nous dit que la fonction n'existe pas.

  On utilise la syntaxe de function() et non plus gulp.task car c'est la nouveauté de gulp 4. Mais on peut toujours utiliser gulp.task, le résultat sera le même
*/


// Déplaces le fichier html edité dans le dossier build
export function includes() {
  return gulp.src(['src/*.html'])
    .pipe(fileinclude({
      annotations: false,
      verbose: false
    }))
    .pipe(gulp.dest('build'))
}

// Fonction qui permet d'actualiser le serveur web. le done() indique que la tâche est terminée, sinon ça tourne dans le vide...
export function reload(done) {
  browserSync.reload();
  done();
}


// Fonction (tâche) qui va permettre à la fois de transformer le SASS en CSS puis de le minifier puis de le mettre dans le dossier build.
export function styles() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    //.pipe(cssmin())
    //.pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build/css'));
}

//faire une tâche script et le mettre dans build et serve

export function script() {
  return gulp.src('src/js/main.js')
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/js'));
}



//copier
export function copy() {
  return gulp.src(['src/img','src/fonts'])
  .pipe(gulp.dest('build'))
}

export function copyBScss() {
  return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css','node_modules/bootstrap/dist/css/bootstrap.min.css.map'])
    .pipe(gulp.dest('build/css'));
}

export function copyBSjs() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/bootstrap/dist/js/bootstrap.min.js.map', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/jquery/dist/jquery.min.map'])
    .pipe(gulp.dest('build/js'));
}


// Fonction qui permet de construire le projet
export function build(done) {
  return gulp.series('styles','script', 'includes', 'copy', 'copyBScss', 'copyBSjs')(done);
}


// Fonction qui permet de lancer un serveur web
export function serve(done) {
  browserSync({
      server: "build/"
  });
  gulp.watch('src/scss/**/*.scss', gulp.series('styles', 'reload'));
  gulp.watch('src/js/main.js', gulp.series('script', 'reload'));
  gulp.watch('src/*.html', gulp.series('includes', 'reload'));

  done();
}

// fonction par defaut de gulp (elle a le 'default' en plus) il suffit juste de taper gulp dans le terminal pour lancer cette tache
export default function test(done) {
  return gulp.series('build', 'serve')(done);
}
