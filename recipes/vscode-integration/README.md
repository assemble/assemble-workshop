## Default layout

> This recipe demonstrates how to wire assemble to VS Code.

**Set up some tasks in your `assemblefile.js`**

These are just placeholder tasks for demonstration purposes.

```js

'use strict';
var assemble = require( 'assemble' );

var app = assemble();

app.task('default', ['build'], function (cb) {
    console.log('default task...');
    cb();
});

app.task( 'start', function () {
	console.log("Here is where you could do some browsersync stuff...");
});

app.task('build', function (cb) {
    console.log('building...');
    cb();
});

app.task('publish', function (cb) {
    console.log('publishing...');
    cb();
});

module.exports = app;

```

**Defining the VS Code Commands:**

To enable the ability to launch these tasks from the VS Code command palette 
you will need to configure the task runner. The easiest way to do this is to 
select `Configure Task Runner` from the command palette.

```json
{
    "version": "0.1.0",
    "command": "assemble",
    "isShellCommand": true,
    "args": [],
    "showOutput": "always",
    "tasks": [
        {
            "taskName": "build",
            "args": [],
            "isBuildCommand": true,
            "isWatching": false
        },
        {
            "taskName": "start",
            "args": [],
            "isBuildCommand": false,
            "isWatching": true
        },
        {
            "taskName": "publish",
            "args": [],
            "isBuildCommand": false,
            "isWatching": false
        }
    ]
}
```

With this `tasks.json` added to the .vscode folder, the `build`, `start` and `publish` will be available from the command palette.

More detailed information on VS Code tasks can be found in this article: [Integrate with External Tools via Tasks](http://code.visualstudio.com/docs/editor/tasks)




