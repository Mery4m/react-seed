var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    nodemon = require('gulp-nodemon');

gulp.task('default',


    ['start'],

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

gulp.task('start', function () {
    // todo-cj : fix the exectution script location. Webstorm hijacked this...
    return nodemon({
        script: './bin/www'
    })
    .on('start', function () {

        gutil.log('started...')
    });
});

gulp.task('watch', function () {
    gutil.log('watch initiated');
    gulp.watch('public/javascripts/**/*.js', ['jshint']);
    gulp.watch('public/stylesheets/**/*.scss', ['build-css']);
});

