'use strict';
var del = require('del');
var path = require('path');

function clean( delPath, cb ) {
	del( delPath )
		.then( function () {
			cb();
		} );
}

module.exports.clean = clean;