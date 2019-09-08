const gulp = require('gulp')
const concat = require('gulp-concat')
const minify = require('gulp-minify')
const del = require('del')
const htmlReplace = require('gulp-html-replace')
const minifyHTML = require('gulp-htmlmin')
const cleanCSS = require('gulp-clean-css')
const imageMin = require('gulp-imagemin')
const zip = require('gulp-zip')

gulp.task('clean', () =>
  del('dist/**', { force: true })
)

gulp.task('sw', () =>
  gulp.src(['serviceWorker.js', 'registerServiceWorker.js', '!gulpfile.js'])
  .pipe(minify({
    ext: {
      min: '.js'
    },
    noSource: true
  }))
  .pipe(gulp.dest('dist'))
)

gulp.task('js', () =>
  gulp.src(['util.js', 'shapes.js', 'game.js', 'main.js', '!gulpfile.js'])
  .pipe(concat('build.js'))
  .pipe(minify({
    ext: {
      min: '.js'
    },
    noSource: true
  }))
  .pipe(gulp.dest('dist'))
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
  .pipe(htmlReplace({
    js: 'build.js'
  }))
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
