var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css');

// Server connect for livereload
gulp.task('connect', function() {
    connect.server({
        root: 'www',
        livereload: true
    });
});

// CSS
gulp.task('css', function () {
    return gulp.src('scss/*.scss') // from where it taked
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS()) //minifying file css
        .pipe(rename('bundle.min.css')) // name after minification
        .pipe(gulp.dest('www/css')) //where it will be saved
        .pipe(connect.reload());
});

// HTML
gulp.task('html', function () {
   gulp.src('www/index.html')
       .pipe(connect.reload());
})


//Watch
gulp.task('watch', function () {
    gulp.watch('scss/*.scss', ['css'])
    gulp.watch('www/index.html', ['html'])
})

//Default
gulp.task('default', ['connect', 'html', 'css', 'watch']);