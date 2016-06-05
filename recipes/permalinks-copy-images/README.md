## permalinks-copy-images

This recipe follows a quite useful - though uncommon - pattern how to store content on GitHub and then use it to create static pages:

Let's assume you have the following structure on GitHub:

```bash
|── content
    |── article-1
        |── images
            | screenshot.png
            | another-image.png
        | README.md
    |── article-2
        |── images
            | screenshot.png
            | another-image.png
        | README.md
```

This pattern has some benefits:


Using now `assemble-permalinks` in combination with a `postWrite` middleware copies all files to the generated permalink-folder:

```bash
|── articles
    |── article-1-permalink
        |── images
            | screenshot.png
            | another-image.png
        | index.html
    |── article-2-permalink
        |── images
            | screenshot.png
            | another-image.png
        | index.html
```
