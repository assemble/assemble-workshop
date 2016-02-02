module.exports = function if_q ( a, b, opts ) {

	if ( a == b ) {
		return opts.fn( this );
	} else {
		return opts.inverse( this );
	}

};
