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

