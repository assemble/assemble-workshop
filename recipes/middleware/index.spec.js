/*eslint no-unused-expressions:0*/
var chai = require( 'chai' );
var expect = chai.expect;
var chaiFs = require( 'chai-fs' );

chai.use( chaiFs );
var app = require( './index' );

describe( 'Middleware', function () {
	it( 'renders', function ( done ) {
		app.build( 'default', function ( err ) {
			expect( err ).to.not.exist;
			done();
		} );
	} );
} );
