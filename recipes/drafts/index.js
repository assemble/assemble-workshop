'use strict';
var assemble = require( 'assemble' );
var path = require( 'path' );
var drafts = require( 'gulp-drafts' );
var app = assemble();

var paths = {
	srcDir: path.join( __dirname, './content/**/*.{md,hbs}' ),
	buildDir: path.join( __dirname, './.build' )
};

app.pages( paths.srcDir );

app.task( 'gulp-draft', function () {
	return app.pages.toStream()
		.on( 'err', console.error )
		.pipe( drafts() )
		.pipe( app.renderFile() )
		.on( 'err', console.error )
		.pipe( app.dest( paths.buildDir ) );
} );

module.exports = app;
