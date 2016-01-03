'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var del = require( 'del' );
var path = require( 'path' );
var fs = require('fs');
var chaiFs = require( 'chai-fs' );
var utils = require( './../lib/test-utils');

chai.use( chaiFs );
var app = require( './index' );

describe( 'Middleware', function () {
	it( 'renders', function ( done ) {
		app.build('default', function ( err ) {
			expect(err ).to.not.exist;
			done();
		});
	} );
});