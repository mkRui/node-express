module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('PACKAGE.JSON'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name > <%= grunt.template.today("yyyy-mm-dd")> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      build: ['Gruntfile.js', 'src/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-jshint')

  grunt.registerTask('default', ['jshint', 'uglify'])

}