
module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        
        app: {
            scripts: [
                "lib/scripts/**/*.js",
            ],
            styles: [
                "lib/styles/**/*.css"
            ],
            testScripts: [
                "test/scripts/**/*.js"
            ],
            testStyles: [
                "test/styles/**/*.css"
            ]
        },
        
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= pkg.license %> */\n',
        
        // Task configuration
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            js: {
                src: ['dist/scripts/**/*.js'],
                dest: 'dist/simple-engine-ui.js'
            },
            css: {
                src: ["lib/styles/**/*.css"],
                dest: "dist/simple-engine-ui.css"
            }
        },
        
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: "dist/styles",
                    src: ["*.css"],
                    dest: "dist/simple-engine-ui",
                    ext: ".min.css"
                }]
            }
        },
        
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.js.dest %>',
                dest: 'dist/simple-engine-ui.min.js'
            }
        },
        
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'nodeunit']
            }
        },
        
        babel: {
            options: {
                presets: ["es2015"]
            },
            
            dist: {
                files: [{
                    expand: true,
                    cwd: "lib/scripts",
                    src: ["**/*.js"],
                    dest: "dist/scripts"
                }]
            }
        },
        
        jsdoc: {
            dist: {
                src: ["lib/**/*.js", "lib/README.md"],
                options: {
                    destination: "../simple-engine-docs/",
                    template: "node_modules/minami"
                }
            }
        },
        
        includeSource: {
            options: {
                basepath: "",
                baseUrl: "",
                ordering: "",
                rename: function (dest, match, options) {
                    return "../" + match;
                }
            },
            app: {
                files: {
                    "test/index.html" : "test/index.html"
                }
            }
        },
        
        wiredep: {
            task: {
                src: ["test/index.html"]
            }
        },
        
        strictly: {
            options: {
                function: true,
                cwd: "lib/"
            },
            files: ["**/*.js"]
        }
    });
    
    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-include-source");
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-jsdoc");
    grunt.loadNpmTasks("grunt-wiredep");
    grunt.loadNpmTasks("strictly");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    
    // Default task
    grunt.registerTask("default", ["includeSource", "wiredep"]);
    grunt.registerTask("build", ["strictly", "babel", "concat", "uglify", "cssmin", "jsdoc"]);
};

