var args = arguments[0] || {};

function doCloseWindow(e) {
  $.location.close();
}

function doRemovePin(e) {
  args.removeAnnotation = true;
  $.location.close();
}

if (JSON.stringify(args) === "{}") {
  $.labelInfo.text = $.labelInfo.text + " about the location.";
} else {
  $.labelInfo.text = $.labelInfo.text + " about location #" + (args.annotationId + 1) + ".";
  $.labelPlace.text = args.annotationSubtitle;
  $.labelLong.text = $.labelLong.text + " " + Math.round(args.annotationLong * 10000) / 10000;
  $.labelLat.text = $.labelLat.text + " " + Math.round(args.annotationLat * 10000) / 10000;
}

$.location.open();
/*
$.location.left = $.location.rect.width;
var viewMotion = Ti.UI.create2DMatrix();
// move from right to left (-) whole screen
viewMotion = viewMotion.translate(-1 * $.location.rect.width, 0);
// set up movement object
var a = Ti.UI.createAnimation( {
    // direction and extent
    transform: viewMotion,
    // duration in ms
    duration: 450,
    // don't reverse the animation
    autoreverse: false,
    // only animate once
    repeat: 1
} );
// do the movement, calling a 'cleanup' function once the aniumation is finished
$.location.animate(a, function(){
}); */

