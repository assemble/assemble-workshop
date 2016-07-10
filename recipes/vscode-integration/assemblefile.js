'use strict';
var assemble = require( 'assemble' );

var app = assemble();

app.task( 'default', ['build'], function ( cb ) {
	console.log( 'default task...' );
	cb();
} );

app.task( 'start', function () {
	console.log( 'Here is where you could do some browsersync stuff...' );
} );

app.task( 'build', function ( cb ) {
	console.log( 'building...' );
	cb();
} );

app.task( 'publish', function ( cb ) {
	console.log( 'publishing...' );
	cb();
} );

module.exports = app;
