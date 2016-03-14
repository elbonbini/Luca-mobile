function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function anim(drawer, movePos) {
        var drawMotion = Ti.UI.create2DMatrix();
        drawMotion = drawMotion.translate(movePos, 0);
        var a = Ti.UI.createAnimation({
            transform: drawMotion,
            duration: 250,
            autoreverse: false,
            repeat: 1
        });
        drawer.animate(a, finishAnim);
    }
    function finishAnim() {
        "android" !== Ti.Platform.osname && Ti.App.keyboardVisible && $.searchItemR.blur();
    }
    function slide() {
        var obj = {
            prop: .4,
            density: 1,
            dist: 100
        };
        if ("android" == Ti.Platform.osname) {
            obj.density = Ti.Platform.displayCaps.dpi / 160;
            obj.prop = Ti.Platform.displayCaps.platformHeight * Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.dpi * Ti.Platform.displayCaps.dpi) + Ti.Platform.displayCaps.platformWidth * Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi * Ti.Platform.displayCaps.dpi) < 49 ? .7 : .4;
        } else {
            obj.density = 1;
            "iphone" == Ti.Platform.osname ? obj.prop = .7 : "ipad" == Ti.Platform.osname && (obj.prop = .4);
        }
        obj.dist = obj.prop * obj.density * $.livelihood.rect.width;
        return obj;
    }
    function clickLeft() {
        if ($.leftDrawer.zIndex > $.rightDrawer.zIndex) {
            $.leftDrawer.zIndex = 0;
            $.rightDrawer.zIndex = 0;
            $.listLeft.zIndex = 1;
            $.listRight.zIndex = 1;
            anim($.centreBoard, 0);
        } else {
            $.rightDrawer.zIndex = 0;
            $.listRight.zIndex = 1;
            $.leftDrawer.zIndex = 3;
            $.listLeft.zIndex = 4;
            anim($.centreBoard, slide().dist);
        }
    }
    function clickRight() {
        if ($.rightDrawer.zIndex > $.leftDrawer.zIndex) {
            $.leftDrawer.zIndex = 0;
            $.rightDrawer.zIndex = 0;
            $.listLeft.zIndex = 1;
            $.listRight.zIndex = 1;
            anim($.centreBoard, 0);
        } else {
            $.leftDrawer.zIndex = 0;
            $.listLeft.zIndex = 1;
            $.rightDrawer.zIndex = 3;
            $.listRight.zIndex = 4;
            anim($.centreBoard, -1 * slide().dist);
        }
    }
    function clickCentre() {
        $.leftDrawer.zIndex = 0;
        $.rightDrawer.zIndex = 0;
        $.listLeft.zIndex = 1;
        $.listRight.zIndex = 1;
        anim($.centreBoard, 0);
    }
    function doItemClickL(e) {
        var item = e.section.getItemAt(e.itemIndex);
        $.labelCentreTitle.text = item.infoL.text;
    }
    function doItemClickR(e) {
        var item = e.section.getItemAt(e.itemIndex);
        $.labelCentreSubtitle.text = item.infoR.text;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "livelihood";
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
    $.__views.livelihood = Ti.UI.createWindow({
        backgroundColor: "#0f3c50",
        top: 0,
        left: 0,
        width: Titanium.UI.FILL,
        fullscreen: false,
        exitOnClose: false,
        navBarHidden: true,
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        id: "livelihood"
    });
    $.__views.livelihood && $.addTopLevelView($.__views.livelihood);
    $.__views.centreBoard = Ti.UI.createView({
        backgroundColor: "#e3e4e6",
        viewShadowColor: "#020202",
        viewShadowRadius: "20%",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 5,
        id: "centreBoard"
    });
    $.__views.livelihood.add($.__views.centreBoard);
    $.__views.centreHeader = Ti.UI.createView({
        backgroundColor: "#2f5c70",
        borderColor: "#646567",
        borderWidth: .25,
        top: 0,
        left: 0,
        width: "100%",
        height: 76,
        id: "centreHeader"
    });
    $.__views.centreBoard.add($.__views.centreHeader);
    $.__views.leftDrawerImage = Ti.UI.createImageView({
        top: 28,
        width: "36dip",
        height: "36dip",
        selectedColor: "#646567",
        tintColor: "#aaaaaa",
        left: 10,
        image: "images/spiral_orange.png",
        id: "leftDrawerImage"
    });
    $.__views.centreHeader.add($.__views.leftDrawerImage);
    clickLeft ? $.addListener($.__views.leftDrawerImage, "click", clickLeft) : __defers["$.__views.leftDrawerImage!click!clickLeft"] = true;
    $.__views.centreHeaderArea = Ti.UI.createView({
        top: 20,
        left: 60,
        right: 60,
        height: 56,
        id: "centreHeaderArea"
    });
    $.__views.centreHeader.add($.__views.centreHeaderArea);
    clickCentre ? $.addListener($.__views.centreHeaderArea, "click", clickCentre) : __defers["$.__views.centreHeaderArea!click!clickCentre"] = true;
    $.__views.labelCentreTitle = Ti.UI.createLabel({
        top: 4,
        color: "#dfb770",
        font: {
            fontFamily: "GillSans-Light",
            fontSize: 28
        },
        text: "Welcome!",
        id: "labelCentreTitle"
    });
    $.__views.centreHeaderArea.add($.__views.labelCentreTitle);
    $.__views.labelCentreSubtitle = Ti.UI.createLabel({
        top: 34,
        color: "#dfb770",
        font: {
            fontFamily: "GillSans-Light",
            fontSize: 18
        },
        text: "Click either side button",
        id: "labelCentreSubtitle"
    });
    $.__views.centreHeaderArea.add($.__views.labelCentreSubtitle);
    $.__views.rightDrawerImage = Ti.UI.createImageView({
        top: 28,
        width: "36dip",
        height: "36dip",
        selectedColor: "#646567",
        tintColor: "#aaaaaa",
        right: 10,
        image: "images/stars.png",
        id: "rightDrawerImage"
    });
    $.__views.centreHeader.add($.__views.rightDrawerImage);
    clickRight ? $.addListener($.__views.rightDrawerImage, "click", clickRight) : __defers["$.__views.rightDrawerImage!click!clickRight"] = true;
    $.__views.centreBody = Ti.UI.createView({
        top: 76,
        left: 0,
        width: "100%",
        bottom: 0,
        id: "centreBody"
    });
    $.__views.centreBoard.add($.__views.centreBody);
    clickCentre ? $.addListener($.__views.centreBody, "click", clickCentre) : __defers["$.__views.centreBody!click!clickCentre"] = true;
    var __alloyId84 = [];
    $.__views.__alloyId85 = {
        properties: {
            title: "Data ...",
            id: "__alloyId85"
        }
    };
    __alloyId84.push($.__views.__alloyId85);
    $.__views.__alloyId86 = {
        properties: {
            title: "Data ...",
            id: "__alloyId86"
        }
    };
    __alloyId84.push($.__views.__alloyId86);
    $.__views.__alloyId87 = {
        properties: {
            id: "__alloyId87"
        }
    };
    __alloyId84.push($.__views.__alloyId87);
    $.__views.__alloyId88 = {
        properties: {
            id: "__alloyId88"
        }
    };
    __alloyId84.push($.__views.__alloyId88);
    $.__views.__alloyId89 = {
        properties: {
            id: "__alloyId89"
        }
    };
    __alloyId84.push($.__views.__alloyId89);
    $.__views.__alloyId90 = {
        properties: {
            id: "__alloyId90"
        }
    };
    __alloyId84.push($.__views.__alloyId90);
    $.__views.__alloyId91 = {
        properties: {
            id: "__alloyId91"
        }
    };
    __alloyId84.push($.__views.__alloyId91);
    $.__views.__alloyId92 = {
        properties: {
            id: "__alloyId92"
        }
    };
    __alloyId84.push($.__views.__alloyId92);
    $.__views.__alloyId93 = {
        properties: {
            id: "__alloyId93"
        }
    };
    __alloyId84.push($.__views.__alloyId93);
    $.__views.__alloyId94 = {
        properties: {
            id: "__alloyId94"
        }
    };
    __alloyId84.push($.__views.__alloyId94);
    $.__views.__alloyId82 = Ti.UI.createListSection({
        id: "__alloyId82"
    });
    $.__views.__alloyId82.items = __alloyId84;
    var __alloyId95 = [];
    __alloyId95.push($.__views.__alloyId82);
    $.__views.listLivelihood = Ti.UI.createListView({
        top: "1%",
        left: "1%",
        height: "60%",
        width: "98%",
        backgroundColor: "#ffffff",
        bubbleParent: true,
        sections: __alloyId95,
        id: "listLivelihood"
    });
    $.__views.centreBody.add($.__views.listLivelihood);
    clickCentre ? $.addListener($.__views.listLivelihood, "itemclick", clickCentre) : __defers["$.__views.listLivelihood!itemclick!clickCentre"] = true;
    $.__views.imageGraph = Ti.UI.createImageView({
        top: "62%",
        height: "36%",
        center: {
            x: "50%"
        },
        width: "75%",
        image: "images/zalof_sf.png",
        id: "imageGraph"
    });
    $.__views.centreBody.add($.__views.imageGraph);
    $.__views.leftDrawer = Ti.UI.createView(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            left: 0,
            top: 0,
            height: Titanium.UI.FILL,
            backgroundColor: "#0f3c50"
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            width: "70%"
        });
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            width: "40%"
        });
        Alloy.deepExtend(true, o, {
            id: "leftDrawer"
        });
        return o;
    }());
    $.__views.livelihood.add($.__views.leftDrawer);
    $.__views.__alloyId97 = Ti.UI.createView({
        height: "70dp",
        id: "__alloyId97"
    });
    $.__views.headerTitleL = Ti.UI.createLabel({
        font: {
            fontFamily: "GillSans-Light",
            fontSize: "24dp"
        },
        backgroundColor: "#0f3c50",
        color: "#dfb770",
        left: "10dp",
        top: 20,
        text: "Interview Level",
        id: "headerTitleL"
    });
    $.__views.__alloyId97.add($.__views.headerTitleL);
    var __alloyId98 = {};
    var __alloyId100 = [];
    var __alloyId101 = {
        type: "Ti.UI.Label",
        bindId: "infoL",
        properties: {
            font: {
                fontFamily: "GillSans-Light",
                fontSize: "20dp"
            },
            color: "#dfb770",
            left: "30dp",
            top: 0,
            bindId: "infoL",
            visible: "true"
        }
    };
    __alloyId100.push(__alloyId101);
    var __alloyId102 = {
        type: "Ti.UI.Label",
        bindId: "es_infoL",
        properties: {
            font: {
                fontFamily: "GillSans-Light",
                fontSize: "14dp"
            },
            color: "#ffffff",
            left: "30dp",
            top: "25dp",
            bindId: "es_infoL",
            visible: "true"
        }
    };
    __alloyId100.push(__alloyId102);
    var __alloyId99 = {
        properties: {
            name: "templateL"
        },
        childTemplates: __alloyId100
    };
    __alloyId98["templateL"] = __alloyId99;
    var __alloyId105 = [];
    $.__views.__alloyId106 = {
        properties: {
            backgroundColor: "#0f3c50",
            id: "__alloyId106"
        },
        infoL: {
            text: "Livelihood Zone"
        },
        es_infoL: {
            text: "Geography: environment, markets"
        }
    };
    __alloyId105.push($.__views.__alloyId106);
    $.__views.__alloyId107 = {
        properties: {
            backgroundColor: "#0f3c50",
            id: "__alloyId107"
        },
        infoL: {
            text: "Community"
        },
        es_infoL: {
            text: "Location: activites, seasonality, wealth"
        }
    };
    __alloyId105.push($.__views.__alloyId107);
    $.__views.__alloyId108 = {
        properties: {
            backgroundColor: "#0f3c50",
            id: "__alloyId108"
        },
        infoL: {
            text: "Household"
        },
        es_infoL: {
            text: "Livelihood strategies"
        }
    };
    __alloyId105.push($.__views.__alloyId108);
    $.__views.__alloyId109 = {
        properties: {
            backgroundColor: "#0f3c50",
            id: "__alloyId109"
        },
        infoL: {
            text: "Commodities"
        },
        es_infoL: {
            text: "Measurement units, values, prices"
        }
    };
    __alloyId105.push($.__views.__alloyId109);
    $.__views.__alloyId103 = Ti.UI.createListSection({
        id: "__alloyId103"
    });
    $.__views.__alloyId103.items = __alloyId105;
    var __alloyId110 = [];
    __alloyId110.push($.__views.__alloyId103);
    $.__views.listLeft = Ti.UI.createListView({
        top: 0,
        left: 0,
        layout: "vertical",
        visible: true,
        lifecycleContainer: "livelihood",
        backgroundColor: "#0f3c50",
        width: "100%",
        height: "100%",
        sections: __alloyId110,
        templates: __alloyId98,
        headerView: $.__views.__alloyId97,
        id: "listLeft",
        defaultItemTemplate: "templateL"
    });
    $.__views.leftDrawer.add($.__views.listLeft);
    doItemClickL ? $.addListener($.__views.listLeft, "itemclick", doItemClickL) : __defers["$.__views.listLeft!itemclick!doItemClickL"] = true;
    $.__views.rightDrawer = Ti.UI.createView(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            right: 0,
            top: 0,
            height: Titanium.UI.FILL,
            backgroundColor: "#adaaab"
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            width: "70%"
        });
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            width: "40%"
        });
        Alloy.deepExtend(true, o, {
            id: "rightDrawer"
        });
        return o;
    }());
    $.__views.livelihood.add($.__views.rightDrawer);
    $.__views.searchItemR = Ti.UI.createSearchBar({
        id: "searchItemR",
        barColor: "#adaaab"
    });
    $.__views.__alloyId112 = Ti.UI.createView({
        height: "70dp",
        id: "__alloyId112"
    });
    $.__views.headerTitleR = Ti.UI.createLabel({
        color: "#0f3c50",
        left: "10dp",
        top: 0,
        text: "Livelihood categories",
        id: "headerTitleR"
    });
    $.__views.__alloyId112.add($.__views.headerTitleR);
    var __alloyId113 = {};
    var __alloyId116 = [];
    var __alloyId117 = {
        type: "Ti.UI.Label",
        bindId: "infoR",
        properties: {
            font: {
                fontFamily: "GillSans-Light",
                fontSize: "20dp"
            },
            color: "#0f3c50",
            left: "30dp",
            top: 0,
            bindId: "infoR"
        }
    };
    __alloyId116.push(__alloyId117);
    var __alloyId118 = {
        type: "Ti.UI.Label",
        bindId: "es_infoR",
        properties: {
            font: {
                fontFamily: "GillSans-Light",
                fontSize: "14dp"
            },
            color: "#ffffff",
            left: "30dp",
            top: "25dp",
            bindId: "es_infoR"
        }
    };
    __alloyId116.push(__alloyId118);
    var __alloyId115 = {
        properties: {
            name: "templateR"
        },
        childTemplates: __alloyId116
    };
    __alloyId113["templateR"] = __alloyId115;
    var __alloyId121 = [];
    $.__views.__alloyId122 = {
        properties: {
            backgroundColor: "#adaaab",
            searchableText: "livestock, cattle, pigs, sheep, goats, chickens, camels, milk, dairy, ghee, meat, animal",
            id: "__alloyId122"
        },
        infoR: {
            text: "Livestock"
        },
        es_infoR: {
            text: "Dairy, meat, animal sales"
        }
    };
    __alloyId121.push($.__views.__alloyId122);
    $.__views.__alloyId123 = {
        properties: {
            backgroundColor: "#adaaab",
            searchableText: "crops, maize, beans, legumes, pulses, fruit, vegetables, tomatoes, onions, cabbage, yield, tobacco, sorghum, millet, cash",
            id: "__alloyId123"
        },
        infoR: {
            text: "Crops"
        },
        es_infoR: {
            text: "Staple, non-staple, cash crops"
        }
    };
    __alloyId121.push($.__views.__alloyId123);
    $.__views.__alloyId124 = {
        properties: {
            backgroundColor: "#adaaab",
            searchableText: "maize, sorghum, millet, cassava, rice, bread, wheat",
            id: "__alloyId124"
        },
        infoR: {
            text: "Staple Food Purchase"
        },
        es_infoR: {
            text: "Grains, cereals, tubers"
        }
    };
    __alloyId121.push($.__views.__alloyId124);
    $.__views.__alloyId125 = {
        properties: {
            backgroundColor: "#adaaab",
            searchableText: "meat, pulses, legumes, dairy, fruit, vegetables",
            id: "__alloyId125"
        },
        infoR: {
            text: "Non-Staple Basic Food Purchase"
        },
        es_infoR: {
            text: "Meat, dairy, legumes, fruit, veg"
        }
    };
    __alloyId121.push($.__views.__alloyId125);
    $.__views.__alloyId126 = {
        properties: {
            backgroundColor: "#adaaab",
            searchableText: "labour, clearing, land preparation, weeding, harvesting, mudding, thatching",
            id: "__alloyId126"
        },
        infoR: {
            text: "Casual Employment"
        },
        es_infoR: {
            text: "Agricultural, domestic, constuction"
        }
    };
    __alloyId121.push($.__views.__alloyId126);
    $.__views.__alloyId127 = {
        properties: {
            backgroundColor: "#adaaab",
            searchableText: "job, contract, civil, service, full time",
            id: "__alloyId127"
        },
        infoR: {
            text: "Formal Employment"
        },
        es_infoR: {
            text: "Job, contract"
        }
    };
    __alloyId121.push($.__views.__alloyId127);
    $.__views.__alloyId128 = {
        properties: {
            backgroundColor: "#adaaab",
            id: "__alloyId128"
        },
        infoR: {
            text: "Self-Employment"
        },
        es_infoR: {
            text: "Collection, crafts"
        }
    };
    __alloyId121.push($.__views.__alloyId128);
    $.__views.__alloyId129 = {
        properties: {
            backgroundColor: "#adaaab",
            id: "__alloyId129"
        },
        infoR: {
            text: "Small business"
        },
        es_infoR: {
            text: "Trading, hiring, services"
        }
    };
    __alloyId121.push($.__views.__alloyId129);
    $.__views.__alloyId130 = {
        properties: {
            backgroundColor: "#adaaab",
            id: "__alloyId130"
        },
        infoR: {
            text: "Formal Support"
        },
        es_infoR: {
            text: "Social development, grants, loans"
        }
    };
    __alloyId121.push($.__views.__alloyId130);
    $.__views.__alloyId131 = {
        properties: {
            backgroundColor: "#adaaab",
            id: "__alloyId131"
        },
        infoR: {
            text: "Informal Support"
        },
        es_infoR: {
            text: "Gifts, loans, remittances"
        }
    };
    __alloyId121.push($.__views.__alloyId131);
    $.__views.__alloyId119 = Ti.UI.createListSection({
        id: "__alloyId119"
    });
    $.__views.__alloyId119.items = __alloyId121;
    var __alloyId132 = [];
    __alloyId132.push($.__views.__alloyId119);
    $.__views.listRight = Ti.UI.createListView({
        top: 0,
        left: 0,
        layout: "vertical",
        visible: true,
        lifecycleContainer: "livelihood",
        backgroundColor: "#adaaab",
        right: 0,
        width: "100%",
        height: "100%",
        sections: __alloyId132,
        templates: __alloyId113,
        searchView: $.__views.searchItemR,
        headerView: $.__views.__alloyId112,
        id: "listRight",
        defaultItemTemplate: "templateR"
    });
    $.__views.rightDrawer.add($.__views.listRight);
    doItemClickR ? $.addListener($.__views.listRight, "itemclick", doItemClickR) : __defers["$.__views.listRight!itemclick!doItemClickR"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.leftDrawer.zIndex = 0;
    $.rightDrawer.zIndex = 0;
    $.listLeft.zIndex = 1;
    $.listRight.zIndex = 1;
    __defers["$.__views.leftDrawerImage!click!clickLeft"] && $.addListener($.__views.leftDrawerImage, "click", clickLeft);
    __defers["$.__views.centreHeaderArea!click!clickCentre"] && $.addListener($.__views.centreHeaderArea, "click", clickCentre);
    __defers["$.__views.rightDrawerImage!click!clickRight"] && $.addListener($.__views.rightDrawerImage, "click", clickRight);
    __defers["$.__views.centreBody!click!clickCentre"] && $.addListener($.__views.centreBody, "click", clickCentre);
    __defers["$.__views.listLivelihood!itemclick!clickCentre"] && $.addListener($.__views.listLivelihood, "itemclick", clickCentre);
    __defers["$.__views.listLeft!itemclick!doItemClickL"] && $.addListener($.__views.listLeft, "itemclick", doItemClickL);
    __defers["$.__views.listRight!itemclick!doItemClickR"] && $.addListener($.__views.listRight, "itemclick", doItemClickR);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;