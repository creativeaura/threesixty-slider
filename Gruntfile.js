module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> verison <%= pkg.version %> */\n'
      },
      build: {
        src: 'src/threesixty.js',
        dest: 'dist/threesixty.min.js'
      }
    },
    connect: {
      demo: {
        options: {
          port: 9001,
          base: '',
          keepalive: true
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ["styles"]
        },
        files: {
          "styles/threesixty.css": "styles/threesixty.less"
        }
      }
    },
    watch: {
      css: {
        files: 'styles/*.less',
        tasks: ['less']
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
