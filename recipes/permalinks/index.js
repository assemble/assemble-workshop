'use strict';
var assemble = require( 'assemble' );
var path = require( 'path' );
var utils = require( './../lib/utils' );
var permalinks = require( 'assemble-permalinks' );
var del = require( 'del' );
var slugify = require( 'slug' );

var paths = {
	buildDir: path.join( __dirname, './.build' ),
	srcDir: path.join( __dirname, './content/**/*.{md,hbs}' ),
	templates: path.join( __dirname, './templates/layouts/**/*.hbs' )
};

var app = assemble();

app.create( 'articles' /*, {layout: 'body'}*/ )
	.use( permalinks( path.join( paths.buildDir, 'whatever/:category/:getSlug()/index.html' ), {
		getSlug: function () {
			if ( this.slug ) {
				return slugify( this.slug, {lower: true} );
			} else {
				return slugify( this.title, {lower: true} );
			}
		}
	} ) );

app.articles( paths.srcDir );

app.option( 'renameKey', function ( key /*, view */ ) {
	key = path.relative( path.join( __dirname, './content/' ), key );
	return utils.stripExtension( key, path.extname( key ) );
} );

app.task( 'load-templates', function ( cb ) {
	app.layouts( paths.templates );
	cb();
} );

app.task( 'articles', function () {
	return app.toStream( 'articles' )
		.pipe( app.renderFile() )
		.on( 'error', console.error )
		.pipe( app.articles.permalink() )
		.pipe( app.dest( paths.buildDir ) );
} );

/**
 * Clean the output director.
 */
app.task( 'clean', function ( cb ) {
	del( paths.buildDir ).then( function () {
		cb();
	} );
} );

/**
 * Main task
 */
app.task( 'default', [
	'clean',
	'load-templates',
	'articles'
] );

module.exports = app;
