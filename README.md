Three Sixty Image slider plugin
=================

This as jQuery plugin to create 360 degree product image slider. The plugin is full customizable with number of options provided. The plugin have the power to display images in any angle 360 degrees. This feature can be used successfully in many use cases e.g. on an e-commerce site to help customers look products in detail, from any angle they desire.

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
            imagePath:'/assets/product1/', // path of the image assets
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

Demo
---------------------
[Here is the link for the demo](http://creativeaura.github.com/threesixty-slider)
