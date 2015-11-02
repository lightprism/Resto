var gulp = require("gulp");

var sass = require("gulp-sass");

var browserSync = require("browser-sync").create();

function errorHandler(error) {
    // Logs out error in the command line
    console.log(error.toString());
    // Ends the current pipe, so Gulp watch doesn't break
    this.emit('end');
}

gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass().on('error', errorHandler)) // Compiles Sass to CSS with gulp-sass
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});


gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/**/*.scss", ["sass"]);
    gulp.watch("*.html").on("change", browserSync.reload);
});


gulp.task('default', ['serve']);






