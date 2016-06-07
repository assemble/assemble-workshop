/*eslint no-unused-expressions:0*/
'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var path = require( 'path' );
var chaiFs = require( 'chai-fs' );
var utils = require( './../lib/test-utils' );

chai.use( chaiFs );
var app = require( './assemblefile' );

describe.only( 'issue-permalinks-folders', function () {

	var delPath = path.join( __dirname, './.build' );
	beforeEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );
	afterEach( function ( cb ) {
		//utils.clean( delPath, cb );
		cb();
	} );

	it( 'should create a folder per file', function ( done ) {
		app.build( ['default'], function ( err ) {

			if ( err ) { console.error( err );}

			expect( path.join( __dirname, './.build/articles/foo/index.html' ) ).to.be.a.file();

			done();
		} );
	} );

} );
