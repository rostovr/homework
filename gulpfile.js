//подключение пакетов

var gulp=require('gulp');
var minCSS=require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');


gulp.task('less1', function(){
	gulp.src('less/*.less')
		.pipe(less())
		.pipe(gulp.dest('assets/css'));
});


// отслеживание less стилей.При изменении файлов  less/*.less
// запустить задачу less
gulp.task('less1:watch', function() {
    gulp.watch('app/less/*.less', ['less']);
 });


gulp.task('min', function(){
	gulp.src('app/assets/css/*.css')
		.pipe(minCSS())
		.pipe(gulp.dest('app/assets/css-min'))
});

// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/less/*.less", ['less']); //мониторим less.
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/assets/css/*.css").on('change', browserSync.reload); //мониторим css
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('less', function() {
    return gulp.src("app/less/*.less")
        .pipe(less())
        .pipe(gulp.dest("app/assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('auto', ['serve']);