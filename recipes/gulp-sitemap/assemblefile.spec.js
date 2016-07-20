/*eslint no-unused-expressions:0*/
'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var path = require( 'path' );
var fs = require( 'fs' );
var chaiFs = require( 'chai-fs' );
var utils = require( './../lib/test-utils' );

chai.use( chaiFs );
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
			expect( fs.existsSync( path.join( __dirname, './wwwroot/index.html' ) ) ).to.be.true;
			expect( fs.existsSync( path.join( __dirname, './wwwroot/about.html' ) ) ).to.be.true;
			expect( fs.existsSync( path.join( __dirname, './wwwroot/contact.html' ) ) ).to.be.true;
			done();
		} );
	} );

	it( 'creates a stemap.xml file', function ( done ) {
		app.build( 'default', function ( err ) {
			expect( err ).to.not.exist;
			
			var p = path.join( __dirname, './wwwroot/sitemap.xml' );
			expect( fs.existsSync( p ) ).to.be.true;
			expect( p ).to.have.content.that.match( /urlset/ );
			done();
		} );
	} );
} );
