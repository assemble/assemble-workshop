/*eslint no-unused-expressions:0*/
'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var path = require( 'path' );
var chaiFs = require( 'chai-fs' );
var utils = require( './../lib/test-utils' );

chai.use( chaiFs );
var app = require( './index' );

describe.only( 'drafts', function () {

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
			expect( path.join( __dirname, './.build/default.md' ) ).to.have.content( 'Default' );
			expect( path.join( __dirname, './.build/draft-false.md' ) ).to.have.content( 'Draft false' );
			done();
		} );
	} );

	it( 'using custom draft-plugin: renders only non-draft files.', function ( done ) {
		app.build( 'draft-plugin', function ( err ) {
			expect( err ).to.not.exist;
			expect( path.join( __dirname, './.build/default.md' ) ).to.have.content( 'Default' );
			expect( path.join( __dirname, './.build/draft-false.md' ) ).to.have.content( 'Draft false' );
			done();
		} );
	} );
} );
