'use strict';
var assemble = require( 'assemble' );
var path = require( 'path' );

var app = assemble();

app.preLayout( /\.md/, function ( view, next ) {
	// console.log( view.data.title + ': preLayout', view );
	next();
} );

app.onLoad( /\.md/, function ( view, next ) {
	// console.log( view.data.title + ': onLoad', view );
	next();
} );

app.preCompile( /\.md/, function ( view, next ) {
	// console.log( view.data.title + ': preCompile', view );
	next();
} );

app.postCompile( /\.md/, function ( view, next ) {
	// console.log( view.data.title + ': postCompile', view );
	next();
} );

app.preRender( /\.md/, function ( view, next ) {
	// console.log( view.data.title + ': preRender', view );
	next();
} );

app.postRender( /\.md/, function ( view, next ) {
	// console.log( view.data.title + ': postRender', view );
	next();
} );

app.task( 'default', function () {
	return app.pages.src( path.join( __dirname, './content/**/*.{md,hbs}' ) )
		.pipe( app.renderFile() )
		.pipe( app.dest( path.join( __dirname, './.build' ) ) );
} );

module.exports = app;
