module.exports = function ( context ) {
	console.log( '------------------------------------------------------' );
	console.info( 'ARGUMENTS:' );
	console.log( arguments );
	console.log( '------------------------------------------------------' );
	console.info( 'CONTEXT:' );
	console.log( context );      // the object passed to the helper
	console.log( '------------------------------------------------------' );
	console.info( 'CONTEXT.HASH:' );
	console.log( context.hash ); // hash arguments, like `foo='bar'`
	console.log( '------------------------------------------------------' );
	console.info( 'THIS:' );
	console.log( this );         // handlebars context
	console.log( '------------------------------------------------------' );
	console.info( 'THIS.OPTIONS:' );
	console.log( this.options ); // assemble `options`
	console.log( '------------------------------------------------------' );
	console.info( 'THIS.CONTEXT:' );
	console.log( this.context ); // context of the current 'view'
	console.log( '------------------------------------------------------' );
	console.info( 'THIS.APP:' );
	console.log( this.app );     // assemble instance
};
