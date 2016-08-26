/*
 * Animate the centre board so it slides smoothly, revealing the drawer. The speed is set by the '
 * duration' property
 */
function anim (drawer, movePos) {
//    console.log("left top: " + $.listLeft.top + " left: " + $.listLeft.left + " Z(v): " + $.leftDrawer.zIndex + " Z(l): " + $.listLeft.zIndex);
//    console.log("right top: " + $.listRight.top + " right: " + $.listRight.right + " Z(v): " + $.rightDrawer.zIndex + " Z(l): " + $.listRight.zIndex);
    var drawMotion = Ti.UI.create2DMatrix();
    // move by (+ right, - left) 40% of screen
    drawMotion = drawMotion.translate(movePos, 0);
    // set up movement object
    var a = Ti.UI.createAnimation( {
        // direction and extent
        transform: drawMotion,
        // in ms
        duration: 250,
        // don't reverse the animation
        autoreverse: false,
        // only animate once
        repeat: 1
    } );
    // do the movement, calling 'finish' when done
    drawer.animate(a, finishAnim);
}

/*
 * Clean everything and set it right once the aniumation is finished. 'flag' variable determines 
 * whether the drawer has been opened or closed.
 * (flag == true --> opened)
 */
function finishAnim() {
    /* 
     * for iOS, check to see if the keyboard is still visible, remove it by blurring the focus from the search
     */
    if (Ti.Platform.osname !== "android" && Ti.App.keyboardVisible) $.searchItemR.blur();
}

/*
 * Determine the width of the slide in the animation function's ('anim') units. Depends on whether tablet (screen 
 * size >= 7 in or iPad) or handheld (screen size < 7 in or iPhone) and whether the OS is iOS or Android. The 
 * proportion of the slide must be less than 1 (typically 0.4 for a tablet and 0.7 for a handheld--CONSIDERATION? 
 * vary proportion by LANDSCAPE or PORTRAIT orientation). The amount of slide depends on the OS, being pixel
 * dependent for Android but not for iOS
 */
function slide(width) {
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
    obj.dist = obj.prop * obj.density * $.livelihood.rect.width;
    return obj;
}

/*
 * Click the left button. Determines whether drawer is already open and sets the visibility and starting positions
 */
function clickLeft(e) {
    if ($.leftDrawer.zIndex > $.rightDrawer.zIndex) {
        // reset the drawer indexes to 0
        $.leftDrawer.zIndex = 0;
        $.rightDrawer.zIndex = 0;
        $.listLeft.zIndex = 1;
        $.listRight.zIndex = 1;
        // move the centre board back (left, -)
        anim($.centreBoard, 0);
    } else {
        // Shift the left drawer zIndex higher than the right drawer
        $.rightDrawer.zIndex = 0;
        $.listRight.zIndex = 1;
        $.leftDrawer.zIndex = 3;
        $.listLeft.zIndex = 4;
        // slide the centre board over (right, +)
        anim($.centreBoard, slide().dist);         
    }
}

/*
 * Click the right button. Determines whether drawer is already open and sets the visibility and starting positions
 */
function clickRight(e) {
    if ($.rightDrawer.zIndex > $.leftDrawer.zIndex) {
        // reset the drawer indexes to 0
        $.leftDrawer.zIndex = 0;
        $.rightDrawer.zIndex = 0;
        $.listLeft.zIndex = 1;
        $.listRight.zIndex = 1;
        // move the centre board back (right, +)
        anim($.centreBoard, 0);
    } else {
        // Shift the right drawer zIndex higher than the left drawer
        $.leftDrawer.zIndex = 0;
        $.listLeft.zIndex = 1;
        $.rightDrawer.zIndex = 3;
        $.listRight.zIndex = 4;
        // slide the centre board over (left, -)
        anim($.centreBoard, -1 * slide().dist);    
    }
}

/*
 * Click anywhere on the centre board. Resets any open drawers. 
 */
function clickCentre(e) {
    // reset the centre board and reset the drawer zIndexes to 0, regardless 
    $.leftDrawer.zIndex = 0;
    $.rightDrawer.zIndex = 0;
    $.listLeft.zIndex = 1;
    $.listRight.zIndex = 1;
    anim($.centreBoard, 0);
}

/*
 * When an item in the left drawer is selected, it places that item on the centre board header
 */
function doItemClickL(e) {
    //Get the item from the event properties
    var item = e.section.getItemAt(e.itemIndex);
    //Set the page heading to the list item title
    $.labelCentreTitle.text = item.infoL.text;            
}

/*
 * When an item in the right drawer is selected, it places that item on the centre board header
 */
function doItemClickR(e) {
    //Get the item from the event properties
    var item = e.section.getItemAt(e.itemIndex);
    //Set the page heading to the list item title
    $.labelCentreSubtitle.text = item.infoR.text;            
}



var args = arguments[0] || {};

/*
 * Initialise the drawer zIndexes the same, both behind the Centreboard 
 */
$.leftDrawer.zIndex = 0;
$.rightDrawer.zIndex = 0;
$.listLeft.zIndex = 1;
$.listRight.zIndex = 1;