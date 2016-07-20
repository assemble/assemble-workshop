/*eslint no-unused-expressions:0*/
'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var path = require( 'path' );
var chaiFiles = require( 'chai-files' );
var utils = require( './../lib/test-utils' );

chai.use( chaiFiles );
var file = chaiFiles.file;
var app = require( './assemblefile' );

describe( 'permalinks-folder-per-file-filebase', function () {

	var delPath = path.join( __dirname, './.build' );
	beforeEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );
	afterEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );

	it( 'should create a folder (+ index.html) per file', function ( done ) {
		app.build( ['default'], function ( err ) {

			if ( err ) { console.error( err );}

			expect( file( path.join( __dirname, './.build/articles/foo/index.html' ) ) ).to.exist;
			expect( file( path.join( __dirname, './.build/articles/bar/index.html' ) ) ).to.exist;
			expect( file( path.join( __dirname, './.build/articles/baz/index.html' ) ) ).to.exist;

			done();
		} );
	} );

} );
