/*eslint no-unused-expressions:0*/
'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var sinon = require( 'sinon' );

var app = require( './index' );

describe( 'middleware', function () {
	it( 'events are emitted', function ( done ) {

		var spyPreRender = sinon.spy();
		app.on( 'preRender', spyPreRender );

		var spyPreCompile = sinon.spy();
		app.on( 'preCompile', spyPreCompile );

		var spyPreLayout = sinon.spy();
		app.on( 'preLayout', spyPreLayout );

		var spyPostCompile = sinon.spy();
		app.on( 'postCompile', spyPostCompile );

		var spyPostRender = sinon.spy();
		app.on( 'postRender', spyPostRender );

		app.build( 'default', function ( err ) {
			expect( err ).to.not.exist;

			sinon.assert.calledTwice( spyPreRender );
			sinon.assert.calledTwice( spyPreCompile );
			sinon.assert.calledTwice( spyPreLayout );
			sinon.assert.calledTwice( spyPostCompile );
			sinon.assert.calledTwice( spyPostRender );
			done();
		} );
	} );
} );
