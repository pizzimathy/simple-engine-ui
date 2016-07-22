# simple-engine-ui
This is the ui component of `simple-engine`.

### installation
`$ bower install simple-engine-ui` or [download](https://github.com/apizzimenti/simple-engine-ui/archive/master.zip).

### usage
There are two ways to use `simple-engine-ui`. The only requirements are that
`simple-engine-ui.js` and `simple-engine-ui.css` are included in the html document.
If using `grunt-wiredep`, both the `js` and `css` files are main files, so they will be
included.

1. use the built-in angular directive


    <html>
        <head>
            <link href="path/to/simple-engine-ui.css" rel="stylesheet" type="text/css">
        </head>
        <body>
            <script href="path/to/simple-engine-ui.js"></script>
            
            <span ng-app="simple-engine">
                <game></game>
            </span>
        </body>
    </html>
    
You can include the `ng-app` attribute anywhere.
    
2. create normal `div` and include anywhere in your javascript.


    // index.js
    
    var window = new GameWindow(simpleDom);
    
    // some HTML file
    
    <html>
        <head>
            <link href="path/to/simple-engine-ui.css" rel="stylesheet" type="text/css">
        </head>
        <body>
            <script href="path/to/simple-engine-ui.js"></script>
            <script href="index.js"></script>
            
            <div id="simple-engine"></div>
        </body>
    </html>
    
`simple-engine` will do the rest of the work.