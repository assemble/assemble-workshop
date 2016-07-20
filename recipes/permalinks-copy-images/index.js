'use strict';
var assemble = require( 'assemble' );
var path = require( 'path' );
var fs = require( 'fs-extra' );
var permalinks = require( 'assemble-permalinks' );
var slugify = require( 'slug' );

var paths = {
	templates: path.join( __dirname, './templates/layouts/**/*.hbs' ),
	articleDir: path.join( __dirname, './content/**/*.{md,hbs}' ),
	buildDir: path.join( __dirname, './.build' )
};

var app = assemble();

app.task( 'init', function ( cb ) {
	app.layouts( path.templates );
	cb();
} );

app.create( 'articles' )
	.use( permalinks( path.join( paths.buildDir, 'whatever/:category/:getSlug()/index.html' ), {
		getSlug: function () {
			if ( this.slug ) {
				return slugify( this.slug, {lower: true} );
			} else {
				return slugify( this.title, {lower: true} );
			}
		}
	} ) );

app.articles( paths.articleDir );

app.postWrite( /\.html/, function ( view, next ) {
	var sourcePath = path.dirname( view.key );
	var imagesExist = fs.existsSync( path.join( sourcePath, 'images' ) );

	if ( imagesExist ) {
		var destPath = path.dirname( view.data.permalink );
		return fs.copy( path.join( sourcePath, 'images' ), path.join( destPath, 'images' ), function ( err ) {
			if ( err ) {
				console.error( err );
				return next( err );
			}
			return next();
		} );
	} else {
		return next();
	}
} );

app.task( 'articles', function () {
	return app.toStream( 'articles' )
		.pipe( app.renderFile() )
		.on( 'error', console.error )
		.pipe( app.articles.permalink() )
		.pipe( app.dest( paths.buildDir ) );
} );

app.task( 'default', ['init', 'articles'] );

module.exports = app;
