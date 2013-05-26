module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig
    watch:
      options:
        livereload: 3000

  grunt.registerTask 'default', ['watch']

