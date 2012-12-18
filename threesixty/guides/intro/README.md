**The ThreeSixty slider class**.

 This as jQuery plugin to create 360 degree product image slider.
 The plugin is full customizable with number of options provided. The plugin
 have the power to display images in any angle 360 degrees. This feature can be
 used successfully in many use cases e.g. on an e-commerce site to help customers
 look products in detail, from any angle they desire.

 **Features**

 - Smooth Animation
 - Plenty of option parameters for customization
 - Api interaction
 - Simple mouse interaction
 - Custom behavior tweaking
 - Support for touch devices
 - Easy to integrate
 - No flash

 Example code:
      var product1 = $('.product1').ThreeSixty({
        totalFrames: 72,
        endFrame: 72,
        currentFrame: 1,
        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath:'/assets/product1/',
        filePrefix: 'ipod-',
        ext: '.jpg',
        height: 265,
        width: 400,
        navigation: true
      });
 **Note:** There are loads other options that you can override to customize
 this plugin.