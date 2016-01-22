# Less to CSS

> Convert your .less files to .css files using assemble and several Gulp plugins.

## Convert from .less to .css

The beauty of assemble is that you can use any Gulp plugin. So converting .less files to .css files is pretty easy using [gulp-less](https://www.npmjs.com/package/gulp-less):

```js
var assemble = require( 'assemble' );
var less = require( 'gulp-less' );
var path = require( 'path' );

var app = assemble();

app.task( 'css', function () {
	return app.src( './less/default.less' )
		.pipe( less() )
		.pipe( app.dest( './.build/css' ) );
} );

module.exports = app;
```

## Minification & Source Maps

Based on the logic from above, let's use another two Gulp plugins to minify the css ([gulp-cssnano](https://www.npmjs.com/package/gulp-cssnano)) and to add source map support ([gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)):

```js
var assemble = require( 'assemble' );
var less = require( 'gulp-less' );
var path = require( 'path' );
var nano = require( 'gulp-cssnano' );
var sourceMaps = require( 'gulp-sourcemaps' );

var app = assemble();

app.task( 'css:optimized', function () {

	var lessOptions = {};
	var nanoOptions = {};

	return app.src( './less/default.less' )
		.pipe( sourceMaps.init() )
		.pipe( less( lessOptions ) )
		.pipe( nano( nanoOptions ) )
		.pipe( sourceMaps.write() )
		.pipe( app.dest( './.build/css' ) );
} );

module.exports = app;

```
