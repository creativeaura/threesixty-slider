module.exports = function(grunt) {
require('time-grunt')(grunt);
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> verison <%= pkg.version %> */\n'+'/* <%= pkg.repository.url %> */\n'
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
      scripts: {
        files: 'src/**/*.js',
        tasks: ['jshint'],
        options: {
          debounceDelay: 250
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: false,
        browser: true,
        quotmark: 'single',
        globals: {
          jQuery: true
        }
      },
      files: {
        src: ['src/**/*.js']
      }
    },
    jasmine: {
      pivotal: {
        src: ['demo/js/jquery-1.8.3.min.js', 'src/**/*.js'],
        options: {
          specs: 'tests/spec/*Spec.js',
          helpers: 'tests/spec/*Helper.js'
        }
      }
    },
  	bump: {
	  options: {
		  files: ['package.json', 'bower.json'],
		  commit: false,
		  createTag: false,
		  push: false
	  }
  	}
  });

  // Load the plugin that provides the "uglify" task.
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify']);
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('demo', ['connect:demo']);
};
