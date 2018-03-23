/*eslint-disable */

const gulp = require('gulp')
const sequence = require('gulp-sequence')
const rename = require('gulp-rename')
const flatmap = require('gulp-flatmap')
const eslint = require('gulp-eslint')
const source = require('vinyl-source-stream')
const path = require('path')
const del = require('del')

// Javascript
const rollup = require('rollup-stream')
const babel = require('rollup-plugin-babel')
const compressJs = require('gulp-uglify')

// Stylesheets
const postcss = require('gulp-postcss')
const cssnext = require('postcss-cssnext')
const sass = require('gulp-sass')
const compressCss = require('gulp-cssnano')

// Others
const browserSync = require('browser-sync')
const mainBowerFiles = require('main-bower-files')

// -----------------------------------------------------------------------------
// BrowserSync

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: "./build/"
    },
    files: ['./build/**/*.*'],
    port: 5000,
    notify: false,
  })
})

// -----------------------------------------------------------------------------
// Watch

gulp.task('watch', () => {
  gulp.watch('src/*.html', ['build:html'])
  gulp.watch('src/js/**/*.js', ['build:asset:js'])
  gulp.watch('src/css/**/*.css', ['build:asset:css'])
  gulp.watch('src/css/**/*.{scss,sass}', ['build:asset:sass'])
  gulp.watch('src/data/*', ['build:asset:data'])
  gulp.watch('src/font/*', ['build:asset:font'])
})

// -----------------------------------------------------------------------------
// Build

gulp.task('build:html', () => {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('./build'))
})

gulp.task('build:asset:js', () => {
  return gulp.src([
      './src/js/*.js',
      '!./src/js/config.js',
    ])
    .pipe(flatmap((stream, file) => {
      return rollup({
        entry: file.path,
        plugins: [
         babel({ runtimeHelpers: true })
        ],
      })
      .on('error', function(e) {
        console.error(e.stack)
        this.emit('end')
      })
      .pipe(source(file.path))
      .pipe(rename(path.basename(file.path)))
      .pipe(gulp.dest('./build/js'))
      .pipe(browserSync.reload({ stream:true }))
    }))
})

gulp.task('build:asset:js:lib', () => {
  return gulp.src(mainBowerFiles('**/*.js'))
    .pipe(gulp.dest('build/js/lib'))
})

gulp.task('build:asset:css', () => {
  return gulp.src('./src/css/*.css')
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({ stream:true }))
})

gulp.task('build:asset:sass', () => {
  return gulp.src('./src/css/*.{scss,sass}')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([cssnext()]))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({ stream:true }))
})

gulp.task('build:asset:data', () => {
  return gulp.src('./src/data/**/*')
    .pipe(gulp.dest('build/data'))
    .pipe(browserSync.reload({ stream:true }))
})

gulp.task('build:asset:font', () => {
  return gulp.src('./src/font/**/*')
    .pipe(gulp.dest('./build/font'))
    .pipe(browserSync.reload({ stream:true }))
})

// -----------------------------------------------------------------------------
// Compress

gulp.task('compress:js', ['clean:map'], () => {
  return gulp.src('build/js/*.js')
    .pipe(compressJs())
    .pipe(gulp.dest('./build/js'))
})

gulp.task('compress:css', () => {
  return gulp.src('build/css/*.css')
    .pipe(compressCss())
    .pipe(gulp.dest('./build/css'))
})

// -----------------------------------------------------------------------------
// Clean

gulp.task('clean', () => {
  return del('./build/*')
})

gulp.task('clean:map', () => {
  return del('./build/js/*.js.map')
})

// -----------------------------------------------------------------------------
// Tasks

gulp.task('build:asset', [
  'build:asset:js',
  'build:asset:js:lib',
  'build:asset:css',
  'build:asset:sass',
  'build:asset:data',
  'build:asset:font',
])

gulp.task('compress', [
  'compress:js',
  'compress:css',
])

gulp.task('default', sequence(
  'clean',
  ['build:html', 'build:asset'],
  'browser-sync',
  'watch'
))

gulp.task('build', sequence(
  'clean',
  ['build:html', 'build:asset'],
  'compress'
))
