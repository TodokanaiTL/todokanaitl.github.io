const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const server = require('browser-sync').create();
const Autoprefix = require('less-plugin-autoprefix');
const CleanCSS = require('less-plugin-clean-css');

const paths = {
  pages: [
    '**/*.html',
    '!./node_modules/**'
  ],
  styles: {
    src: 'styles/src/*.less',
    dest: 'styles/dist',
  }
};

gulp.task('build', () => {
  return gulp.src(paths.styles.src)
    .pipe(less({
      plugins: [new Autoprefix(), new CleanCSS()]
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('watch:css', gulp.series(['build'], (done) => {
  server.stream({match: '**/*.css'});
  done();
}));

gulp.task('default', gulp.series(['build'], () => {
  server.init({
    files: paths.styles.dest,
    notify: false,
    host: 'localhost',
    server: './',
    ui: false
  });
  gulp.watch(paths.styles.src, gulp.parallel('watch:css'));
  gulp.watch(paths.pages).on('change', gulp.parallel(server.reload));
}));
