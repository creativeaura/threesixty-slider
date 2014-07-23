test("Threesixty", function() {
  notEqual(typeof($.fn.ThreeSixty), undefined, "Threesixty plugin not defined.");
});

test("Threesixty Default values", function() {
  var defaultOptions = $.ThreeSixty.defaultOptions;
  equal(defaultOptions, false);
});