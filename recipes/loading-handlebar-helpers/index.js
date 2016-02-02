var assemble = require( 'assemble' );
var path = require( 'path' );

var app = assemble();

app.helpers( path.join(__dirname, './helpers/*.js'));

app.task( 'default', function () {
	return app.pages.src( path.join( __dirname, './content/**/*.{md,hbs}' ) )
		.pipe( app.renderFile() )
		.pipe( app.dest( path.join( __dirname, './.build' ) ) );
} );

module.exports = app;

