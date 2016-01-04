'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var del = require( 'del' );
var path = require( 'path' );
var fs = require( 'fs' );
var chaiFs = require( 'chai-fs' );
var utils = require( './../lib/test-utils' );

chai.use( chaiFs );
var app = require( './index' );

describe( 'default-layout', function () {

	var delPath = path.join( __dirname, './.build' );
	beforeEach( function ( cb ) {
		utils.clean( delPath, cb )
	} );
	afterEach( function (cb) {
		utils.clean(delPath, cb)
	} );

	it( 'should be effective', function ( done ) {
		app.build( 'default', function ( err ) {
			expect( err ).to.not.exist;
			expect( path.join( __dirname, './.build/explicit.md' ) ).to.have.content.that.match( /This is the special layout/ );
			expect( path.join( __dirname, './.build/implicit.md' ) ).to.have.content( 'Implicit' );
			done();
		} )
	} );

} );