fs = require 'fs'
browserify = require 'browserify'
shim = require 'browserify-shim'
require 'shelljs/global'

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

  grunt.registerTask 'shim', ->
    done = this.async()
    shim(browserify(),
      angular:
        path: __dirname + '/public/components/angular/angular.js'
        exports: 'angular'
    ).bundle (err, src) ->
      fs.writeFileSync(__dirname + '/public/shims/angular.js', src)
      done()

  grunt.registerTask 'default', ['watch']

