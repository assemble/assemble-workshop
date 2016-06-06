'use strict';
var path = require( 'path' );

module.exports = {
	buildDir: path.join( __dirname, './.build' ),
	srcDir: path.join( __dirname, './content/articles/**/*.{md,hbs}' )
}
