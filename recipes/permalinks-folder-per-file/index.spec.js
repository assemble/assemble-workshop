/*eslint no-unused-expressions:0*/
'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var path = require( 'path' );
var chaiFs = require( 'chai-fs' );
var utils = require( './../lib/test-utils' );

chai.use( chaiFs );
var app = require( './index' );

describe( 'permalinks-folder-per-file', function () {

	var delPath = path.join( __dirname, './.build' );
	beforeEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );
	afterEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );

	it( 'should create a folder per file', function ( done ) {
		app.build( ['default'], function ( err ) {

			if ( err ) { console.error( err );}

			expect( path.join( __dirname, './.build/y/index.html' ) ).to.be.a.file();
			expect( path.join( __dirname, './.build/z/index.html' ) ).to.be.a.file();

			expect( path.join( __dirname, './.build/folder-1/a/index.html' ) ).to.be.a.file();
			expect( path.join( __dirname, './.build/folder-1/folder-1-1/c/index.html' ) ).to.be.a.file();
			expect( path.join( __dirname, './.build/folder-1/folder-1-1/d/index.html' ) ).to.be.a.file();

			expect( path.join( __dirname, './.build/folder-2/b/index.html' ) ).to.be.a.file();

			done();
		} );
	} );

} );
