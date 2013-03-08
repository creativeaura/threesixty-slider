![Three Sixty Image slider plugin](https://raw.github.com/creativeaura/threesixty-slider/master/images/360.png)

Three Sixty Image slider plugin
=================

This is a jQuery plugin to create 360 degree product image slider. The plugin is full customizable with number of options provided. The plugin have the power to display images in any angle 360 degrees. This feature can be used successfully in many use cases e.g. on an e-commerce site to help customers look products in detail, from any angle they desire.

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
            navigation: true
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
    <td>dragging</td><td>true</td><td>Boolean</td><td>Set false if you want to disable mouse and touch events on the slider.</td>
  </tr>
</table>

Demo
---------------------
- [Example 1 Default Settings](http://creativeaura.github.com/threesixty-slider)
- [Example 2 Custom controls](http://creativeaura.github.com/threesixty-slider/example1.html)
- [Multiple Sliders in one page](http://creativeaura.github.com/threesixty-slider/example2.html)
- [No Drag with Scrollbar](http://creativeaura.github.com/threesixty-slider/example3.html)
- [Live Editor](http://creativeaura.github.com/threesixty-slider/editor.html)

Browsers Supported
---------------------
![Browsers Supported](https://raw.github.com/creativeaura/threesixty-slider/master/images/browser_logos-64.png)

This plugin is supported in all browsers including our beloved IE 6


Support
---------------------
For support and question please contact at [gaurav@jassal.me](mailto:gaurav@jassal.me) or follow at [@gauravjassal](http://twitter.com/gauravjassal)


LICENSE
---------

Copyright 2013 Gaurav Jassal

Released under the MIT and GPL Licenses.
