const gulp = require('gulp')
const minify = require('gulp-minify')
const del = require('del')
const minifyHTML = require('gulp-htmlmin')
const cleanCSS = require('gulp-clean-css')
const imageMin = require('gulp-imagemin')
const zip = require('gulp-zip')

gulp.task('clean', () =>
  del('dist/**', { force: true })
)

gulp.task('sw', () =>
  gulp.src(['{serviceWorker,registerServiceWorker}.js'])
  .pipe(minify({
    ext: {
      min: '.js'
    },
    noSource: true
  }))
  .pipe(gulp.dest('dist'))
)

gulp.task('js', () =>
  gulp.src(['js/{util,shapes,game,main}.js'])
  .pipe(minify({
    ext: {
      min: '.js'
    },
    noSource: true
  }))
  .pipe(gulp.dest('dist/js'))
)

gulp.task('css', () =>
  gulp.src('main.css')
  .pipe(cleanCSS())
  .pipe(gulp.dest('dist'))
)

gulp.task('image', () =>
  gulp.src('images/*')
  .pipe(imageMin())
  .pipe(gulp.dest('dist/images'))
)


gulp.task('html', () =>
  gulp.src('index.html')
  .pipe(minifyHTML({
    collapseWhitespace: true
  }))
  .pipe(gulp.dest('dist'))
)

gulp.task('manifest', () =>
  gulp.src('manifest.json')
  .pipe(gulp.dest('dist'))
)

gulp.task('zip', async () => {
  await del('dist/game.zip')
  return gulp.src('dist/**/*')
  .pipe(zip('game.zip'))
  .pipe(gulp.dest('dist'))
})

gulp.task('default', gulp.series('clean', 'sw', 'js', 'css', 'image', 'html', 'manifest', 'zip'))
