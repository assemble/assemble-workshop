'use strict';
var assemble = require( 'assemble' );
var path = require( 'path' );
var gulpDrafts = require( 'gulp-drafts' );
var pluginDrafts = require( './plugins/drafts' );
var app = assemble();

var paths = {
	srcDir: path.join( __dirname, './content/**/*.{md,hbs}' ),
	buildDir: path.join( __dirname, './.build' )
};

app.pages( paths.srcDir );

app.task( 'gulp-draft', function () {
	return app.pages.toStream()
		.on( 'err', console.error )
		.pipe( gulpDrafts() )
		.pipe( app.renderFile() )
		.on( 'err', console.error )
		.pipe( app.dest( paths.buildDir ) );
} );

app.task( 'draft-plugin', function () {

	app.use( pluginDrafts( 'pages' ) );

	return app.pages.toStream()
		.on( 'error', console.error )
		.pipe( app.renderFile() )
		.on( 'error', console.error )
		.pipe( app.dest( paths.buildDir ) );

} );

module.exports = app;
