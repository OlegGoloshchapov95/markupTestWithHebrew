var gulp = require('gulp'), //Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет
    browserSync = require('browser-sync'); // Подключаем Browser Sync
    autoprefixer = require('gulp-autoprefixer'); //Подключаем библиотеку для автоматического добавления префиксов  

gulp.task('sass', function(){
  return gulp.src(['markupTest/sass/**/*.sass', 'markupTest/sass/**/*.scss']) // Берём источник  
   .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) //Преобразуем Sass в CSS
   .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
   .pipe(gulp.dest('markupTest/css'))// Выгружение результата в папку css
   .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'markupTest' // Директория для сервера - markupTest
        },
        notify: false // Отключаем уведомления
    });
});
gulp.task('watch', function(){
  gulp.watch(['markupTest/sass/**/*.sass', 'markupTest/sass/**/*.scss'], gulp.parallel('sass')); //Наблюдение за sass файлами в папке sass
    gulp.watch('markupTest/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('markupTest/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js 
});

gulp.task('default', gulp.parallel('watch','browser-sync','sass'));