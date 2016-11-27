// Kurtis Romanchuk gulpfile.js created mostly with help from https://css-tricks.com/gulp-for-beginners/

// Requires gulp
var gulp = require('gulp');
// Requires the gulp sass plugin
var sass = require('gulp-sass');
// Requires the browser-sync plugin
var browserSync = require('browser-sync').create();
// Requires useref
var useref = require('gulp-useref');
// Requirements for minifying javascript
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
// Requires the gulp css nano plugin
var cssnano = require('gulp-cssnano');


// Creates function to convert sass to css
gulp.task('sass', function(){
	return gulp.src('scss/**/*.scss')
		.pipe(sass()) // Converts sass to css with gulp-sass
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// Browser Sync
gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: '.'
		},
	})
})

// Watch task
gulp.task('watch', ['browserSync', 'sass'], function(){
	// Automatically update scss files to css
	gulp.watch('scss/**/*.scss', ['sass']);
	// Reload browser whenever html, css, or js files change
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('css/*.css', browserSync.reload);
	gulp.watch('js/*.js', browserSync.reload);
})

// Creates useref task to build javascript libraries at end of html file into correct order
gulp.task('useref', function(){
	return gulp.src('*.html')
		.pipe(useref())
		// Minifies only if it's a Javascript file
		.pipe(gulpIf('*.js', uglify()))
		// Minifies only if it's a CSS file
		.pipe(gulpIf('*.css', cssnano()))
		// Outputs results to distribution folder for github pages
		.pipe(gulp.dest('docs'))
});

