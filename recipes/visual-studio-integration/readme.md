# Visual Studio Integration

> This recipe describes how to use assemble within Visual Studio and builds upon the [browser-sync recipe](https://github.com/assemble/assemble-recipes/tree/master/recipes/browser-sync).

## Purpose of this recipe
- The primary purpose is to demonstrate using assemble with the Visual Studio IDE

### Additional examples
Additionally these topics are also demonstrated in this recipe

- Convert some .less files to a single style sheet (.css file).
- Convert some .hbs files to HTML output, using styles in the generated CSS file.
- Serve the files in the local browser automatically
- Using site metadata
- Using a default layout file
- Load handlebars-helpers
- Using bower packages
- Using a Bootstrap theme in the layout
- Defining a custom helper
- Create some watchers on
	- all .less files (`./src/assets/css` folder)
    - all .js files (`./src/assets/js` folder)
	- all content files (`./src/pages` and `./src/layouts` folders)
    - all data files (`./src/data` folder)
- In case any watcher is triggered, update the corresponding files.

## Overview

This recipe describes how you can leverage assemble within Visual Studio. Included 
in this template is an example of a simple site that is using some bower packages, 
a bootstrap example theme and some gulp plug-ins within assemble.

This recipe is not meant to be an example of best practices and it should be 
used only as reference when starting an assemble project.

## Visual Studio Extensions

To begin the following visual studio extensions must be installed.

- [Task Runner Explorer](https://visualstudiogallery.msdn.microsoft.com/8e1b4368-4afb-467a-bc13-9650572db708)
- [NPM Task Runner](https://visualstudiogallery.msdn.microsoft.com/8f2f2cbc-4da5-43ba-9de2-c9d08ade4941)


## Visual Studio Fix

By default Visual Studio uses node 0.10.x for its Task Runner Explorer. 
In order to have the task runner use a newer version of node the options 
for the External Web Tools must be changed. Specifically the order of the 
paths in which visual studio looks for web tools must be modified. This 
article describes the issue and explains the solution in detail.

[Customize external web tools in visual studio 2015](https://blogs.msdn.microsoft.com/webdev/2015/03/19/customize-external-web-tools-in-visual-studio-2015/)


## NPM Tasks Configuration

By configuring the scripts section the of the package.json in the project 
the Task Runner Explorer will display these tasks and allow the to be 
run manually using the context menu. These script definitions are simply 
examples and the scripts can be defined differently to meet projects 
requirements. 

``` json
 "scripts": {
    "build": "assemble pages",
    "rebuild": "assemble rebuild",
    "start": "assemble",
    "deploy": "assemble publish"
  }
```

## Visual Studio Event Bindings
 
Using the context menu in the Task Runner Explorer for the 
scripts defined in your package.json file 
you can bind assemble commands to Visual Studio events such as 
Project Open, Before Build, After Build and Clean. Doing so 
adds an additional section to the package.json file to hold 
the event bindings. It looks similar to the following snippet.

``` json
 "-vs-binding":{"BeforeBuild":["build"]}
```



## References

Information was used from the following resources in this recipe

* [Task Runner Explorer](https://visualstudiogallery.msdn.microsoft.com/8e1b4368-4afb-467a-bc13-9650572db708)
* [NPM Task Runner](https://visualstudiogallery.msdn.microsoft.com/8f2f2cbc-4da5-43ba-9de2-c9d08ade4941)
* [Fix Web Tools Path](https://blogs.msdn.microsoft.com/webdev/2015/03/19/customize-external-web-tools-in-visual-studio-2015/)
* [Theme](http://getbootstrap.com/examples/carousel/)
* [About Page](http://bootsnipp.com/snippets/6n1ym)
* [Contact Us](http://bootsnipp.com/snippets/featured/contact-us-page)