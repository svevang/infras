
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-bower');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-sass');
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.js'],
                    dest: 'build/'
                }]
            }
        },
        browserify: {
            dist: {
                files: {
                    'docs/app.js': ['build/**/*.js']
                },
            }
        },
        bower_concat: {
            all: {
                dest: {
                    js: 'docs/componants.js',
                    css: 'docs/componants.css'
                },
                exclude: [
                ],
                dependencies: {
                    //'underscore': 'jquery',
                    //'backbone': 'underscore',
                    //'jquery-mousewheel': 'jquery'
                },
                bowerOptions: {
                    relative: false
                }
            }
        },
        bower: {
            install: {
                dest: 'bower_components',
            }
        },
        shell: {
            options: {
                stderr: false
            },
            bower_install: {
                command: 'bower install'
            },
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    'docs/app.css': 'src/app.scss',       // 'destination': 'source'
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*'],
                tasks: ['default'],
                options: {
                    spawn: false,
                },
            },
        },
        copy: {
            json_assets: {
                expand: true,
                cwd: 'src',
                src: 'plantas_electricas.json',
                dest: 'docs/',
            },
            image_assets: {
                expand: true,
                cwd: 'src',
                src: 'icons/*',
                dest: 'docs/',
            },
            html_files: {
                expand: true,
                cwd: 'src',
                src: 'index.html',
                dest: 'docs/'
            }
        },
        clean: {
            docs: ['docs/*.*', 'docs/icons/']
        }
    });

    grunt.registerTask('default', ['clean', 'babel', 'browserify', 'shell:bower_install','bower_concat', 'sass', 'copy']);
}
