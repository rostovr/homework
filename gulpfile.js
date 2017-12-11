//подключение пакетов

var gulp=require('gulp');
var gutil = require('gulp-util'); //нужен для обработки ошибок
var minCSS=require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var smartgrid = require('smart-grid');


gulp.task('less1', function(){
	gulp.src('less/*.less')
		.pipe(less().on('error', gutil.log))
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
// Запуск задачи мониторинга и компилляции gulp serve
// Если надо только мониторинг с компилляцией без синка в браузере(например на c9)
gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/less/*.less", ['less']); //мониторим less.
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/assets/css/*.css").on('change', browserSync.reload); //мониторим css
});


// Compile sass into CSS & auto-inject into browsers
// ---Только компилляция gulp less
// ---Если нужна только разовая компилляция, без всяких автоматов

gulp.task('less', function() {
    return gulp.src("app/less/*.less")
        .pipe(less().on('error', gutil.log))
        .pipe(gulp.dest("app/assets/css"))
        .pipe(browserSync.stream());
});

// ---Запуск задачи мониторинга, компилляции и browser-sync.
// ---Запускать преимущественно только эту задачу.

gulp.task('auto', ['serve']);

////////////////////////////////////---SMARTGRID---//////////////////////////
///////
/* It's principal settings in smart grid project. Базовые настройки для генерации библиотеки */

var settings = {
    outputStyle: 'less', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '560px'
        }
        /* 
        We can create any quantity of break points.

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

// --- Генерация библиотеки с настройками settings в указанную папку 
// gulp grid

gulp.task('grid', function(){
	smartgrid('app/scr/', settings);
});



