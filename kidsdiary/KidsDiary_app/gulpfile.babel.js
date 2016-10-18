const gulp = require('gulp');
const plumber = require('gulp-plumber');
const browserify = require('browserify');
const babelify = require('babelify');
const gutil = require('gulp-util');
const watchify = require('watchify');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const eslint = require('gulp-eslint');
const uglyfly = require('gulp-uglyfly');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
var stylus = require('gulp-stylus');
const cssnext = require('gulp-cssnext');
const browserSync = require('browser-sync').create();

var paths = {
  'scss': 'scss/',
  'stylus': 'stylus/',
  'css': 'public/stylesheets/',
  files: ['./javascripts/app/**/*.js', '!./javascripts/app/**/*.min.js']
};

gulp.task('watch_lint', [], function () {
  gulp.watch(paths.files, ['lint:js']);
});

gulp.task('scss', function () {
  return gulp.src(paths.scss + '**/*.scss')
      .pipe(sass())
      .on('error', gutil.log)
      .pipe(cssnext())
      .pipe(gulp.dest(paths.css))
});

gulp.task('stylus', function() {
  gulp.src(paths.stylus + '**/*.styl')
      .pipe(stylus())
      .on('error', gutil.log)
      .pipe(cssnext())
      .pipe(gulp.dest(paths.css));
});

function lintJS(callback) {
  return gulp.src(paths.files)
      .pipe(plumber({
        errorHandler: function (err) {
          const title = '[task] ' + err.plugin;
          console.error(title + '\n' + 'Lint Error : ' + err.message);
          this.emit('end');
        }
      }))
      .pipe(eslint({useEslintrc: true}))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
}

gulp.task('lint:js', lintJS);

const b = browserify(
    Object.assign({}, watchify.args,
        {
          entries: ['./javascripts/app/app/main.js'],
          debug: true,
          plugin: [watchify]
        }))
    .transform(babelify);

function doWatch() {
  const reBundle = function (ids) {
    gutil.log('REBUILD');
    return b
        .bundle()
        .on("error", gutil.log)
        .pipe(source('all.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./public/javascripts'))
        .pipe(notify('LET\'S PLAY'));
  };

  b.on('update', reBundle)
      .on("log", gutil.log);

  return reBundle();
}
gulp.task('watch_babel', doWatch);

/*****
 *
 */
const b2 = browserify(
    Object.assign({}, watchify.args,
        {
          entries: ['./javascripts/app/a/main.js'],
          debug: true,
          plugin: [watchify]
        }))
    .transform(babelify);

function doWatch2() {
  const reBundle = function (ids) {
    gutil.log('REBUILD');
    return b2
        .bundle()
        .on("error", gutil.log)
        .pipe(source('all_home.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./public/javascripts'))
        .pipe(notify('LET\'S PLAY'));
  };

  b2.on('update', reBundle)
      .on("log", gutil.log);

  return reBundle();
}
gulp.task('watch_babel2', doWatch2);


gulp.task('serve', function () {
  browserSync.init({
    proxy: 'localhost:9000',
    port: 9001,
    files: [
      'public/javascripts/*.js'
    ],
    open: false,
    ghostMode: false,
    logPrefix: 'browser-sync',
    reloadDelay: 1500,
    reloadDebounce: 1500,
    notify: false,
    ui: false
  });
});
gulp.task('sync', ['watch_babel', 'serve']);

function build() {
  return browserify(Object.assign({}, watchify.args, {
    entries: ['./javascripts/app/app/main.js'], debug: false
  }))
    .on('log', gutil.log)
    .transform(babelify)
    .bundle()
    .on('error', function (err) {
      console.error('Babel Error : ', err.message);
      this.emit('end');
    })
    .pipe(source('all.js'))
    .pipe(buffer())
    .pipe(uglyfly())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/javascripts'));
}

gulp.task('build_babel', build);
