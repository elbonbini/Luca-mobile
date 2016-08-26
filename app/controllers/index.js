/*
 * Variable declarations
 */
var countEvents =[0,0];
var args = arguments[0] || {};

/*
 * Funtion to open any other windows (such as login)
 */
function initWindow(name) {
  var userView = Alloy.createController(name);
};

/*
 * Animate the centre board so it slides smoothly, revealing the drawer. The speed is set by the '
 * duration' property
 */
function anim (drawer, movePos) {
//  console.log("left top: " + $.listLeft.top + " left: " + $.listLeft.left + " Z(v): " + $.leftDrawer.zIndex + " Z(l): " + $.listLeft.zIndex);
//  console.log("right top: " + $.listRight.top + " right: " + $.listRight.right + " Z(v): " + $.rightDrawer.zIndex + " Z(l): " + $.listRight.zIndex);
//  console.log(movePos);
  var drawMotion = Ti.UI.create2DMatrix();
  // move by (+ right, - left) 40% of screen
  drawMotion = drawMotion.translate(movePos, 0);
  // set up movement object
  var a = Ti.UI.createAnimation({
    // direction and extent
    transform: drawMotion,
    // duration in ms
    duration: 350,
    // don't reverse the animation
    autoreverse: false,
    // only animate once
    repeat: 1
  });
  // do the movement, calling back a 'cleanup' function once the aniumation is finished
  drawer.animate(a, function(){
    // if iOS (not Android) then move the focus out of the search box
    if (Ti.Platform.osname !== "android" && Ti.App.keyboardVisible) $.searchItemR.blur();
      // if the drawer has just closed, reset the zIndexes of each drawer to zero
      if (movePos === 0) {
        $.leftDrawer.zIndex = 0;
        $.rightDrawer.zIndex = 0;
      }
  });
}
/*
function animDone () {
  $.leftDrawer.applyProperties({
    visible: true,
  });
  $.listLeft.applyProperties({
    visible: true,
    defaultItemTemplate: "templateLeft",
    
  });
} */

/*
 * Determine the width of the slide in the animation function's ('anim') units. Depends on whether tablet (screen 
 * size >= 7 in or iPad) or handheld (screen size < 7 in or iPhone) and whether the OS is iOS or Android. The 
 * proportion of the slide must be less than 1 (typically 0.4 for a tablet and 0.7 for a handheld--CONSIDERATION? 
 * vary proportion by LANDSCAPE or PORTRAIT orientation). The amount of slide depends on the OS, being pixel
 * dependent for Android but not for iOS
 */
function slide(width) {
  // object to be returned
  var obj = {
    prop: 0.4,
    density: 1,
    dist: 100
  };
  //slightly different animation behaviour for Android and iOS
  if (Ti.Platform.osname == "android") {
    // Android moves by the number of actual screen pixels
    obj.density = Ti.Platform.displayCaps.dpi / 160;
    // get the diagonal size of the screen by adding the square of the two sides. Convert to inches by dividing 
    // pixels by dpi. 7-inch diagonal squared = 49.
    if (((Ti.Platform.displayCaps.platformHeight * Ti.Platform.displayCaps.platformHeight) /
      (Ti.Platform.displayCaps.dpi * Ti.Platform.displayCaps.dpi)) +
      ((Ti.Platform.displayCaps.platformWidth * Ti.Platform.displayCaps.platformWidth) /
      (Ti.Platform.displayCaps.dpi * Ti.Platform.displayCaps.dpi)) < 49) obj.prop = 0.7;      
    else obj.prop = 0.4;      
  } else {
    // iOS moves by the number of view pixels
    obj.density = 1;
    if (Ti.Platform.osname == "iphone") obj.prop = 0.7;
    else if (Ti.Platform.osname == "ipad") obj.prop = 0.4;
  }
  obj.dist = obj.prop * obj.density * $.index.rect.width;
  return obj;
}
/*
$.leftDrawer.addEventListener('postlayout',function (e) {
  countEvents[0] = countEvents[0] += 1;
  if (countEvents[0] == 4 && countEvents[1] == 4) alert('Ready.');
});

$.rightDrawer.addEventListener('postlayout', function(e) {
  countEvents[1] = countEvents[1] += 1;
  if (countEvents[0] == 4 && countEvents[1] == 4) alert("Ready.");
});

function layoutDone(e) {
  countEvents[0] = countEvents[0] += 1;
//  alert(countEvents[0]);
  if (countEvents[0] == 2) alert('Ready. [' + countEvents[0] + 'th time]');
}*/

/*
 * Click the left button. Determines whether drawer is already open and sets the visibility and starting positions
 */
function clickLeft(e) {
  if ($.leftDrawer.zIndex > $.rightDrawer.zIndex) anim($.centreBoard, 0);
  else {
    // shift the left drawer zIndex higher than the right drawer
    $.leftDrawer.zIndex = 3;
    $.rightDrawer.zIndex = 0;
    // slide the centre board over (right, +)
    anim($.centreBoard, slide().dist);         
  }
}

/*
 * Click the right button. Determines whether drawer is already open and sets the visibility and starting positions
 */
function clickRight(e) {
  if ($.rightDrawer.zIndex > $.leftDrawer.zIndex) anim($.centreBoard, 0);
  else {
    // shift the right drawer zIndex higher than the left drawer
    $.leftDrawer.zIndex = 0;
    $.rightDrawer.zIndex = 3;
    // slide the centre board over (left, -)
    anim($.centreBoard, -1 * slide().dist);    
  }
}

/*
 * Click anywhere on the centre board. Resets any open drawers. 
 */
function clickCentre(e) {
  // reset the centre board and reset the drawer zIndexes to 0
  if ($.leftDrawer.zIndex ===3 || $.rightDrawer.zIndex === 3) anim($.centreBoard, 0);
}

/*
 * When an item in the left drawer is selected, it places that item on the centre board header
 */
function doItemClickL(e) {
  //get the item from the event properties
  var item = e.section.getItemAt(e.itemIndex);
  if (e.sectionIndex === 0) {
    $.mapElement.visible = true;
    $.dataHolder.visible = false;
  } else {
    $.mapElement.visible = false;
    $.dataHolder.visible = true;
  };
  // set the page heading to the list item title
  $.labelCentreTitle.text = item.infoL.text;
  // close the drawer
  clickCentre();
}

/*
 * When an item in the right drawer is selected, it places that item on the centre board header
 */
function doItemClickR(e) {
  // get the item from the event properties
  var item = e.section.getItemAt(e.itemIndex);
  // set the page heading to the list item title
  $.labelCentreSubtitle.text = item.infoR.text;
  // close the drawer
  clickCentre();
}

/*
 * Initialise the drawer zIndexes the same, both behind the Centreboard 
 */
$.leftDrawer.zIndex = 0;
$.rightDrawer.zIndex = 0;
$.mapElement.visible = true;
$.dataHolder.visible = false;

/* 
 * Set the label on the About window with the version and build
 */
$.labelVersion.text = "myLIVING: mobile HEA platform, build " + Ti.App.getVersion() + "\n© Charles Rethman, Wahenga 2015";


/* Give the index tab window a global parent variable, so that it can be accessed from other windows;
 * it will be opened later from the login window. Call the function to open the intro window.
 */
Alloy.Globals.parent = $.index;
initWindow("intro");
