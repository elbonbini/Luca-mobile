function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doClick(e) {
        if ("newUserButton" === e.source.id) {
            {
                Alloy.createController("register");
            }
            $.login.add("register");
            $.newUserGroup.visible = false;
        } else if ("forgotPasswordButton" === e.source.id) alert("An email will be sent to your address."); else {
            Alloy.Globals.parent.open({
                exitOnClose: true
            });
            $.login.close();
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
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
    $.__views.login = Ti.UI.createWindow({
        backgroundColor: "#0f3c50",
        top: 0,
        left: 0,
        width: Titanium.UI.FILL,
        fullscreen: false,
        exitOnClose: false,
        navBarHidden: true,
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        id: "login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    $.__views.centreScroll = Ti.UI.createScrollView({
        top: "5%",
        height: "100%",
        left: 10,
        right: 10,
        id: "centreScroll"
    });
    $.__views.login.add($.__views.centreScroll);
    $.__views.__alloyId135 = Ti.UI.createImageView({
        opacity: .25,
        center: {
            y: "50%"
        },
        height: 18,
        left: 8,
        width: 18,
        image: "images/envelope.png",
        id: "__alloyId135"
    });
    $.__views.emailText = Ti.UI.createTextField({
        center: {
            x: "50%"
        },
        width: "85%",
        height: "40dp",
        paddingLeft: 30,
        paddingRight: 7,
        backgroundColor: "#a6a7a9",
        borderColor: "#646567",
        color: "#dfdedf",
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
        autocorrect: false,
        keyboardType: Ti.UI.KEYBOARD_TYPE_EMAIL,
        id: "emailText",
        top: "7%",
        hintText: "Your email address"
    });
    $.__views.centreScroll.add($.__views.emailText);
    $.__views.emailText.add($.__views.__alloyId135);
    $.__views.__alloyId135 = Ti.UI.createImageView({
        opacity: .25,
        center: {
            y: "50%"
        },
        height: 18,
        left: 8,
        width: 18,
        image: "images/envelope.png",
        id: "__alloyId135"
    });
    $.__views.emailText.add($.__views.__alloyId135);
    $.__views.__alloyId136 = Ti.UI.createImageView({
        opacity: .25,
        center: {
            y: "50%"
        },
        height: 18,
        left: 8,
        width: 18,
        image: "images/locked.png",
        id: "__alloyId136"
    });
    $.__views.passwordText = Ti.UI.createTextField({
        center: {
            x: "50%"
        },
        width: "85%",
        height: "40dp",
        paddingLeft: 30,
        paddingRight: 7,
        backgroundColor: "#a6a7a9",
        borderColor: "#646567",
        color: "#dfdedf",
        passwordMask: true,
        id: "passwordText",
        top: "17%",
        hintText: "Your password"
    });
    $.__views.centreScroll.add($.__views.passwordText);
    $.__views.passwordText.add($.__views.__alloyId136);
    $.__views.__alloyId136 = Ti.UI.createImageView({
        opacity: .25,
        center: {
            y: "50%"
        },
        height: 18,
        left: 8,
        width: 18,
        image: "images/locked.png",
        id: "__alloyId136"
    });
    $.__views.passwordText.add($.__views.__alloyId136);
    $.__views.loginGroup = Ti.UI.createView({
        center: {
            x: "50%"
        },
        width: 280,
        top: "30%",
        height: "45dp",
        layout: "horizontal",
        id: "loginGroup"
    });
    $.__views.centreScroll.add($.__views.loginGroup);
    $.__views.loginButton = Ti.UI.createButton(function() {
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
            left: 0,
            width: "40%",
            height: "45dp",
            backgroundColor: "#149b8c",
            color: "#ffffff",
            shadowColor: "#b4b5b7",
            shadowRadius: 5,
            title: "Get Going",
            id: "loginButton"
        });
        return o;
    }());
    $.__views.loginGroup.add($.__views.loginButton);
    doClick ? $.addListener($.__views.loginButton, "click", doClick) : __defers["$.__views.loginButton!click!doClick"] = true;
    $.__views.forgotPasswordButton = Ti.UI.createButton(function() {
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
            right: 0,
            width: "60%",
            height: "45dp",
            backgroundColor: "#dfb770",
            color: "#ffffff",
            title: "Forgot Password?",
            id: "forgotPasswordButton"
        });
        return o;
    }());
    $.__views.loginGroup.add($.__views.forgotPasswordButton);
    doClick ? $.addListener($.__views.forgotPasswordButton, "click", doClick) : __defers["$.__views.forgotPasswordButton!click!doClick"] = true;
    $.__views.newUserGroup = Ti.UI.createView({
        centre: {
            x: "50%"
        },
        width: "90%",
        top: "44%",
        height: 90,
        layout: "vertical",
        id: "newUserGroup"
    });
    $.__views.centreScroll.add($.__views.newUserGroup);
    $.__views.__alloyId137 = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            color: "#dfb770"
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            height: "30dp",
            font: {
                fontFamily: "GillSans-Light",
                fontSize: 16
            }
        });
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            height: "40dp",
            font: {
                fontFamily: "GillSans-Light",
                fontSize: 20
            }
        });
        Alloy.deepExtend(true, o, {
            text: "New to myLIVING?",
            width: "100%",
            id: "__alloyId137"
        });
        return o;
    }());
    $.__views.newUserGroup.add($.__views.__alloyId137);
    $.__views.newUserButton = Ti.UI.createButton(function() {
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
            backgroundColor: "#dfb770",
            color: "#ffffff",
            width: 220,
            height: "45dp",
            title: "Join up",
            id: "newUserButton"
        });
        return o;
    }());
    $.__views.newUserGroup.add($.__views.newUserButton);
    doClick ? $.addListener($.__views.newUserButton, "click", doClick) : __defers["$.__views.newUserButton!click!doClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.login.open();
    __defers["$.__views.loginButton!click!doClick"] && $.addListener($.__views.loginButton, "click", doClick);
    __defers["$.__views.forgotPasswordButton!click!doClick"] && $.addListener($.__views.forgotPasswordButton, "click", doClick);
    __defers["$.__views.newUserButton!click!doClick"] && $.addListener($.__views.newUserButton, "click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;