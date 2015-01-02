test("Threesixty", function() {
  notEqual(typeof($.fn.ThreeSixty), undefined, "Threesixty plugin not defined.");
});

test("Threesixty Default values", function() {
  $.ThreeSixty();
  equal($.ThreeSixty.defaultOptions.dragging, false, "Draging should be false");
  equal($.ThreeSixty.defaultOptions.ready, false, "ready should be false");
  equal($.ThreeSixty.defaultOptions.pointerEndPosX, 0, "pointerEndPosX should be 0");
  equal($.ThreeSixty.defaultOptions.pointerDistance, 0, "pointerDistance should be 0");
  equal($.ThreeSixty.defaultOptions.monitorStartTime, 0, "monitorStartTime should be 0");
  equal($.ThreeSixty.defaultOptions.monitorInt, 10, "monitorInt should be 10");
  equal($.ThreeSixty.defaultOptions.ticker, 0, "ticker should be 0");
  equal($.ThreeSixty.defaultOptions.speedMultiplier, 7, "speedMultiplier should be 7");
  equal($.ThreeSixty.defaultOptions.totalFrames, 180, "totalFrames should be 180");
  equal($.ThreeSixty.defaultOptions.currentFrame, 0, "currentFrame should be 0");
  equal($.ThreeSixty.defaultOptions.loadedImages, 0, "loadedImages should be 0");
  equal($.ThreeSixty.defaultOptions.framerate, 60, "framerate should be 60");
  equal($.ThreeSixty.defaultOptions.domains, null, "domains should be null");
  equal($.ThreeSixty.defaultOptions.parallel, false, "parallel should be false");
  equal($.ThreeSixty.defaultOptions.queueAmount, 8, "queueAmount should be 8");
  equal($.ThreeSixty.defaultOptions.idle, 0, "idle should be 1");
  equal($.ThreeSixty.defaultOptions.filePrefix, '', "filePrefix should be empty");
  equal($.ThreeSixty.defaultOptions.height, 300, "height should be 300");
  equal($.ThreeSixty.defaultOptions.width, 300, "width should be 300");
  equal($.ThreeSixty.defaultOptions.navigation, false, "navigation should be false");
  equal($.ThreeSixty.defaultOptions.autoplayDirection, 1, "autoplayDirection should be 1");
  equal($.ThreeSixty.defaultOptions.disableSpin, false, "disableSpin should be false");
  equal($.ThreeSixty.defaultOptions.disableWrap, false, "disableWrap should be false");
  equal($.ThreeSixty.defaultOptions.responsive, false, "responsive should be false");
  equal($.ThreeSixty.defaultOptions.zeroPadding, false, "zeroPadding should be false");
  equal($.ThreeSixty.defaultOptions.zeroBased, false, "zeroBased should be false");
  equal($.ThreeSixty.defaultOptions.showCursor, false, "showCursor should be false");
	equal($.ThreeSixty.defaultOptions.drag, true, "Drag should be true");
});


test("Should default config extend custom config values and update", function() {
  var three60 = $('.car').ThreeSixty({domain: 'http://', totalFrames: 80});
  var _config = three60.getConfig();
  notEqual(typeof(three60.getConfig), 'undefined', 'getConfig function not defined');

  equal(_config.domain, 'http://','custom config didnt get updated');
  equal(_config.totalFrames, 80,'custom config didnt get updated');
});

test("should remove the background from container div", function() {
  var three60 = $('.car').ThreeSixty({domain: 'http://', totalFrames: 80});
  equal(three60.$el.css('background-image'), 'none', 'background not removed');
});

test("should set cutom styles on the div", function() {
  var three60 = $('.car').ThreeSixty({styles: {float: 'left'}});
  equal(three60.$el.css('float'), 'left', 'background not removed');
});

test("should change the width to 100% if the responsive true is passed in config", function() {
  var three60 = $('.car').ThreeSixty({responsive: true});
  var width = three60.$el.width();
  var parentWidth = three60.$el.offsetParent().width();
  var percent = 100*width/parentWidth;
  equal(percent, 100, 'width not changing if on responsive true');
});

test("should hide the imgList ul while it show the progress and load images", function() {
  var three60 = $('.car').ThreeSixty({styles: {float: 'left'}});
  var _config = three60.getConfig();
  ok(three60.$el.find(_config.imgList).is(':hidden'), 'Image list still visible on progress');
});

test("should return number with zero padding", function() {
  var three60 = $('.car').ThreeSixty({zeroPadding: true});

  equal(three60.zeroPad(12), '012');
  equal(three60.zeroPad(2), '002');
  equal(three60.zeroPad(83), '083');
});

test("should return the current frame", function() {
  var three60 = $('.car').ThreeSixty({zeroPadding: true});

  ok(typeof(three60.getCurrentFrame) !== 'undefined', 'getCurrentFrame function not defined');
  equal(three60.getCurrentFrame(), 0, 'wrong current frame');
});


asyncTest("Should display the navigation controls", function() {
  ok( true );
  var three60 = $('.car').ThreeSixty({
    	totalFrames: 52,
      endFrame: 30,
      currentFrame: 1,
      imgList: '.threesixty_images',
      progress: '.spinner',
    	imagePath:'../assets/',
      filePrefix: '',
      ext: '.png',
      height: 447,
      width: 1000,
      navigation: true,
      disableSpin: false,
   		onReady: function() {
        setTimeout(function() {
          console.log(three60.$el.find('.nav_bar').length);
          ok(three60.$el.find('.nav_bar').is(':visible'), 'navigation not visible');
          start();
        }, 2000);
    	}
  });
});
