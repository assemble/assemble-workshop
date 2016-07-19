/*eslint no-unused-expressions:0*/
'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var path = require( 'path' );
var chaiFiles = require( 'chai-files' );
var utils = require( './../lib/test-utils' );

chai.use( chaiFiles );
var file = chaiFiles.file;
var app = require( './index' );

describe( 'Less to css', function () {

	var delPath = path.join( __dirname, './.build' );
	beforeEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );
	afterEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );

	it( 'creates a single file, merged from multiple less files', function ( done ) {
		app.build( 'css', function ( err ) {
			expect( err ).to.not.exist;
			expect( file( path.join( __dirname, './.build/css/default.css' ) ) ).to.exist;
			expect( file( path.join( __dirname, './.build/css/typography.css' ) ) ).to.not.exist;
			expect( file( path.join( __dirname, './.build/variables.css' ) ) ).to.not.exist;
			done();
		} );
	} );

	it( 'creates a single file, minifies and includes sourcemap', function ( done ) {
		app.build( 'css:optimized', function ( err ) {
			expect( err ).to.not.exist;
			var p = path.join( __dirname, './.build/css/default.css' );
			expect( file( p ) ).to.exist;
			expect( file( p ) ).to.match( /sourceMappingURL/ );
			expect( file( p ) ).to.match( /body,html\{font-family:Arial,Helvetica Neue,Helvetica,sans-serif;color:#666}h1\{color:#333}/ );

			expect( file( path.join( __dirname, './.build/css/typography.css' ) ) ).to.not.exist;
			expect( file( path.join( __dirname, './.build/variables.css' ) ) ).to.not.exist;
			done();
		} );
	} );
} );
