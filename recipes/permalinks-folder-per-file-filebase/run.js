'use strict';
var app = require( './assemblefile' );

app.build( ['default'], function ( err ) {
	if ( err ) {
		console.error( 'ERROR: ', err );
	}
} );
