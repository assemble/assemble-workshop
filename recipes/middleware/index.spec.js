/*eslint no-unused-expressions:0*/
'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var sinonChai = require( 'sinon-chai' );
var sinon = require( 'sinon' );
var utils = require( './../lib/test-utils' );
var path = require( 'path' );

chai.use( sinonChai );

var app = require( './index' );

describe( 'middleware', function () {

	var delPath = path.join( __dirname, './.build' );
	beforeEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );
	afterEach( function ( cb ) {
		utils.clean( delPath, cb );
	} );

	it( 'events are emitted', function ( done ) {

		var spyOnLoad = sinon.spy();
		app.on( 'onLoad', spyOnLoad );

		var spyOnStream = sinon.spy();
		app.on( 'onStream', spyOnStream );

		var spyPreRender = sinon.spy();
		app.on( 'preRender', spyPreRender );

		var spyPreCompile = sinon.spy();
		app.on( 'preCompile', spyPreCompile );

		var spyPreLayout = sinon.spy();
		app.on( 'preLayout', spyPreLayout );

		var spyOnLayout = sinon.spy();
		app.on( 'onLayout', spyOnLayout );

		var spyPostLayout = sinon.spy();
		app.on( 'postLayout', spyPostLayout );

		var spyPostCompile = sinon.spy();
		app.on( 'postCompile', spyPostCompile );

		var spyPostRender = sinon.spy();
		app.on( 'postRender', spyPostRender );

		var spyOnMerge = sinon.spy();
		app.on( 'onMerge', spyOnMerge );

		app.build( 'default', function ( err ) {
			expect( err ).to.not.exist;

			//expect( spyOnLoad ).to.have.been.calledOnce;
			//expect( spyOnStream ).to.have.been.calledOnce
			//expect( spyOnLayout).to.have.been.calledOnce;
			//expect( spyPostLayout).to.have.been.calledOnce;
			//expect( spyOnMerge).to.have.been.calledOnce;

			expect( spyPreRender ).to.have.been.calledOnce;
			//expect( spyPreRender).to.have.been.calledAfter(spyOnStream);

			expect( spyPreCompile ).to.have.been.calledOnce;
			expect( spyPreCompile ).to.have.been.calledAfter( spyPreRender );

			expect( spyPreLayout ).to.have.been.calledOnce;
			expect( spyPreLayout ).to.have.been.calledAfter( spyPreCompile );

			expect( spyPostCompile ).to.have.been.calledOnce;
			expect( spyPostCompile ).to.have.been.calledAfter( spyPreLayout );

			expect( spyPostRender ).to.have.been.calledOnce;
			expect( spyPostRender ).to.have.been.calledAfter( spyPostCompile );

			done();
		} );
	} );
} );
