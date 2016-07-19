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

describe( 'default-layout', function () {

	var delPath = path.join( __dirname, './.build' );
	beforeEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );
	afterEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );

	it( 'should be effective', function ( done ) {
		app.build( 'default', function ( err ) {
			expect( err ).to.not.exist;
			expect( file( path.join( __dirname, './.build/explicit.md' ) ) ).to.match( /This is the special layout/ );
			expect( file( path.join( __dirname, './.build/implicit.md' ) ) ).to.match( /This is the special layout/ );
			done();
		} );
	} );
} );
