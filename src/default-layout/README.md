## Default layout

> This recipe demonstrates how to define or force a default layout.

**Setting the layout manually:**

The layout for each document can be set in the front matter yml:

```
---
title: Some amazing title
layout: whatever-layout
---
```

**Defining a default layout:**

If you want to define a default layout for the entire app, first set the global option `layout`:

```
app.option('layout', 'whatever-layout');
```

Then use some middleware to set the default layout if not explicitly defined in the current document:

```js
app.preLayout( /./, function ( view, next ) {
	// if the layout is not defined, use the default one ...
	if (!view.layout && app.options.layout) {
    	view.layout = app.options.layout;
  	}
  	next();
} );
```





