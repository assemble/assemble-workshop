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

describe( 'Drafts', function () {

	var delPath = path.join( __dirname, './.build' );
	beforeEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );
	afterEach( function ( cb ) {
		//utils.clean( delPath, cb );
		cb();
	} );

	it( 'should succeed', function ( done ) {
		app.build( 'default', function ( err ) {
			expect( err ).to.not.exist;
			expect( path.join( __dirname, './.build/default.md' ) ).to.have.content( 'Default' );
			expect( path.join( __dirname, './.build/draft-false.md' ) ).to.have.content( 'Draft false' );
			done();
		} );
	} );
} );
