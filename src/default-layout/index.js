'use strict';
var assemble = require( 'assemble' );
var path = require('path');

var app = assemble();

app.option('layout', 'the-special-one');
app.preLayout( /./, function ( view, next ) {
	// if the layout is not defined, use the default one ...
	if (!view.layout && app.options.layout) {
		view.layout = app.options.layout;
	}
	next();
} );

app.task('init', function ( cb ) {
	app.helper('markdown', require('helper-markdown'));
	app.layouts( path.join( __dirname, './templates/layouts/**/*.hbs'));
	cb();
});

app.task('default', ['init'], function () {
	return app.pages.src( path.join(__dirname, './content/**/*.{md,hbs}'))
		.pipe( app.renderFile() )
		.pipe(app.dest( path.join(__dirname, './.build')))
});

module.exports = app;

