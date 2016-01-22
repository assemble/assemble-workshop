/*eslint no-unused-expressions:0*/
var chai = require( 'chai' );
var expect = chai.expect;
var path = require( 'path' );
var fs = require( 'fs' );
var chaiFs = require( 'chai-fs' );
var utils = require( './../lib/test-utils' );

chai.use( chaiFs );
var app = require( './index' );

describe( 'Less to css', function () {

	var delPath = path.join( __dirname, './.build' );
	beforeEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );
	afterEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );

	it( 'creates a single file, merged from multiple less files', function ( done ) {
		app.build( 'css', function ( err ) {
			expect( err ).to.not.exist;
			expect( fs.existsSync( path.join( __dirname, './.build/css/default.css' ) ) ).to.be.true;
			expect( fs.existsSync( path.join( __dirname, './.build/css/typography.css' ) ) ).to.be.false;
			expect( fs.existsSync( path.join( __dirname, './.build/variables.css' ) ) ).to.be.false;
			done();
		} );
	} );

	it( 'creates a single file, minifies and includes sourcemap', function ( done ) {
		app.build( 'css:optimized', function ( err ) {
			expect( err ).to.not.exist;
			var p = path.join( __dirname, './.build/css/default.css' );
			expect( fs.existsSync( p ) ).to.be.true;
			expect( p ).to.have.content.that.match( /sourceMappingURL/ );
			expect( p ).to.have.content.that.match( /body,html\{font-family:Arial,Helvetica Neue,Helvetica,sans-serif;color:#666}h1\{color:#333}/ );

			expect( fs.existsSync( path.join( __dirname, './.build/css/typography.css' ) ) ).to.be.false;
			expect( fs.existsSync( path.join( __dirname, './.build/variables.css' ) ) ).to.be.false;
			done();
		} );
	} );
} );
