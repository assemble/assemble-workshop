## Permalinks - Folder per file

Recipe to showcase how to use `assemble-permalinks` to create a folder per file (based on the underlying folder-structure):

### Source

```
|── content
    |── folder-1
        |── folder-1-1
            | c.md
            | d.md
        | a.md
    |── folder-2
        | b.md
    | y.md
    | z.md
```

### Result

```js
|── content
	|── folder-1
        |── a
            | index.html
            |── folder-1-1
                |── c
                    | index.html
                |── d
                    | index.html
    |── folder-2
        |── b
            | index.html
    |── y
        | index.html
    |── z
        | index.html
        
```

### Code

```js

```'use strict';
   var assemble = require( 'assemble' );
   var path = require( 'path' );
   var permalinks = require( 'assemble-permalinks' );
   
   var paths = {
   	buildDir: path.join( __dirname, './.build' ),
   	srcDir: path.join( __dirname, './content/**/*.{md,hbs}' )
   };
   
   var app = assemble();
   
   app.create( 'articles' )
   	.use( permalinks( path.join( paths.buildDir, ':getQualifiedName()/index.html' ), {
   		getQualifiedName: function () {
   			var relPath = path.relative( this.base, this.dirname );
   			return path.join( relPath, this.name );
   		}
   	} ) );
   
   app.articles( paths.srcDir );
   
   app.task( 'articles', function () {
   	return app.toStream( 'articles' )
   		.pipe( app.renderFile() )
   		.on( 'error', console.error )
   		.pipe( app.articles.permalink() )
   		.on( 'error', console.error )
   		.pipe( app.dest( paths.buildDir ) )
   		.on( 'error', console.error );
   } );
   
   app.task( 'default', [
   	'articles'
   ] );
   
   module.exports = app;

