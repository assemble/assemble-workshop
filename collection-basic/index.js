'use strict';
var assemble = require( 'assemble' );
var extname = require( 'gulp-extname' );
var path = require( 'path' );

var app = assemble();

//app.option( 'renameKey', function ( fp ) {
//	return path.basename( fp, path.extname( fp ) );
//} );

app.create( 'articles' );
app.create( 'pages' );

app.task( 'load', function ( cb ) {
	app.helper( 'ctx', path.join( __dirname, './helpers/ctx.js' ) );
	app.layouts( path.join( __dirname, './templates/layouts/*.hbs' ) );
	app.articles( path.join( __dirname, './content/articles/**/*.{md,hbs}' ) );
	app.pages( path.join( __dirname, './content/pages/**/*.{md,hbs}' ) );
	cb();
} );

app.preRender( /./, function ( view, next ) {
	view.data.articles = app.views.articles;
	view.data.pages = app.views.pages;
	next();
} );

app.task( 'content:articles', ['load'], function () {
	return app.toStream( 'articles' )
		.on( 'err', console.error )
		.pipe( app.renderFile() )
		.on( 'err', console.error )
		.pipe( extname() )
		.pipe( app.dest( path.join( __dirname, './.build' ) ) );
} );

app.task( 'content:pages', ['load'], function () {
	return app.toStream( 'pages' )
		.on( 'err', console.error )
		.pipe( app.renderFile() )
		.on( 'err', console.error )
		.pipe( extname() )
		.pipe( app.dest( path.join( __dirname, './.build' ) ) );
} );

app.task( 'default', ['content:articles', 'content:pages']);

app.build( 'default', function ( err ) {
	if ( err ) {
		console.error( err )
	} else {
		//console.log( 'done' );
	}
} );

module.exports = app;