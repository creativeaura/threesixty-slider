/*global $, window, CanvasLoader, jQuery, alert, requestAnimationFrame, cancelAnimationFrame */
/*jslint browser:true, devel:true */

/*!
 * 360 degree Image Slider Fullscreen plugin v1.0.0
 * http://gaurav.jassal.me/lab
 *
 * Copyright 2013, gaurav@jassal.me
 * Dual licensed under the MIT or GPL Version 3 licenses.
 *
 */


(function($) {
  "use strict";
  $.ThreeSixtyFullscreen = function (el, options) {
    var plugin = this,
      $el = el,
      opts = options,
      $button = $('<a href="#">Fullscreen</a>');

    // Attach event to the plugin
    $button.bind('click', function(event) {
      plugin.onClickHandler.apply(this, event);
    });

    /**
     * Set styles for the plugin interface.
     * @return {Object} this
     */
    plugin.setStyles = function() {
      $button.css({
        'z-index': 12,
        'display': 'block',
        'position': 'absolute',
        'background': 'url(img/fs.png) no-repeat',
        'width': '20px',
        'height': '20px',
        'text-indent': '-99999px',
        'right': '5px',
        'bottom': '5px'
      });
      return this;
    };

    /**
     * Initilize the fullscreen plugin
     * @param  {Object} opt override options
     */
    plugin.init = function() {
      plugin.setStyles();
      $el.prepend($button);
    };

    plugin.onClickHandler = function(e) {

    };

    plugin.init();
  };
}(jQuery));
