const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const server = require('browser-sync').create();

const paths = {
  pages: [
    '**/*.html',
    '!./node_modules/**'
  ],
  styles: {
    src: './styles/src/*.scss',
    dest: './styles/dist/*.min.css',
    root: dir => `./styles/${dir}`
  }
};

gulp.task('build', () => {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      require('postcss-preset-env')({stage: 3}),
      require('autoprefixer')(),
      require('cssnano')()
    ]))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.root('dist')));
});

gulp.task('watch:css', ['build'], (done) => {
  server.stream({match: '**/*.css'});
  done();
});

gulp.task('default', ['build'], () => {
  server.init({
    files: paths.styles.dest,
    notify: false,
    host: 'localhost',
    server: './',
    ui: false
  });
  gulp.watch(paths.styles.src, ['watch:css']);
  gulp.watch(paths.pages).on('change', server.reload);
});

