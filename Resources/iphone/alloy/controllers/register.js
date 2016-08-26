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
        if ("regButton" === e.source.id) if (validatePasswords(hashKey, $.fPasswordText.value, $.sPasswordText.value)) if (validateEmail($.emailText.value)) $.register.close(); else {
            $.emailWarningLabel.text = "Please make sure your email is valid";
            $.emailText.value = null;
        } else {
            $.passwordWarningLabel.text = "Please make sure your passwords are the same";
            $.fPasswordText.value = null;
            $.sPasswordText.value = null;
        }
    }
    function doChkPasswords() {
        if (validatePasswords(hashKey, $.fPasswordText.value, $.sPasswordText.value)) {
            $.sPasswordText.borderColor = "#646567";
            $.passwordWarningLabel.text = "";
        } else {
            $.sPasswordText.borderColor = "red";
            $.passwordWarningLabel.text = "Your passwords are different or missing";
        }
    }
    function doChkEmail() {
        if (validateEmail($.emailText.value)) {
            $.emailText.borderColor = "#646567";
            $.emailWarningLabel.text = "";
        } else {
            $.emailText.borderColor = "red";
            $.emailWarningLabel.text = "Not (yet) a valid email address";
        }
    }
    function validatePasswords(key, pword1, pword2) {
        return 0 === pword1.length || 0 === pword2.length ? false : sha1.str_hmac_sha1(key, pword1) === sha1.str_hmac_sha1(key, pword2);
    }
    function validateEmail(address) {
        if (0 == address.length) return false;
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        return re.test(address);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "register";
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
    $.__views.register = Ti.UI.createWindow({
        backgroundColor: "#0f3c50",
        top: 0,
        left: 0,
        width: Titanium.UI.FILL,
        fullscreen: "False",
        exitOnClose: false,
        navBarHidden: true,
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        id: "register"
    });
    $.__views.register && $.addTopLevelView($.__views.register);
    $.__views.centreScroll = Ti.UI.createScrollView({
        center: {
            x: "50%"
        },
        top: "5%",
        height: "130%",
        left: 0,
        width: Titanium.UI.FILL,
        id: "centreScroll"
    });
    $.__views.register.add($.__views.centreScroll);
    $.__views.__alloyId145 = Ti.UI.createImageView({
        opacity: .25,
        center: {
            y: "50%"
        },
        height: 18,
        left: 6,
        width: 18,
        hires: true,
        image: "images/envelope.png",
        id: "__alloyId145"
    });
    $.__views.emailText = Ti.UI.createTextField({
        center: {
            x: "50%"
        },
        width: "85%",
        paddingLeft: 30,
        paddingRight: 7,
        height: "40dp",
        backgroundColor: "#a6a7a9",
        borderColor: "#646567",
        color: "#dfdedf",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
        autocorrect: false,
        keyboardType: Ti.UI.KEYBOARD_TYPE_EMAIL,
        id: "emailText",
        top: "5%",
        hintText: "A valid email address"
    });
    $.__views.centreScroll.add($.__views.emailText);
    $.__views.emailText.add($.__views.__alloyId145);
    doChkEmail ? $.addListener($.__views.emailText, "change", doChkEmail) : __defers["$.__views.emailText!change!doChkEmail"] = true;
    $.__views.__alloyId145 = Ti.UI.createImageView({
        opacity: .25,
        center: {
            y: "50%"
        },
        height: 18,
        left: 6,
        width: 18,
        hires: true,
        image: "images/envelope.png",
        id: "__alloyId145"
    });
    $.__views.emailText.add($.__views.__alloyId145);
    $.__views.emailWarningLabel = Ti.UI.createLabel({
        center: {
            x: "50%"
        },
        width: "85%",
        color: "red",
        height: Titanium.UI.SIZE,
        id: "emailWarningLabel",
        top: "12%"
    });
    $.__views.centreScroll.add($.__views.emailWarningLabel);
    $.__views.__alloyId146 = Ti.UI.createImageView({
        opacity: .25,
        center: {
            y: "50%"
        },
        height: 18,
        left: 6,
        width: 18,
        hires: true,
        image: "images/user-card.png",
        id: "__alloyId146"
    });
    $.__views.employer = Ti.UI.createTextField({
        center: {
            x: "50%"
        },
        width: "85%",
        paddingLeft: 30,
        paddingRight: 7,
        height: "40dp",
        backgroundColor: "#a6a7a9",
        borderColor: "#646567",
        color: "#dfdedf",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "employer",
        top: "22%",
        hintText: "Who you work for - 'self' or leave blank if you're on your own"
    });
    $.__views.centreScroll.add($.__views.employer);
    $.__views.employer.add($.__views.__alloyId146);
    $.__views.__alloyId146 = Ti.UI.createImageView({
        opacity: .25,
        center: {
            y: "50%"
        },
        height: 18,
        left: 6,
        width: 18,
        hires: true,
        image: "images/user-card.png",
        id: "__alloyId146"
    });
    $.__views.employer.add($.__views.__alloyId146);
    $.__views.__alloyId147 = Ti.UI.createImageView({
        opacity: .25,
        center: {
            y: "50%"
        },
        height: 18,
        left: 6,
        width: 18,
        hires: true,
        image: "images/key-2.png",
        id: "__alloyId147"
    });
    $.__views.fPasswordText = Ti.UI.createTextField({
        center: {
            x: "50%"
        },
        width: "85%",
        paddingLeft: 30,
        paddingRight: 7,
        height: "40dp",
        backgroundColor: "#a6a7a9",
        borderColor: "#646567",
        color: "#dfdedf",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        passwordMask: true,
        id: "fPasswordText",
        top: "30%",
        hintText: "Choose a password"
    });
    $.__views.centreScroll.add($.__views.fPasswordText);
    $.__views.fPasswordText.add($.__views.__alloyId147);
    doChkPasswords ? $.addListener($.__views.fPasswordText, "change", doChkPasswords) : __defers["$.__views.fPasswordText!change!doChkPasswords"] = true;
    $.__views.__alloyId147 = Ti.UI.createImageView({
        opacity: .25,
        center: {
            y: "50%"
        },
        height: 18,
        left: 6,
        width: 18,
        hires: true,
        image: "images/key-2.png",
        id: "__alloyId147"
    });
    $.__views.fPasswordText.add($.__views.__alloyId147);
    $.__views.__alloyId148 = Ti.UI.createImageView({
        opacity: .25,
        center: {
            y: "50%"
        },
        height: 18,
        left: 6,
        width: 18,
        hires: true,
        image: "images/tick.png",
        id: "__alloyId148"
    });
    $.__views.sPasswordText = Ti.UI.createTextField({
        center: {
            x: "50%"
        },
        width: "85%",
        paddingLeft: 30,
        paddingRight: 7,
        height: "40dp",
        backgroundColor: "#a6a7a9",
        borderColor: "#646567",
        color: "#dfdedf",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        passwordMask: true,
        id: "sPasswordText",
        top: "38%",
        hintText: "Re-enter your password"
    });
    $.__views.centreScroll.add($.__views.sPasswordText);
    $.__views.sPasswordText.add($.__views.__alloyId148);
    doChkPasswords ? $.addListener($.__views.sPasswordText, "change", doChkPasswords) : __defers["$.__views.sPasswordText!change!doChkPasswords"] = true;
    $.__views.__alloyId148 = Ti.UI.createImageView({
        opacity: .25,
        center: {
            y: "50%"
        },
        height: 18,
        left: 6,
        width: 18,
        hires: true,
        image: "images/tick.png",
        id: "__alloyId148"
    });
    $.__views.sPasswordText.add($.__views.__alloyId148);
    $.__views.passwordWarningLabel = Ti.UI.createLabel({
        center: {
            x: "50%"
        },
        width: "85%",
        color: "red",
        height: Titanium.UI.SIZE,
        id: "passwordWarningLabel",
        top: "45%"
    });
    $.__views.centreScroll.add($.__views.passwordWarningLabel);
    $.__views.regButton = Ti.UI.createButton(function() {
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
            shadowColor: "#b4b5b7",
            shadowRadius: 5,
            width: 180,
            height: "45dp",
            title: "Register yourself!",
            top: "55%",
            id: "regButton"
        });
        return o;
    }());
    $.__views.centreScroll.add($.__views.regButton);
    doClick ? $.addListener($.__views.regButton, "click", doClick) : __defers["$.__views.regButton!click!doClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var sha1 = require("alloy/sha1");
    var hashKey = "01234567890abcdefghijklmnopqrstuvwxyz";
    arguments[0] || {};
    $.register.open();
    __defers["$.__views.emailText!change!doChkEmail"] && $.addListener($.__views.emailText, "change", doChkEmail);
    __defers["$.__views.fPasswordText!change!doChkPasswords"] && $.addListener($.__views.fPasswordText, "change", doChkPasswords);
    __defers["$.__views.sPasswordText!change!doChkPasswords"] && $.addListener($.__views.sPasswordText, "change", doChkPasswords);
    __defers["$.__views.regButton!click!doClick"] && $.addListener($.__views.regButton, "click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;