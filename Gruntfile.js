
/**
 * Gruntfile.js
 * @param grunt
 */
module.exports = function(grunt) {
    const config = require('./.screeps.json')

    // Command line overrides
    const branch = grunt.option('branch') || config.branch;
    const email = grunt.option('email') || config.email;
    const token = grunt.option('token') || config.token;
    const ptr = grunt.option('ptr') ? true : config.ptr

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')

    grunt.initConfig({
        // Publish to the screeps server
        screeps: {
            options: {
                email: email,
                token: token,
                branch: branch,
                ptr: ptr
            },
            dist: {
                src: ['dist/*.js']
            }
        },

        // Remove all files from the dist folder.
        clean: {
            'dist': ['dist']
        },

        // Copy all source files into the dist folder, flattening the folder structure by converting path delimiters to underscores
        copy: {
            // Pushes the game code to the dist folder so it can be modified before being send to the screeps server.
            screeps: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**',
                    dest: 'dist/',
                    filter: 'isFile',
                    rename: function (dest, src) {
                        // Change the path name utilize underscores for folders
                        return dest + src.replace(/\//g,'_');
                    }
                }],
            }
        },
    })

    grunt.registerTask('build', ['clean', 'copy:screeps']);
    grunt.registerTask('build-and-publish',  ['clean', 'copy:screeps', 'screeps']);
}