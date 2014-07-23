/*!
 * 360 degree Image Slider v2.0.0
 * http://gaurav.jassal.me/lab
 *
 * Copyright 2013, gaurav@jassal.me
 * Dual licensed under the MIT or GPL Version 3 licenses.
 *
 */
(function($) {
    'use strict';
    /**
   * @class ThreeSixty
   * **The ThreeSixty slider class**.
   *
   * This as jQuery plugin to create 360 degree product image slider.
   * The plugin is full customizable with number of options provided. The plugin
   * have the power to display images in any angle 360 degrees. This feature can be
   * used successfully in many use cases e.g. on an e-commerce site to help customers
   * look products in detail, from any angle they desire.
   *
   * **Features**
   *
   * - Smooth Animation
   * - Plenty of option parameters for customization
   * - Api interaction
   * - Simple mouse interaction
   * - Custom behavior tweaking
   * - Support for touch devices
   * - Easy to integrate
   * - No flash
   *
   * Example code:
   *      var product1 = $('.product1').ThreeSixty({
   *        totalFrames: 72,
   *        endFrame: 72,
   *        currentFrame: 1,
   *        imgList: '.threesixty_images',
   *        progress: '.spinner',
   *        imagePath:'/assets/product1/',
   *        filePrefix: 'ipod-',
   *        ext: '.jpg',
   *        height: 265,
   *        width: 400,
   *        navigation: true
   *      });
   * **Note:** There are loads other options that you can override to customize
   * this plugin.

   * @extends jQuery
   * @singleton
   * @param {String} [el] jQuery selector string for the parent container
   * @param {Object} [options] An optional config object
   *
   * @return this
   */
    $.ThreeSixty = function(el, options) {
      // To avoid scope issues, use 'base' instead of 'this'
      // to reference this class from internal events and functions.
      var base = this,
        AppCongif, frames = [],
        VERSION = '2.0.0';
      // Access to jQuery and DOM versions of element
      /**
       * @property {$el}
       * jQuery Dom node attached to the slider inherits all jQuery public functions.
       */
      base.$el = $(el);
      base.el = el;
      // Add a reverse reference to the DOM object
      base.$el.data('ThreeSixty', base);
      /**
       * @method init
       * The function extends the user options with default settings for the
       * slider and initilize the slider.
       * **Style Override example**
       *
       *      var product1 = $('.product1').ThreeSixty({
       *        totalFrames: 72,
       *        endFrame: 72,
       *        currentFrame: 1,
       *        imgList: '.threesixty_images',
       *        progress: '.spinner',
       *        imagePath:'/assets/product1/',
       *        filePrefix: 'ipod-',
       *        ext: '.jpg',
       *        height: 265,
       *        width: 400,
       *        navigation: true,
       *        styles: {
       *          border: 2px solide #b4b4b4,
       *          background: url(http://example.com/images/loader.gif) no-repeat
       *        }
       *      });
       * @return this
       */
      base.init = function() {
        AppCongif = $.extend({}, $.ThreeSixty.defaultOptions, options);
      };
      $.ThreeSixty.defaultOptions = {
        /**
         * @cfg {Boolean} dragging [dragging=false]
         * @private
         * Private propery contains a flags if users is in dragging mode.
         */
        dragging: false,
        /**
         * @cfg {Boolean} ready [ready=false]
         * @private
         * Private propery is set to true is all assets are loading and application is
         * ready to render 360 slider.
         */
        ready: false,
        /**
         * @cfg {Number} pointerStartPosX
         * @private
         * private property mouse pointer start x position when user starts dragging slider.
         */
        pointerStartPosX: 0,
        /**
         * @cfg {Number} pointerEndPosX
         * @private
         * private property mouse pointer start x position when user end dragging slider.
         */
        pointerEndPosX: 0,
        /**
         * @cfg {Number} pointerDistance
         * @private
         * private property contains the distance between the pointerStartPosX and pointerEndPosX
         */
        pointerDistance: 0,
        /**
         * @cfg {Number} monitorStartTime
         * @private
         * private property contains time user took in dragging mouse from pointerStartPosX and pointerEndPosX
         */
        monitorStartTime: 0,
        monitorInt: 10,
        /**
         * @cfg {Number} ticker
         * @private
         * Timer event that renders the 360
         */
        ticker: 0,
        /**
         * @cfg {Number} speedMultiplier
         * This property controls the sensitivity for the 360 slider
         */
        speedMultiplier: 7,
        /**
         * @cfg {Number} totalFrames
         * Set total number for frames used in the 360 rotation
         */
        totalFrames: 180,
        /**
         * @cfg {Number} currentFrame
         * Current frame of the slider.
         */
        currentFrame: 0,
        /**
         * @cfg {Array} endFrame
         * Private perperty contains information about the end frame when user slides the slider.
         */
        endFrame: 0,
        /**
         * @cfg {Number} loadedImages
         * Private property contains count of loaded images.
         */
        loadedImages: 0,
        /**
         * @cfg {Array} framerate
         * Set framerate for the slider animation
         */
        framerate: 60,
        /**
         * @cfg {String} domains
         * Set comma seprated list of all parallel domain from where 360 assets needs to be loaded.
         */
        domains: null,
        /**
         * @cfg {String} domain
         * Domain from where assets needs to be loaded. Use this propery is you want to load all assets from
         * single domain.
         */
        domain: '',
        /**
         * @cfg {Boolean} parallel
         * Set to true if you want to load assets from parallel domain. Default false
         */
        parallel: false,
        /**
         * @cfg {Number} queueAmount
         * Set number of calls to be made on parallel domains.
         */
        queueAmount: 8,
        /**
         * @cfg {Number} idle
         * Mouse Inactivite idle time in seconds. If set more than 0 will auto spine the slider
         */
        idle: 0,
        /**
         * @cfg {String} filePrefix
         * Prefix for the image file name before the numeric value.
         */
        filePrefix: '',
        /**
         * @cfg {String} ext [ext=.png]
         * Slider image extension.
         */
        ext: 'png',
        /**
         * @cfg {Object} height [300]
         * Height of the slider
         */
        height: 300,
        /**
         * @cfg {Number} width [300]
         * Width of the slider
         */
        width: 300,
        /**
         * @cfg {Object} styles
         * CSS Styles for the 360 slider
         */
        styles: {},
        /**
         * @cfg {Boolean} navigation[false]
         * State if navigation controls are visible or not.
         */
        navigation: false,
        /**
         * @cfg {Boolean} autoplay[false]
         * Autoplay the 360 animation
         */
        autoplay: false,
        /**
         * @cfg {number} autoplayDirection [1]
         * Direction for autoplay the 360 animation. 1 for right spin, and -1 for left spin.
         */
        autoplayDirection: 1,
        /**
         * Property to disable auto spin
         * @type {Boolean}
         */
        disableSpin: false,
        /**
         * Property to disable infinite wrap
         * @type {Boolean}
         */
        disableWrap: false,
        /**
         * Responsive width
         * @type {Boolean}
         */
        responsive: false,
        /**
         * Zero Padding for filenames
         * @type {Boolean}
         */
        zeroPadding: false,
        /**
         * Zero based for image filenames starting at 0
         * @type {Boolean}
         */
        zeroBased: false,
        /**
         * @type {Array}
         * List of plugins
         */
        plugins: [],
        /**
         * @type {Boolean}
         * Show hand cursor on drag
         */
        showCursor: false,
        /**
         * @cfg {Boolean} drag
         * Set it to false if you want to disable mousedrag or touch events
         */
        drag: true,
        /**
         * @cfg {Function} onReady
         * Callback triggers once all images are loaded and ready to render on the screen
         */
        onReady: function() {}
      };
      $.fn.ThreeSixty = function(options) {
        return Object.create(new $.ThreeSixty(this, options));
      };
    };
  }(jQuery));
  /**
   *
   * Object.create method for perform as a fallback if method not available.
   * The syntax just takes away the illusion that JavaScript uses Classical Inheritance.
   */
  if(typeof Object.create !== 'function') {
    Object.create = function(o) {
      'use strict';

      function F() {}
      F.prototype = o;
      return new F();
    };
  }