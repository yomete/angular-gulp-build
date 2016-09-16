var gulp = require('gulp')
var sass = require('gulp-ruby-sass')
var connect = require('gulp-connect')
var browserify = require('browserify')
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream')
var livereload = require('gulp-livereload')
var nodemon = require('gulp-nodemon')


gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
});

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
});

gulp.task('browserify', function() {
	//grabs the app.js file
	return browserify('./app/app.js')
		//bundles it and creates a file named main.js
		.bundle()
		.pipe(source('main.js'))
		//saves it to the public/js/ directory
		.pipe(gulp.dest('./public/js/'))
		.pipe(livereload());
})

gulp.task('sass', function() {
	return sass('sass/style.scss')
		.pipe(gulp.dest('public/css'))
		.pipe(livereload());
})

gulp.task('watch', function() {
	gulp.watch('app/**/*.js', ['browserify'])
	gulp.watch('sass/style.scss', ['sass'])
	livereload.listen()
})

gulp.task('default', ['browser-sync', 'watch'])