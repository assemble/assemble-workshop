/*eslint no-unused-expressions:0*/
'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var path = require( 'path' );
var fs = require( 'fs' );
var chaiFs = require( 'chai-fs' );
var utils = require( './../lib/test-utils' );

chai.use( chaiFs );
var app = require( './index' );

describe( 'permalinks', function () {

	var delPath = path.join( __dirname, './.build' );
	beforeEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );
	afterEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );

	it( 'should create the appropriate output', function ( done ) {
		app.build( 'default', function ( err ) {
			if ( err ) { console.error( err )};
			expect( path.join( __dirname, './.build/whatever/articles/article-1-updated-slug/index.html' ) ).to.be.a.file();
			expect( path.join( __dirname, './.build/whatever/articles/article-2/index.html' ) ).to.be.a.file();
			expect( path.join( __dirname, './.build/whatever/posts/post-1/index.html' ) ).to.be.a.file();
			done();
		} );
	} );

} );
