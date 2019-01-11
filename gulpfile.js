var gulp = require('gulp'), // Подключаем Gulp
	sass = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync = require('browser-sync'); // Подключаем Browser Sync
	gcmq = require('gulp-group-css-media-queries');

gulp.task('sass', function() { // Создаем таск Sass
	return gulp.src('app/sass/*.sass') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(gcmq())
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({
			stream: true
		})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('watch', gulp.parallel('browser-sync', 'sass',function() {
	gulp.watch('app/sass/*.sass').on('change', gulp.series('sass')); // Наблюдение за sass файлами в папке sass
	gulp.watch('app/*.html').on("change", function(){browserSync.reload}); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/*.js').on("change", function(){browserSync.reload});  // Наблюдение за JS файлами в папке js
}));

gulp.task('default', gulp.series('watch'));