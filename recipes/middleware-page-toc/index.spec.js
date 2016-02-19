/*eslint no-unused-expressions:0*/
'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var path = require( 'path' );
var chaiFs = require( 'chai-fs' );
var utils = require( './../lib/test-utils' );

chai.use( chaiFs );
var app = require( './index' );

describe( 'Plugin Page-TOC', function () {

	var delPath = path.join( __dirname, './.build' );
	beforeEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );
	afterEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );

	it( 'should succeed', function ( done ) {
		app.build( 'default', function ( err ) {
			expect( err ).to.not.exist;
			expect( app.pages.getView( path.join( __dirname, './content/article-1.md' ) ) ).to.exist;
			expect( app.pages.getView( path.join( __dirname, './content/article-1.md' ) ).data ).to.have.property( 'toc' );
			expect( app.pages.getView( path.join( __dirname, './content/article-1.md' ) ).data.toc[0] ).to.have.property( 'slug' );
			done();
		} );
	} );
} );
