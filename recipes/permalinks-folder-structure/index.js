'use strict';
var assemble = require( 'assemble' );
var path = require( 'path' );

var app = assemble();
var paths = {
	templates: path.join( __dirname, './templates/layouts/**/*.hbs' ),
	articleDir: path.join( __dirname, './content/**/*.{md,hbs}' ),
	buildDir: path.join( __dirname, './.build' )
};

app.task( 'init', function ( cb ) {
	app.layouts( path.templates );
	cb();
} );

app.create( 'articles' );
app.articles( paths.articleDir );

app.task( 'articles', function () {
	return app.toStream( 'articles' )
		.pipe( app.renderFile() )
		.on( 'error', console.error )
		.pipe( app.dest( paths.buildDir ) );
} );

app.task( 'default', ['init', 'articles']);

module.exports = app;
