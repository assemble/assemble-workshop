## Middleware events

Events where you can hook into to create middleware logic.

- preLayout
- onLoad
- preCompile
- postCompile
- preRender
- postRender

Example for a middleware to set the layout (if not already defined in the front matter):

```js
app.preLayout( /./, function ( view, next ) {
	// if the layout is not defined, set it to a specific one ...
	if ( !view.layout ) {
		view.layout = 'whatever-layout';
	}
	next();
} );
```