const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const browserSync = require('browser-sync').create();

// Configuración de la tarea para compilar Sass a CSS
gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream()); // Añadido para recargar el navegador cuando se compila Sass
});

// Configuración de la tarea para compilar Jade a HTML
gulp.task('pug', function () {
  return gulp.src('src/views/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream()); // Añadido para recargar el navegador cuando se compila Pug
});

// Configuración de la tarea para compilar TypeScript
gulp.task('typescript', function () {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream()); // Añadido para recargar el navegador cuando se compila TypeScript
});

// Configuración de la tarea de observación y del servidor
gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: './dist', // Cambia esto según la estructura de tu proyecto
    },
  });

  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/views/**/*.pug', gulp.series('pug'));
  gulp.watch('src/**/*.ts', gulp.series('typescript'));
});

// Tarea predeterminada para ejecutar Gulp
gulp.task('default', gulp.series('sass', 'pug', 'typescript', 'watch'));

