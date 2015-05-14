![Three Sixty Image slider plugin](https://raw.github.com/creativeaura/threesixty-slider/master/assets/360.png)



Three Sixty Image slider plugin v2.0.5
=================

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/creativeaura/threesixty-slider/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
[![Build Status](https://travis-ci.org/creativeaura/threesixty-slider.svg?branch=master)](https://travis-ci.org/creativeaura/threesixty-slider)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/creativeaura/threesixty-slider?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

This is a jQuery plugin to create 360 degree product image slider. The plugin is full customizable with number of options provided. The plugin have the power to display images in any angle 360 degrees. This feature can be used successfully in many use cases e.g. on an e-commerce site to help customers look products in detail, from any angle they desire.

**Features**

- Smooth Animation
- Plenty of option parameters for customization
- Api interaction
- Simple mouse interaction
- Custom behavior tweaking
- Support for touch devices
- Easy to integrate
- No flash
- Plugin integration

Plugins
---------------------

- [Drupal module](https://drupal.org/sandbox/coderider/2274229) by [Rashid Abdullah](https://drupal.org/u/coderider)

Installation
---------------------

Git

    git clone https://github.com/creativeaura/threesixty-slider.git

Or install using bower

    bower install threesixty-slider

Example 1
---------------------
### Javascript ######
    window.onload = init;

    var product;
    function init(){

        product1 = $('.product1').ThreeSixty({
            totalFrames: 72, // Total no. of image you have for 360 slider
            endFrame: 72, // end frame for the auto spin animation
            currentFrame: 1, // This the start frame for auto spin
            imgList: '.threesixty_images', // selector for image list
            progress: '.spinner', // selector to show the loading progress
            imagePath:'assets/product1/', // path of the image assets
            filePrefix: 'ipod-', // file prefix if any
            ext: '.jpg', // extention for the assets
            height: 265,
            width: 400,
            navigation: true,
            disableSpin: true // Default false
        });

    }

### HTML Snippet ######

    <div class="threesixty product1">
        <div class="spinner">
            <span>0%</span>
        </div>
        <ol class="threesixty_images"></ol>
    </div>
Here we are initializing an image slider for product 1. The ThreeSixty class constructor require a config object with properties like totalFrame, endFrame and currentFrame


Documentation
---------------------
##### Methods

Public methods to control the slider after initialization.
<table>
  <tr>
    <th>Method Name</th><th>Description</th>
  </tr>
  <tr>
    <td>.play()</td><td>Function to trigger the auto rotation of the slider</td>
  </tr>
  <tr>
    <td>.stop()</td><td>Function to stop the auto play</td>
  </tr>
  <tr>
    <td>.next()</td><td>Function to move the slider to next frame</td>
  </tr>
  <tr>
    <td>.previous()</td><td>Function to move the slider to previous frame</td>
  </tr>
 <tr>
    <td>.gotoAndPlay()</td><td>Use this function if you want the slider spin to a particular frame with animation.</td>
  </tr>
</table>

##### Config

Here are the list of config value you can pass in while you initilize your 360 slider.

<table>
  <tr>
    <th>Config</th><th>Default value</th><th>Type</th><th>Description</th>
  </tr>
  <tr>
    <td>totalFrames</td><td>180</td><td>Number</td><td>Set total number for frames used in the 360 rotation</td>
  </tr>
  <tr>
    <td>currentFrame</td><td>1</td><td>Number</td><td>Set the starting from of the auto spin on initilize</td>
  </tr>
<tr>
    <td>endFrame</td><td>180</td><td>Number</td><td>Set the frame where you want the auto spin to stop</td>
  </tr>
<tr>
    <td>framerate</td><td>60</td><td>Number</td><td>Framerate for the spin animation</td>
  </tr>
<tr>
    <td>filePrefix</td><td>''</td><td>String</td><td>file prefiex for the assets if you assets name is nike_boot_1.png then filePrefix will be nike_boot_</td>
  </tr>
<tr>
    <td>ext</td><td>png</td><td>String</td><td>File extension for all the assets</td>
  </tr>
<tr>
    <td>height</td><td>300</td><td>Number</td><td>Height you want to set for the three sixty container</td>
  </tr>

<tr>
    <td>width</td><td>300</td><td>Number</td><td>Width you want to set for the three sixty container</td>
  </tr>
<tr>
    <td>style</td><td>{}</td><td>Object</td><td>Object container styles for the preloader similar to jQuery.css({})</td>
  </tr>
<tr>
    <td>navigation</td><td>true</td><td>Boolean</td><td>Set false if you don't want default navigation controls</td>
  </tr>
<tr>
    <td>autoplayDirection</td><td>1</td><td>Number</td><td>Control the direction of the spin depending on your assets. You can use 1 or -1</td>
  </tr>
<tr>
    <td>drag</td><td>true</td><td>Boolean</td><td>Set false if you want to disable mouse and touch events on the slider.</td>
  </tr>
  <tr>
    <td>disableSpin</td><td>false</td><td>Boolean</td><td>Will disable the initial spin on load</td>
  </tr>
  <tr>
    <td>zeroPadding</td><td>false</td><td>Boolean</td><td>true will add 0 padding for file names 1 - 9</td>
  </tr>
  <tr>
    <td>responsive</td><td>false</td><td>Boolean</td><td>Enable responsive width for 360</td>
  </tr>
  <tr>
      <td>onReady</td><td>function() {}</td><td>Function</td><td>Callback triggers once all images are loaded and ready to render on the screen</td>
    </tr>
</table>

Demo
---------------------
- [Example 1 Default Settings](http://360slider.com/default_control.html)
- [Example 2 Custom controls](http://360slider.com/custom_controls.html)
- [Responsive](http://360slider.com/responsive.html)
- [With Plugins](http://360slider.com/plugins.html)
- [Fullscreen](http://360slider.com/full_page_scrolling.html)

Browsers Supported
---------------------
![Browsers Supported](https://raw.github.com/creativeaura/threesixty-slider/master/assets/browser_logos-64.png)

This plugin is supported in all browsers including our beloved IE 6


Support
---------------------
For support and question please contact at [gaurav@jassal.me](mailto:gaurav@jassal.me) or follow at [@gauravjassal](http://twitter.com/gauravjassal)


LICENSE
---------

Copyright 2013 Gaurav Jassal

Released under the MIT and GPL Licenses.
