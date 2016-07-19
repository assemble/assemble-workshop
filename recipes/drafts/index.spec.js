/*eslint no-unused-expressions:0*/
'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var path = require( 'path' );
var chaiFiles = require( 'chai-files' );
var utils = require( './../lib/test-utils' );

chai.use( chaiFiles );
var file = chaiFiles.file;
var app = require( './index' );

describe( 'drafts', function () {

	var delPath = path.join( __dirname, './.build' );
	beforeEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );
	afterEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );

	it( 'using gulp-drafts: renders only non-draft files.', function ( done ) {
		app.build( 'gulp-draft', function ( err ) {
			expect( err ).to.not.exist;
			expect( file( path.join( __dirname, './.build/default.md' ) ) ).to.contain( 'Default' );
			expect( file( path.join( __dirname, './.build/draft-false.md' ) ) ).to.contain( 'Draft false' );
			done();
		} );
	} );

	it( 'using custom draft-plugin: renders only non-draft files.', function ( done ) {
		app.build( 'draft-plugin', function ( err ) {
			expect( err ).to.not.exist;
			expect( file( path.join( __dirname, './.build/default.md' ) ) ).to.contain( 'Default' );
			expect( file( path.join( __dirname, './.build/draft-false.md' ) ) ).to.contain( 'Draft false' );
			done();
		} );
	} );
} );
