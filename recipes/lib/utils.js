'use strict';
var path = require( 'path' );

module.exports = {
	stripExtension: function ( filepath, ext ) {
		ext = ext || path.extname( filepath );
		var r = filepath.slice( 0, filepath.length - ext.length );
		console.log(r);
		return r;
	}
};
