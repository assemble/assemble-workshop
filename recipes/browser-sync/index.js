var assemble = require( 'assemble' );
var extname = require( 'gulp-extname' );
var less = require( 'gulp-less' );
var browserSync = require( 'browser-sync' ).create();
var path = require( 'path' );

var app = assemble();

app.task( 'init', function ( cb ) {
	app.helper( 'markdown', require( 'helper-markdown' ) );
	app.layouts( path.join( __dirname, './templates/layouts/**/*.hbs' ) );
	cb();
} );

app.task( 'css', function () {
	return app.src( path.join( __dirname, './less/default.less' ) )
		.pipe( less() )
		.pipe( app.dest( path.join( __dirname, './.build/css' ) ) )
		.pipe( browserSync.stream() );
} );

app.task( 'serve', function () {
	browserSync.init( {
		port: 8080,
		startPath: 'page-1.html',
		server: {
			baseDir: path.join( __dirname, './.build' )
		}
	} );
} );

app.task( 'content', ['init'], function () {
	return app.pages.src( path.join( __dirname, './content/**/*.{md,hbs}' ) )
		.pipe( app.renderFile() )
		.on( 'err', console.error )
		.pipe( extname() )
		.pipe( app.dest( path.join( __dirname, './.build' ) ) )
		.pipe( browserSync.stream() );
} );

app.task( 'default', ['css', 'content', 'serve'], function () {
} );

app.watch( path.join( __dirname, './content/**/*.md' ), ['content'] );
app.watch( path.join( __dirname, './less/**/*.less' ), ['css'] );

module.exports = app;
