var assemble = require( 'assemble' );
var less = require( 'gulp-less' );
var path = require( 'path' );
var nano = require( 'gulp-cssnano' );
var sourceMaps = require( 'gulp-sourcemaps' );

var app = assemble();

app.task( 'css', function () {
	return app.src( path.join( __dirname, './less/default.less' ) )
		.pipe( less() )
		.pipe( app.dest( path.join( __dirname, './.build/css' ) ) );
} );

app.task( 'css:optimized', function () {

	var lessOptions = {};
	var nanoOptions = {};

	return app.src( path.join( __dirname, './less/default.less' ) )
		.pipe( sourceMaps.init() )
		.pipe( less( lessOptions ) )
		.pipe( nano( nanoOptions ) )
		.pipe( sourceMaps.write() )
		.pipe( app.dest( path.join( __dirname, './.build/css' ) ) );
} );

module.exports = app;
