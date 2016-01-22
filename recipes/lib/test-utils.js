var del = require( 'del' );

function clean ( delPath, cb ) {
	del( delPath )
		.then( function () {
			cb();
		} );
}

module.exports.clean = clean;
