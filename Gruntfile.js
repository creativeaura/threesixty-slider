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
    less: {
      development: {
        options: {
          paths: ["styles"]
        },
        files: {
          "src/styles/threesixty.css": "src/styles/threesixty.less"
        }
      }
    },
    watch: {
      css: {
        files: 'src/styles/*.less',
        tasks: ['less']
      },
      scripts: {
        files: ['src/**/*.js', 'tests/**/*.js'],
        tasks: ['jshint', 'qunit'],
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
  	bump: {
	  options: {
		  files: ['package.json', 'bower.json'],
		  commit: false,
		  createTag: false,
		  push: false
	  }
  	},
    usemin: {
      html: 'deploy/*.html'
    },
    copy: {
      deploy: {
        files: [
          {expand: true, cwd: 'demo/', src: ['**'], dest: 'deploy/'}
        ]
      },
      dist: {
        files: [
          {expand: true, flatten: true, src: ['dist/threesixty.min.js'], dest: 'deploy/js/', filter: 'isFile'}
        ]
      }
    },
    qunit: {
      all: ['tests/**/*.html']
    }
  });

  // Load the plugin that provides the "uglify" task.
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify']);
  grunt.registerTask('build', ['uglify']);
};
