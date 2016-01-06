/*eslint no-unused-expressions:0*/
var chai = require( 'chai' );
var expect = chai.expect;
var path = require( 'path' );
var fs = require( 'fs' );
var chaiFs = require( 'chai-fs' );
var utils = require( './../lib/test-utils' );

chai.use( chaiFs );
var app = require( './index' );

describe( 'Collection Basic', function () {

	var delPath = path.join( __dirname, './.build' );
	beforeEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );
	afterEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );

	it( 'should succeed', function ( done ) {
		app.build( ['default'], function ( err ) {
			expect( err ).to.not.exist;

			var filePath = path.join( __dirname, './.build/article-1.html' );
			expect( fs.existsSync( filePath ) ).to.be.true;
			expect( filePath ).to.have.content.that.match( /This is the abstract of article 2/ );
			expect( filePath ).to.have.content.that.match( /This is the abstract of page 2/ );

			filePath = path.join( __dirname, './.build/article-2.html' );
			expect( fs.existsSync( filePath ) ).to.be.true;

			filePath = path.join( __dirname, './.build/page-1.html' );
			expect( fs.existsSync( filePath ) ).to.be.true;

			filePath = path.join( __dirname, './.build/page-2.html' );
			expect( fs.existsSync( filePath ) ).to.be.true;

			// Just a negative test to ensure that assertion works correctly.
			filePath = path.join( __dirname, './.build/page-3.html' );
			expect( fs.existsSync( path.join( __dirname, './.build/page-3.html' ) ) ).to.be.false;
			done();
		} );
	} );
} );
