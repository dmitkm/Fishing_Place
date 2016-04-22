var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS    = require('gulp-clean-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify');

gulp.task('browser-sync', ['styles', 'scripts'], function() {
		browserSync.init({
				server: {
						baseDir: "./public"
				},
				notify: false
		});
});

gulp.task('styles', function () {
	return gulp.src('./scss/*.scss')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	//.pipe(rename({suffix: '.min', basename: "common", prefix : ''}))
	.pipe(concat('common.css'))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(cleanCSS())
	.pipe(gulp.dest('./public/css/dist'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src('./public/js/**/*.js')
		.pipe(concat('app.js'))
		.pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./public/js/dist'));
});

gulp.task('watch', function () {
	gulp.watch('scss/*.scss', ['styles']);
	gulp.watch('public/js/**/*.js', ['scripts']);
	gulp.watch('public/js/**/*.js').on("change", browserSync.reload);
	gulp.watch('public/templates/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);