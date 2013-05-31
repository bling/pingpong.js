require('shelljs/global')

module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig
    watch:
      options:
        livereload: 3000
      jshint:
        files: '**/*.js'
        tasks: ['jshint']

  grunt.registerTask 'jshint', ->
    exec('node_modules/.bin/jshint .')

  grunt.registerTask 'default', ['watch']

