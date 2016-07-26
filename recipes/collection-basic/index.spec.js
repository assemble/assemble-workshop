/*global require*/
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

describe( 'Collection Basic', function () {

	var delPath = path.join( __dirname, './.build' );

	beforeEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );

	afterEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );

	it( 'should succeed', function ( done ) {
		app.build( ['default'], function ( err ) {

			expect( err ).to.not.exist;

			var filePath = path.join( __dirname, './.build/article-1.html' );
			expect( file( filePath ) ).to.exist;
			expect( file( filePath ) ).to.contain( 'This is the abstract of article 1' );

			filePath = path.join( __dirname, './.build/article-2.html' );
			expect( file( filePath ) ).to.exist;

			filePath = path.join( __dirname, './.build/page-1.html' );
			expect( file( filePath ) ).to.exist;

			filePath = path.join( __dirname, './.build/page-2.html' );
			expect( file( filePath ) ).to.exist;

			// Just a negative test to ensure that assertion works correctly.
			expect( file( path.join( __dirname, './.build/page-3.html' ) ) ).to.not.exist;
			done();
		} );
	} );
} );
