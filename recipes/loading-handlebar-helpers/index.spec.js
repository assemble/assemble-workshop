/*eslint no-unused-expressions:0*/
var chai = require( 'chai' );
var expect = chai.expect;
var chaiFs = require( 'chai-fs' );
var path = require( 'path' );
var del = require( 'del' );

chai.use( chaiFs );
var app = require( './index' );

describe.only( 'Helper', function () {

	after( function ( done ) {
		del( path.join( __dirname, './.build' ))
			.then( function () {
				done();
			} );
		//done();
	} );

	it( '<test> should resolve properly', function ( done ) {
		app.build( 'default', function ( err ) {
			expect( err ).to.not.exist;
			expect( path.join( __dirname, './.build/test.md' ) ).to.have.content.that.match( /This is a test/ );
			done();
		} );
	} );

	it( '<if_q> should resolve properly if condition is true', function ( done ) {
		app.build( 'default', function ( err ) {
			expect( err ).to.not.exist;
			expect( path.join( __dirname, './.build/if_eq.md' ) ).to.have.content.that.match( /a==a/ );
			done();
		} );
	} );

	it( '<if_q> should resolve properly if condition is false', function ( done ) {
		app.build( 'default', function ( err ) {
			expect( err ).to.not.exist;
			expect( path.join( __dirname, './.build/if_eq_false.md' ) ).to.have.content.that.match( /a!=b/ );
			done();
		} );
	} );

} );
