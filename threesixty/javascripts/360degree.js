/*global $, window, CanvasLoader, jQuery, alert */
/*jslint browser:true */

(function (exports, $) {
  "use strict";
  /**
   * @class CA
   * ## Javascript library to render a 360 degree view of a product.
   * This library has dependency of jQuery and CanvasLoader library.
   * @version 0.0.1
   *
   * @example
   *
   *  CA.ThreeSixty.init({
   *   totalFrames: 52,
   *   threesixty: '#threesixty',
   *   imgList: '#threesixty_images',
   *   progress: 'spinner',
   *   imagePath:'/cars/_assets/images/builder/fulls/360/civic/',
   *   ext:'.png',
   *   domains:'http://uat1.honda.co.uk,http://uat2.honda.co.uk,http://uat3.honda.co.uk,http://uat4.honda.co.uk',
   *   parallel:true
   *  });
   *
   */
  var CA = {};
  CA.version = "0.0.1";
  /**
   * @class Utility
   * Class contains all utility functions like Mobile or Table detection.
   * @extends CA
   * @singleton
   */
  CA.Utility = (function () {
    var Mobile, instantiated;

    /*
     * @function Mobile
     * Function detects and returns am object container properies for all range of mobile and
     * tablet devices.
     * @return {Boolean} detect.iphone If the device is iPhone
     * @return {Boolean} detect.ipod If the device is iPod
     * @return {Boolean} detect.iPad If the device is iPad
     * @return {Boolean} detect.blackberry If the device is Blackberry Smartphone
     * @return {Boolean} detect.android If the device is Android smartphone or Tablet
     * @return {Boolean} detect.macOS If the operating system is MacOS
     * @return {Boolean} detect.win If the operating system is Microsift Windows
     * @return {Boolean} detect.mac If the operating system is MacOS
     * @return {Boolean} detect.wphone If the device is a windows smartphone
     * @return {Boolean} detect.mobile If the device is a smartphone or Mobile
     * @return {Boolean} detect.androidTablet If the device is a Android Tablet
     * @return {Boolean} detect.tabletPc If the device is a tablet pc
     * @return {Boolean} detect.palmDevice If the device is a palm / hp / webos
     * @return {Boolean} detect.kindle If the device a Amazon Kindle
     * @return {Boolean} detect.otherMobileHints If the device a Opera Mini, Windows Mobile IE, SonyEricsson
     */
    Mobile = function () {
      var ua = navigator.userAgent,
          detect;

      detect = {
        iphone: Boolean(ua.match(/iPhone/)),
        ipod: Boolean(ua.match(/iPod/)),
        ipad: Boolean(ua.match(/iPad/)),
        blackberry: Boolean(ua.match(/BlackBerry/)),
        playbook: Boolean(ua.match(/PlayBook/)),
        android: Boolean(ua.match(/Android/)),
        macOS: Boolean(ua.match(/Mac OS X/)),
        win: Boolean(ua.match(/Windows/)),
        mac: Boolean(ua.match(/Macintosh/)),
        wphone: Boolean(ua.match(/(Windows Phone OS|Windows CE|Windows Mobile)/)),
        mobile: Boolean(ua.match(/Mobile/)),
        androidTablet: Boolean(ua.match(/(GT-P1000|SGH-T849|SHW-M180S)/)),
        tabletPc: Boolean(ua.match(/Tablet PC/)),
        palmDevice: Boolean(ua.match(/(PalmOS|PalmSource| Pre\/)/)),
        kindle: Boolean(ua.match(/(Kindle)/)),
        otherMobileHints: Boolean(ua.match(/(Opera Mini|IEMobile|SonyEricsson|smartphone)/))
      };

      return {
        detect: detect
      };
    };

    return {
      mobile: new Mobile()
    };
  }());

  /**
   * @class ThreeSixty
   * Main class that contains the functionality or 360 degree slider.
   * @public
   * @singleton
   */

  CA.ThreeSixty = (function () {
    var defaults, AppCongif, imageLoaded, loadImages, showImages, initEvents, refresh, render, getPointerEvent, hidePreviousFrame, showCurrentFrame, getNormalizedCurrentFrame, loadParallelImages, imageParallelLoaded, startParallel, parallelURLs = [],
      trackPointer, getCurrentFrame, threesixtyCurrentFrame, setCurrentFrame, initProgress, domainPointer = 1,
      loadingPointer = 0,
      tmpParallelBucket = [],
      inactive = false,
      idleTimer, base = this;
    
    defaults = {
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
       * @cfg {Array} frames
       * Private property contains all the images in the 360 slider
       */
      frames: [],
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
      domain: 'http://example.com',
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
      ext: 'png'
    };

    initProgress = function () {
      // $(AppCongif.progress).css({
      //   background: 'url(/assets/loader.gif) no-repeat'
      // });
      $(AppCongif.progress).fadeIn("slow");

      $(AppCongif.imgList).hide();
    };
    /**
     * Function will load a range of image and trigger a callback
     *
     * @private
     */
    loadImages = function () {
      var li, imageName, image, host;
      li = document.createElement('li');
      imageName = AppCongif.domainList[0] + AppCongif.imagePath + AppCongif.filePrefix + (AppCongif.loadedImages + 1) + AppCongif.ext + (($.browser.msie) ? '?' + new Date().getTime() : '');
      image = $('<img>').attr('src', imageName).addClass('previous-image').appendTo(li);

      AppCongif.frames.push(image);

      $(AppCongif.imgList).append(li);

      $(image).load(function () {
        imageLoaded();
      });
    };
    /**
     * Function show the progress of the image loading.
     *
     * @private
     */
    imageLoaded = function () {
      AppCongif.loadedImages += 1;
      $(AppCongif.ThreeSixty + " " + AppCongif.progress + " span").text(Math.floor(AppCongif.loadedImages / AppCongif.totalFrames * 100) + '%');
      if (AppCongif.loadedImages >= AppCongif.totalFrames) {
        AppCongif.frames[0].removeClass("previous-image").addClass("current-image");
        $(AppCongif.progress).fadeOut("slow", function () {
          $(this).hide();
          showImages();
        });
      } else {
        loadImages();
      }
    };

    loadParallelImages = function () {
      var urls = [],
          i, j = 0;
      for (i = 0; i < AppCongif.totalFrames; i += 1) {
        urls.push(AppCongif.domainList[j] + AppCongif.imagePath + (i + 1) + AppCongif.filePrefix + AppCongif.ext + (($.browser.msie) ? '?' + new Date().getTime() : ''));
        j += 1;
        if (j === 4) {
          j = 0;
        }
      }
      parallelURLs = urls;
      startParallel();
    };

    startParallel = function () {
      var i = 0,
          j, li, imageName, image, callback;
      callback = function () {
        imageParallelLoaded();
      };
      for (j = 0; j < AppCongif.queueAmount; j += 1) {
        li = document.createElement('li');
        imageName = parallelURLs[loadingPointer];
        image = $('<img width="1000" height="447">').attr('src', imageName).addClass('previous-image').appendTo(li);

        AppCongif.frames.push(image);

        $(AppCongif.imgList).append(li);
        loadingPointer += 1;
        $(image).load(callback);
      }
    };

    imageParallelLoaded = function () {
      tmpParallelBucket.push({});
      $(AppCongif.progress + " span").text(Math.floor(loadingPointer / AppCongif.totalFrames * 100));
      if (loadingPointer === AppCongif.totalFrames) {
        AppCongif.frames[0].removeClass("previous-image").addClass("current-image");
        $(AppCongif.progress).fadeOut("slow", function () {
          $(this).hide();
          showImages();
        });
      }
      if (tmpParallelBucket.length === AppCongif.queueAmount) {
        tmpParallelBucket = null;
        tmpParallelBucket = [];
        startParallel();
      }
    };

    showImages = function () {
      $(AppCongif.threesixty).css("background-image", 'none');
      $('.txtC').fadeIn();
      $(AppCongif.imgList).fadeIn();
      AppCongif.ready = true;

      //AppCongif.endFrame = 52;
      initEvents();
      refresh();
    };

    refresh = function () {
      if (AppCongif.ticker === 0) {
        AppCongif.ticker = setInterval(render, Math.round(1000 / AppCongif.framerate));
      }
    };

    render = function () {
      var frameEasing;
      if (AppCongif.currentFrame !== AppCongif.endFrame) {
        frameEasing = AppCongif.endFrame < AppCongif.currentFrame ? Math.floor((AppCongif.endFrame - AppCongif.currentFrame) * 0.1) : Math.ceil((AppCongif.endFrame - AppCongif.currentFrame) * 0.1);
        hidePreviousFrame();
        AppCongif.currentFrame += frameEasing;
        threesixtyCurrentFrame = AppCongif.currentFrame;
        showCurrentFrame();
      } else {
        window.clearInterval(AppCongif.ticker);
        AppCongif.ticker = 0;
      }
    };

    hidePreviousFrame = function () {
      AppCongif.frames[getNormalizedCurrentFrame()].removeClass("current-image").addClass("previous-image");
    };

    showCurrentFrame = function () {
      AppCongif.frames[getNormalizedCurrentFrame()].removeClass("previous-image").addClass("current-image");
    };
    getNormalizedCurrentFrame = function () {
      var c = Math.ceil(AppCongif.currentFrame % AppCongif.totalFrames);
      if (c < 0) {
        c += (AppCongif.totalFrames - 1);
      }
      return c;
    };
    getPointerEvent = function (event) {
      return event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
    };
    initEvents = function () {
      $(AppCongif.threesixty).bind('mousedown touchstart touchmove touchend mousemove', function (event) {

        event.preventDefault();
        if ((event.type === 'mousedown' && event.which === 1) || event.type === 'touchstart') {
          AppCongif.pointerStartPosX = getPointerEvent(event).pageX;
          AppCongif.dragging = true;
        } else if (event.type === 'touchmove') {
          trackPointer(event);
        } else if (event.type === 'touchend') {
          AppCongif.dragging = false;
        }
      });

      $(document).bind('mouseup', function (event) {
        //event.preventDefault();
        AppCongif.dragging = false;
        $(this).css("cursor", "none");
      });

      $(document).bind('mousemove', function (event) {
        if (AppCongif.dragging) {
          event.preventDefault();
        }
        trackPointer(event);
      });
    };

    trackPointer = function (event) {
      if (AppCongif.ready && AppCongif.dragging) {
        AppCongif.pointerEndPosX = getPointerEvent(event).pageX;
        if (AppCongif.monitorStartTime < new Date().getTime() - AppCongif.monitorInt) {
          AppCongif.pointerDistance = AppCongif.pointerEndPosX - AppCongif.pointerStartPosX;
          AppCongif.endFrame = AppCongif.currentFrame + Math.ceil((AppCongif.totalFrames - 1) * AppCongif.speedMultiplier * (AppCongif.pointerDistance / $(AppCongif.threesixty).width()));
          refresh();
          AppCongif.monitorStartTime = new Date().getTime();
          AppCongif.pointerStartPosX = getPointerEvent(event).pageX;
        }
      }
    };

    getCurrentFrame = function () {
      return threesixtyCurrentFrame || 0;
    };

    /**
     * Init method to start the 360 slider
     */

    function init(options) {
      AppCongif = $.extend({}, defaults, options);
      AppCongif.domainList = (AppCongif.domains !== null) ? AppCongif.domains.split(",") : [''];
      //base.config = AppCongif;
      if (AppCongif.parallel) {
        loadParallelImages();
      } else {
        loadImages();
      }
      //console.log("-> Application Init");
      initProgress();
    }


    return {
      init: function (options) {
        init(options);
      },
      getCurrentFrame: getCurrentFrame()
    };
  }());

  exports.CA = CA;
}(window, $));