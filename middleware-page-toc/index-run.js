'use strict';
var app = require( './index' );

app.build(['default'], function ( err, results ) {
	if (err) console.error( 'ERROR: ', err);
});