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

describe( 'permalinks-folder-structure', function () {

	var delPath = path.join( __dirname, './.build' );
	beforeEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );
	afterEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );

	it( 'should create the appropriate output', function ( done ) {
		app.build( 'default', function ( err ) {

			if ( err ) { console.error( err );}

			expect( file( path.join( __dirname, './.build/whatever/articles/article-1/index.html' ) ) ).to.exist;
			expect( file( path.join( __dirname, './.build/whatever/articles/article-1/images/article-1.png' ) ) ).to.exist;
			expect( file( path.join( __dirname, './.build/whatever/articles/article-1/images/dot.png' ) ) ).to.exist;

			expect( file( path.join( __dirname, './.build/whatever/articles/article-2/index.html' ) ) ).to.exist;
			expect( file( path.join( __dirname, './.build/whatever/articles/article-2/images/article-2.png' ) ) ).to.exist;
			expect( file( path.join( __dirname, './.build/whatever/articles/article-2/images/dot.png' ) ) ).to.exist;

			expect( file( path.join( __dirname, './.build/whatever/posts/post-1/index.html' ) ) ).to.exist;
			expect( file( path.join( __dirname, './.build/whatever/posts/post-1/images/post-1.png' ) ) ).to.exist;
			expect( file( path.join( __dirname, './.build/whatever/posts/post-1/images/dot.png' ) ) ).to.exist;

			expect( file( path.join( __dirname, './.build/whatever/posts/post-2/index.html' ) ) ).to.exist;
			expect( file( path.join( __dirname, './.build/whatever/posts/post-2/images/post-2.png' ) ) ).to.exist;
			expect( file( path.join( __dirname, './.build/whatever/posts/post-2/images/dot.png' ) ) ).to.exist;

			done();
		} );
	} );

} );
