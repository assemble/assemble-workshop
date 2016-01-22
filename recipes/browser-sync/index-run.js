var app = require( './index' );

app.build( 'default', function ( err ) {
	if ( err ) {
		console.error( 'ERROR', err );
	}
} );
