
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-bower');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-bower-task');
    require('load-grunt-tasks')(grunt);

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
                dest: 'docs/componants.js',
                cssDest: 'docs/componants.css',
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
        }
    });

    grunt.registerTask('default', ['babel', 'browserify', 'shell:bower_install','bower_concat']);
}
