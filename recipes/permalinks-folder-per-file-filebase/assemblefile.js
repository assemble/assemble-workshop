'use strict';
var assemble = require( 'assemble' );
var path = require( 'path' );
var plugin = require( './src/plugins' );

var paths = {
	buildDir: path.join( __dirname, './.build/articles' ),
	srcDir: path.join( __dirname, './content/articles/**/*.{md,hbs}' )
};

var app = assemble();

app.create( 'articles' )
	.use( plugin.permalinks( path.join( paths.buildDir, ':name/index.html' ) ) );

app.articles( paths.srcDir );

app.task( 'articles', function () {
	return app.toStream( 'articles' )
		.pipe( app.renderFile() )
		.on( 'error', console.error )
		.pipe( app.articles.permalink() )
		.on( 'error', console.error )
		.pipe( app.dest( function ( file ) {
			file.base = paths.buildDir;
			return paths.buildDir;
		} ) )
		.on( 'error', console.error );
} );

app.task( 'default', [
	'articles'
] );

module.exports = app;
