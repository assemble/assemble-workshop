/*eslint no-unused-expressions:0*/
'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var path = require( 'path' );
var chaiFiles = require( 'chai-files' );
var utils = require( './../lib/test-utils' );

chai.use( chaiFiles );
var file = chaiFiles.file;
var app = require( './assemblefile' );

describe( 'Gulp-sitemap using Assemble', function () {

	var delPath = path.join( __dirname, './wwwroot' );
	beforeEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );
	afterEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );

	it( 'creates a three html files from hbs files in src/pages', function ( done ) {
		app.build( 'pages', function ( err ) {
			expect( err ).to.not.exist;
			expect( file ( path.join( __dirname, './wwwroot/index.html' ) ) ).to.exist;
			expect( file ( path.join( __dirname, './wwwroot/about.html' ) ) ).to.exist;
			expect( file ( path.join( __dirname, './wwwroot/contact.html' ) ) ).to.exist
			done();
		} );
	} );

	it( 'creates a stemap.xml file', function ( done ) {
		app.build( 'default', function ( err ) {
			expect( err ).to.not.exist;
			
			var p = path.join( __dirname, './wwwroot/sitemap.xml' );
			expect( file ( p ) ).to.exist;
			expect( file ( p ) ).to.match( /urlset/ );
			done();
		} );
	} );
} );
