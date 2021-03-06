var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    nodemon = require('gulp-nodemon'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    rename = require('gulp-rename'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    source = require('vinyl-source-stream');

var jsxDir = './public/javascripts/browser.js';
var bundleDestDir = './public/javascripts';

gulp.task('default',
    [
        'start',
        'watch'
    ],
    function () {
    return gutil.log('Gulp is running');
});

// demonstrate how gulp copies
gulp.task('copy', function () {
    gulp.src('public/**/*')
        .pipe(gulp.dest('new'));
});

gulp.task('jshint', function () {
    return gulp.src('public/javascripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('build-css', function () {
    gulp.src('public/stylesheets/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
});

gulp.task('bundle-jsx', function () {
    var b = browserify();

    b.transform(reactify);
    b.add('./public/javascripts/browser.js');

    return b.bundle()
        .pipe(source('public/javascripts/browser.js'))
        .pipe(rename('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./public/javascripts'))
});

gulp.task('start', function () {
    // todo-cj : fix the exectution script location. Webstorm hijacked this...
    return nodemon({
        script: './bin/www'
    })
});

gulp.task('browser-sync', ['start'], function() {
    browserSync.init(null, {
        proxy: {
            host: "http://localhost",
            port: 5000
        }
    });
});

gulp.task('watch', function () {
    gutil.log('watch initiated');
    //gulp.watch('public/javascripts/**/*.js', ['jshint']);
    //gulp.watch('public/stylesheets/**/*.scss', ['build-css']);
    gulp.watch('public/javascripts/jsx/**/*.js', ['bundle-jsx']);
});

