// Kurtis Romanchuk gulpfile.js created mostly with help from https://css-tricks.com/gulp-for-beginners/

'use-strict';
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
// Requires the gulp imagemin plugin
var imagemin = require('gulp-imagemin');
// Requires the gulp cache plugin
var cache = require('gulp-cache');
// Requires the del plugin
var del = require('del');
// Requires the run sequence plugin
var runSequence = require('run-sequence');
// Requires the gulp autoprefixer plugin
var autoprefixer = require('gulp-autoprefixer');
// Requires the gulp file includer
var fileinclude = require('gulp-file-include');

// Creates function to include files
gulp.task('fileinclude', function() {
	gulp.src(['./html/*.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('.'))
});

// Creates function to convert sass to css
gulp.task('sass', function(){
	return gulp.src('scss/**/*.scss')
		.pipe(sass()) // Converts sass to css with gulp-sass
		// auto-prefix css
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// creates a broswerSync task to create a local server with Browser Sync
gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: '.'
		},
	})
});

// Creates a watch task to update saved files
gulp.task('watch', function(){
	//Automatically assemble html files
	gulp.watch('html/*.html', ['fileinclude']);
	gulp.watch('html/includes/*.html', ['fileinclude']);
	// Automatically update scss files to css
	gulp.watch('scss/**/*.scss', ['sass']);
	// Reload browser whenever html, css, or js files change
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('css/*.css', browserSync.reload);
	gulp.watch('js/*.js', browserSync.reload);
});

// Creates a serve task to convert sass to css, build a local server, and watch for updates
gulp.task('serve', function(callback){
	runSequence('sass','browserSync','watch',callback);
});

// Creates useref task to build javascript libraries at end of html file into correct order
gulp.task('useref', function(){
	return gulp.src('*.html')
		.pipe(useref())
		// Minifies only if it's a Javascript file
		.pipe(gulpIf('*.js', uglify()))
		// Minifies only if it's a CSS file
		// auto-prefix css
		.pipe(gulpIf('*.css',autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		})))
		.pipe(gulpIf('*.css', cssnano()))
		// Outputs results to distribution folder for github pages
		.pipe(gulp.dest('docs'))
});

// Creates an images task to optimize images
gulp.task('images', function(){
	return gulp.src('img/**/*')
	// Caching images that run through imagemin
	.pipe(cache(imagemin({
		// Setting interlaced to true to make interlaced gifs
		interlaced: true
	})))
	// Outputs results to distribution folder for github pages
	.pipe(gulp.dest('docs/img'))
});

// Creates a fonts task to copy fonts, no optimization needed
gulp.task('fonts', function(){
	return gulp.src('app/fonts/**/*')
	// Outputs results to distribution folder for github pages
	.pipe(gulp.dest('docs/fonts'))
});

// Creates a clean:docs function to clean the github pages distribution folder of old uncached build files
gulp.task('clean:docs', function(){
	return del.sync('docs');
});

// Creates a build task to run all tasks to optimize and/or copy files
gulp.task('build', function(callback){
	runSequence('clean:docs','fileinclude','sass',['useref','images','fonts'],callback);
	console.log('Building files');
});