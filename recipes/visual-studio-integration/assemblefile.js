'use strict';

var assemble = require('assemble');
var path = require('path');
var less = require('gulp-less');
var ext = require('gulp-ext');
var watch = require('base-watch');
var browserSync = require('browser-sync').create();
var app = assemble();

app.use(watch());
app.option('layout', 'default');
app.data("src/data/**/*.json");

//use some middleware to set the default layout if not explicitly defined in the current document:
app.preLayout(/./, function (view, next) {
    // if the layout is not defined, use the default one ...
    if (!view.layout && app.options.layout) {
        view.layout = app.options.layout;
    }
    next();
});

app.task('init', function (cb) {
    //setup assemble

    app.helpers('node_modules/handlebars-helpers/lib');

    app.helper('isActive', function (title) {
        //custom helper to mark 'current page' as active in bootstrap menu
        if (this.context.title == title)
            return "class=\"active\"";
        else
            return;
    });

    app.layouts(path.join(__dirname, 'src/layouts/**/*.hbs'));
    cb();
});

app.task('default', ['pages', 'assets', 'serve'], function () {
    // placeholder to recompile entire site, start watching and spin up browsersync...
});

app.task('rebuild', ['pages', 'assets'], function () {
    //placeholder to rebuild entire site
});

app.task('pages', ['init'], function () {
    return app.src('src/pages/**/*.hbs', { layout: 'default' })
            .pipe(app.renderFile())
            .pipe(ext.replace('html'))
            .pipe(app.dest('wwwroot'))
            .pipe(browserSync.stream());
});

app.task('assets', ['js', 'css', 'bower'], function () {
    return app.src('src/assets/**/*.{css, png, jpg, js}')
        .pipe(app.dest('wwwroot/assets/'));
});

app.task('css', function () {
    return app.src('src/assets/**/*.less')
        .pipe(less())
        .pipe(ext.replace("css"))
        .pipe(app.dest('wwwroot/assets/'))
        .pipe(browserSync.stream());
});

app.task('js', function () {
    return app.src('src/assets/**/*.js')
        .pipe(app.dest('wwwroot/assets/'));
});

app.task('bower', function () {
    //copy the files we need from their bower packages
    app.src(['bower_components/jquery/dist/jquery.min.js'])
       .pipe(app.dest('wwwroot/assets/js'));

    return app.src(['bower_components/bootstrap/dist/**/*.{min.js,min.css,ttf,svg,woff,eot,woff2}'])
       .pipe(app.dest('wwwroot/assets/'));
});

app.task('serve', ['watch'], function () {
    browserSync.init({
        port: 8080,
        startPath: 'index.html',
        server: {
            baseDir: './wwwroot'
        }
    })
});

app.task('watch', function (cb) {
    //watch for changes and run tasks for those file types.
    app.watch('src/**/*.hbs', ['pages']);
    app.watch('src/data/**/*.json', ['pages']);
    app.watch('src/assets/**/*.less', ['css']);
    app.watch('src/assets/**/*.js', ['js']);
    cb();
});

app.task('publish', function (cb) {
    //here is where you could place code to publish the site
    console.log('deploying..');
    cb();
});

module.exports = app;