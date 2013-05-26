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
    exec('jshint .')

  grunt.registerTask 'default', ['watch']

