'use strict';
/**
 * Expose `plugin`.
 */

/**
 * Assemble plugin to remove files marked as `draft` from a collection.
 *
 * @return {Function}
 */
module.exports = function plugin ( name ) {
	return function ( app ) {
		var files = app.getViews( name );
		for ( var file in files ) {
			if ( files[file].data.draft ) {
				delete files[file];
			}
		}
	};
};
