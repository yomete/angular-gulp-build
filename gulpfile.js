var gulp = require('gulp')
var sass = require('gulp-ruby-sass')
var browserify = require('browserify')
var browserSync = require('browser-sync')
var source = require('vinyl-source-stream')
var livereload = require('gulp-livereload')
var nodemon = require('gulp-nodemon')
var uglify = require('gulp-uglify')
var pump = require('pump')
var cleanCSS = require('gulp-clean-css')
var wiredep = require('wiredep').stream
var inject = require('gulp-inject')
var concat = require('gulp-concat');


gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
})

gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
})

gulp.task('bower', function () {
	gulp.src('public/index.html')
		.pipe(wiredep())
		.pipe(gulp.dest('public/'));
})

gulp.task('scripts', function() {
	return gulp.src(['app/app.js', 'app/controllers/MainController.js'])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('public/js/'));
})



gulp.task('sass', function() {
	return sass('sass/style.scss')
		.pipe(gulp.dest('public/css/'));
})

gulp.task('minify-css', function() {
	return gulp.src('public/css/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('public/css/'));
})

gulp.task('watch', function() {
	gulp.watch('sass/style.scss', ['sass'])
	livereload.listen()
})

gulp.task('default', ['browser-sync', 'minify-css', 'watch', 'bower', 'scripts'])