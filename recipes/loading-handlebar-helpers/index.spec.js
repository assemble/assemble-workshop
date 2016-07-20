/*eslint no-unused-expressions:0*/
'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var chaiFiles = require( 'chai-files' );
var path = require( 'path' );
var del = require( 'del' );

chai.use( chaiFiles );
var file = chaiFiles.file;
var app = require( './index' );

describe( 'Helper', function () {

	after( function ( done ) {
		del( path.join( __dirname, './.build' ) )
			.then( function () {
				done();
			} );
		//done();
	} );

	it( '<test> should resolve properly', function ( done ) {
		app.build( 'default', function ( err ) {
			expect( err ).to.not.exist;
			expect( file( path.join( __dirname, './.build/test.md' ) ) ).to.match( /This is a test/ );
			done();
		} );
	} );

	it( '<if_q> should resolve properly if condition is true', function ( done ) {
		app.build( 'default', function ( err ) {
			expect( err ).to.not.exist;
			expect( file( path.join( __dirname, './.build/if_eq.md' ) ) ).to.match( /a==a/ );
			done();
		} );
	} );

	it( '<if_q> should resolve properly if condition is false', function ( done ) {
		app.build( 'default', function ( err ) {
			expect( err ).to.not.exist;
			expect( file( path.join( __dirname, './.build/if_eq_false.md' ) ) ).to.match( /a!=b/ );
			done();
		} );
	} );

} );
