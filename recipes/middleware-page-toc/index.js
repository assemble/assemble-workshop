'use strict';
var assemble = require( 'assemble' );
var extname = require( 'gulp-extname' );
var toc = require( 'markdown-toc' );
var path = require( 'path' );
var debug = require( 'debug' )( 'middleware-page-docs' );

var app = assemble();

app.pages( path.join( __dirname, './content/**/*.{md,hbs}' ) );
app.layouts( path.join( __dirname, './templates/layouts/**/*.hbs' ) );
/**
 * Bind an object called `toc` to each view containing the table of contents using markdown-toc.
 */
app.preRender( /\.md/, function ( view, next ) {
	view.data.toc = toc( view._content ).json; //eslint-disable-line
	next();
} );

app.helper( 'markdown', require( 'helper-markdown' ) );

/**
 * Set the default layout for files with the extension .md or .hbs.
 */
app.preLayout( /\/content\/.*\.(md|hbs)/, function ( view, next ) {
	if ( !view.layout ) {
		view.layout = 'default';
	}
	next();
} );

app.task( 'default', function () {
	return app.toStream( 'pages' )
		.pipe( app.renderFile() )
		.on( 'error', console.error )
		.pipe( extname() )
		.pipe( app.dest( path.join( __dirname, './.build' ) ) );
} );

module.exports = app;
