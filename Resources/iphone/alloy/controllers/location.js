function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doCloseWindow() {
        $.location.close();
    }
    function doRemovePin() {
        args.removeAnnotation = true;
        $.location.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "location";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.location = Ti.UI.createWindow({
        navBarHidden: true,
        backgroundColor: "#0f3c50",
        top: 0,
        left: 0,
        width: Titanium.UI.FILL,
        fullscreen: false,
        exitOnClose: false,
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        id: "location"
    });
    $.__views.location && $.addTopLevelView($.__views.location);
    $.__views.__alloyId134 = Ti.UI.createButton(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 18
            }
        });
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 22
            }
        });
        Alloy.deepExtend(true, o, {
            title: "Back",
            id: "__alloyId134"
        });
        return o;
    }());
    doCloseWindow ? $.addListener($.__views.__alloyId134, "click", doCloseWindow) : __defers["$.__views.__alloyId134!click!doCloseWindow"] = true;
    $.__views.location.leftNavButton = $.__views.__alloyId134;
    $.__views.dataEntry = Ti.UI.createView({
        top: 0,
        bottom: 0,
        id: "dataEntry"
    });
    $.__views.location.add($.__views.dataEntry);
    $.__views.labelInfo = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            left: 5,
            right: 5,
            textAlign: "center",
            color: "#dfb770",
            height: 100,
            wordWrap: true
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans-Light",
                fontSize: 16
            }
        });
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans-Light",
                fontSize: 32
            }
        });
        Alloy.deepExtend(true, o, {
            text: "This will be where you edit details",
            id: "labelInfo",
            top: "10%"
        });
        return o;
    }());
    $.__views.dataEntry.add($.__views.labelInfo);
    $.__views.labelPlace = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            left: 5,
            right: 5,
            textAlign: "center",
            color: "#dfb770",
            height: 100,
            wordWrap: true
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans-Light",
                fontSize: 16
            }
        });
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans-Light",
                fontSize: 32
            }
        });
        Alloy.deepExtend(true, o, {
            id: "labelPlace",
            top: "25%"
        });
        return o;
    }());
    $.__views.dataEntry.add($.__views.labelPlace);
    $.__views.labelLong = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            left: 5,
            right: 5,
            textAlign: "center",
            color: "#dfb770",
            height: 100,
            wordWrap: true
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 12
            }
        });
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 20
            }
        });
        Alloy.deepExtend(true, o, {
            text: "Longitude:",
            id: "labelLong",
            top: "40%"
        });
        return o;
    }());
    $.__views.dataEntry.add($.__views.labelLong);
    $.__views.labelLat = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            left: 5,
            right: 5,
            textAlign: "center",
            color: "#dfb770",
            height: 100,
            wordWrap: true
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 12
            }
        });
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 20
            }
        });
        Alloy.deepExtend(true, o, {
            text: "Latitude:",
            id: "labelLat",
            top: "50%"
        });
        return o;
    }());
    $.__views.dataEntry.add($.__views.labelLat);
    $.__views.removePin = Ti.UI.createButton(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 18
            }
        });
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 22
            }
        });
        Alloy.deepExtend(true, o, {
            height: "45dp",
            width: "30%",
            color: "#ffffff",
            backgroundColor: "#dfb770",
            title: "Remove Pin",
            id: "removePin",
            top: "65%"
        });
        return o;
    }());
    $.__views.dataEntry.add($.__views.removePin);
    doRemovePin ? $.addListener($.__views.removePin, "click", doRemovePin) : __defers["$.__views.removePin!click!doRemovePin"] = true;
    $.__views.close = Ti.UI.createButton(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 18
            }
        });
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 22
            }
        });
        Alloy.deepExtend(true, o, {
            height: "45dp",
            width: "30%",
            color: "#ffffff",
            backgroundColor: "#149b8c",
            title: "Close",
            id: "close",
            top: "75%"
        });
        return o;
    }());
    $.__views.dataEntry.add($.__views.close);
    doCloseWindow ? $.addListener($.__views.close, "click", doCloseWindow) : __defers["$.__views.close!click!doCloseWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    if ("{}" === JSON.stringify(args)) $.labelInfo.text = $.labelInfo.text + " about the location."; else {
        $.labelInfo.text = $.labelInfo.text + " about location #" + (args.annotationId + 1) + ".";
        $.labelPlace.text = args.annotationSubtitle;
        $.labelLong.text = $.labelLong.text + " " + Math.round(1e4 * args.annotationLong) / 1e4;
        $.labelLat.text = $.labelLat.text + " " + Math.round(1e4 * args.annotationLat) / 1e4;
    }
    $.location.open();
    __defers["$.__views.__alloyId134!click!doCloseWindow"] && $.addListener($.__views.__alloyId134, "click", doCloseWindow);
    __defers["$.__views.removePin!click!doRemovePin"] && $.addListener($.__views.removePin, "click", doRemovePin);
    __defers["$.__views.close!click!doCloseWindow"] && $.addListener($.__views.close, "click", doCloseWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;