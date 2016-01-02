'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var del = require( 'del' );
var path = require( 'path' );
var chaiFs = require( 'chai-fs' );

chai.use( chaiFs );
var app = require( './index' );

describe( 'Collection Basic', function () {

	function clean ( cb ) {
		return del( path.join( __dirname, '.build' ) )
			.then( function () {
				cb();
			} )
	}

	beforeEach( clean );
	//afterEach( clean );

	describe( 'Run assemble', function () {

		it( 'should succeed', function ( done ) {
			app.build( 'default', function ( err, results ) {
				expect( err ).to.not.exist;
				done();
			} )
		} );

	} );

} );