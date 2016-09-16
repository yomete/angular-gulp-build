var gulp = require('gulp')
var sass = require('gulp-ruby-sass')
var browserify = require('browserify')
var browserSync = require('browser-sync')
var source = require('vinyl-source-stream')
var livereload = require('gulp-livereload')
var nodemon = require('gulp-nodemon')
var jslint = require('gulp-jslint')
var uglify = require('gulp-uglify')
var pump = require('pump')
var cleanCSS = require('gulp-clean-css')


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
		.pipe(jslint.reporter( 'my-reporter' ));
})

gulp.task('compress', function (cb) {
	pump([
			gulp.src('public/js/*.js'),
			uglify(),
			gulp.dest('public/js/')
		],
		cb
	);
})

gulp.task('sass', function() {
	return sass('sass/style.scss')
		.pipe(gulp.dest('public/css'));
})

gulp.task('minify-css', function() {
	return gulp.src('public/css/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('public/css/'));
})

gulp.task('watch', function() {
	gulp.watch('app/**/*.js', ['browserify'])
	gulp.watch('sass/style.scss', ['sass'])
	livereload.listen()
})

gulp.task('default', ['browser-sync', 'compress', 'minify-css', 'watch'])