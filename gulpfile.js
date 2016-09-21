var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync')
var uglify = require('gulp-uglify')
var pump = require('pump')
var cleanCSS = require('gulp-clean-css')
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject')
var concat = require('gulp-concat');
var	uglify = require('gulp-uglify');
var	jshint = require('gulp-jshint');
var	cssnano = require('gulp-cssnano');
var	sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');



gulp.task('bower', function () {
	gulp.src('public/index.html')
		.pipe(wiredep())
		.pipe(gulp.dest('public/'));
})

gulp.task('scripts', function() {
	return gulp.src(['app/app.js', 'app/controllers/MainController.js'])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('public/js/'))
		.pipe(sourcemaps.init())
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(gulp.dest('public/js/'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/js/'))
		.pipe(browserSync.reload({stream:true, once: true}));
})

gulp.task('css', function () {
	return gulp.src('sass/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('public/css/'))
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.reload({stream:true}));
});


gulp.task('browser-sync', function() {
	browserSync.init(null, {
		server: {
			baseDir: "public"
		}
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});

gulp.task('watch', function() {

})

gulp.task('default', ['bower', 'scripts', 'css','browser-sync' ], function () {
	gulp.watch("sass/*.scss", ['css']);
	gulp.watch(['app/app.js', 'app/controllers/MainController.js' ], ['scripts']);
	gulp.watch("public/*.html", ['bs-reload']);
})