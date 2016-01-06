var assemble = require( 'assemble' );
var path = require( 'path' );
var drafts = require( 'gulp-drafts' );
var app = assemble();

app.pages.src( path.join( __dirname, './content/**/*.{md,hbs}' ) );

app.task( 'default', function () {
	return app.pages.toStream()
		.on( 'err', console.error )
		.pipe( drafts() )
		.pipe( app.renderFile() )
		.on( 'err', console.error )
		.pipe( app.dest( path.join( __dirname, './.build' ) ) );
} );

module.exports = app;
