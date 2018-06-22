var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
  }
  return arg;
}

function Controller() {

  require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
  this.__controllerPath = 'register';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.register = Ti.UI.createWindow(
  { backgroundColor: "#0f3c50", top: 0, left: 0, width: Titanium.UI.FILL, fullscreen: "False", exitOnClose: false, navBarHidden: true, id: "register" });

  $.__views.register && $.addTopLevelView($.__views.register);
  $.__views.centreScroll = Ti.UI.createScrollView(
  { center: { x: "50%" }, top: "5%", height: "130%", left: 0, width: Titanium.UI.FILL, id: "centreScroll" });

  $.__views.register.add($.__views.centreScroll);
  $.__views.__alloyId145 = Ti.UI.createImageView(
  { opacity: 0.25, center: { y: "50%" }, height: 18, left: 6, width: 18, hires: true, image: "images/envelope.png", id: "__alloyId145" });

  $.__views.emailText = Ti.UI.createTextField(
  { center: { x: "50%" }, width: "85%", padding: { left: 30, right: 7 }, height: "40dp", backgroundColor: "#a6a7a9", borderColor: "#646567", color: "#dfdedf", textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE, autocorrect: false, keyboardType: Ti.UI.KEYBOARD_TYPE_EMAIL, id: "emailText", top: "5%", hintText: "A valid email address" });

  $.__views.centreScroll.add($.__views.emailText);
  $.__views.emailText.add($.__views.__alloyId145);doChkEmail ? $.addListener($.__views.emailText, 'change', doChkEmail) : __defers['$.__views.emailText!change!doChkEmail'] = true;$.__views.__alloyId145 = Ti.UI.createImageView(
  { opacity: 0.25, center: { y: "50%" }, height: 18, left: 6, width: 18, hires: true, image: "images/envelope.png", id: "__alloyId145" });

  $.__views.emailText.add($.__views.__alloyId145);
  $.__views.emailWarningLabel = Ti.UI.createLabel(
  { center: { x: "50%" }, width: "85%", color: "red", height: Titanium.UI.SIZE, id: "emailWarningLabel", top: "12%" });

  $.__views.centreScroll.add($.__views.emailWarningLabel);
  $.__views.__alloyId146 = Ti.UI.createImageView(
  { opacity: 0.25, center: { y: "50%" }, height: 18, left: 6, width: 18, hires: true, image: "images/user-card.png", id: "__alloyId146" });

  $.__views.employer = Ti.UI.createTextField(
  { center: { x: "50%" }, width: "85%", padding: { left: 30, right: 7 }, height: "40dp", backgroundColor: "#a6a7a9", borderColor: "#646567", color: "#dfdedf", textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, id: "employer", top: "22%", hintText: "Who you work for - 'self' or leave blank if you're on your own" });

  $.__views.centreScroll.add($.__views.employer);
  $.__views.employer.add($.__views.__alloyId146);$.__views.__alloyId146 = Ti.UI.createImageView(
  { opacity: 0.25, center: { y: "50%" }, height: 18, left: 6, width: 18, hires: true, image: "images/user-card.png", id: "__alloyId146" });

  $.__views.employer.add($.__views.__alloyId146);
  $.__views.__alloyId147 = Ti.UI.createImageView(
  { opacity: 0.25, center: { y: "50%" }, height: 18, left: 6, width: 18, hires: true, image: "images/key-2.png", id: "__alloyId147" });

  $.__views.fPasswordText = Ti.UI.createTextField(
  { center: { x: "50%" }, width: "85%", padding: { left: 30, right: 7 }, height: "40dp", backgroundColor: "#a6a7a9", borderColor: "#646567", color: "#dfdedf", textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, passwordMask: true, id: "fPasswordText", top: "30%", hintText: "Choose a password" });

  $.__views.centreScroll.add($.__views.fPasswordText);
  $.__views.fPasswordText.add($.__views.__alloyId147);doChkPasswords ? $.addListener($.__views.fPasswordText, 'change', doChkPasswords) : __defers['$.__views.fPasswordText!change!doChkPasswords'] = true;$.__views.__alloyId147 = Ti.UI.createImageView(
  { opacity: 0.25, center: { y: "50%" }, height: 18, left: 6, width: 18, hires: true, image: "images/key-2.png", id: "__alloyId147" });

  $.__views.fPasswordText.add($.__views.__alloyId147);
  $.__views.__alloyId148 = Ti.UI.createImageView(
  { opacity: 0.25, center: { y: "50%" }, height: 18, left: 6, width: 18, hires: true, image: "images/tick.png", id: "__alloyId148" });

  $.__views.sPasswordText = Ti.UI.createTextField(
  { center: { x: "50%" }, width: "85%", padding: { left: 30, right: 7 }, height: "40dp", backgroundColor: "#a6a7a9", borderColor: "#646567", color: "#dfdedf", textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, passwordMask: true, id: "sPasswordText", top: "38%", hintText: "Re-enter your password" });

  $.__views.centreScroll.add($.__views.sPasswordText);
  $.__views.sPasswordText.add($.__views.__alloyId148);doChkPasswords ? $.addListener($.__views.sPasswordText, 'change', doChkPasswords) : __defers['$.__views.sPasswordText!change!doChkPasswords'] = true;$.__views.__alloyId148 = Ti.UI.createImageView(
  { opacity: 0.25, center: { y: "50%" }, height: 18, left: 6, width: 18, hires: true, image: "images/tick.png", id: "__alloyId148" });

  $.__views.sPasswordText.add($.__views.__alloyId148);
  $.__views.passwordWarningLabel = Ti.UI.createLabel(
  { center: { x: "50%" }, width: "85%", color: "red", height: Titanium.UI.SIZE, id: "passwordWarningLabel", top: "45%" });

  $.__views.centreScroll.add($.__views.passwordWarningLabel);
  $.__views.regButton = Ti.UI.createButton(
  function () {
    var o = {};
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 18 } });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 22 } });
    Alloy.deepExtend(true, o, { backgroundColor: "#dfb770", color: "#ffffff", shadowColor: "#b4b5b7", shadowRadius: 5, width: 180, height: "45dp", title: 'Register yourself!', top: "55%", id: "regButton" });
    return o;
  }());

  $.__views.centreScroll.add($.__views.regButton);
  doClick ? $.addListener($.__views.regButton, 'click', doClick) : __defers['$.__views.regButton!click!doClick'] = true;exports.destroy = function () {};




  _.extend($, $.__views);


  var sha1 = require('alloy/sha1');
  var hashKey = "01234567890abcdefghijklmnopqrstuvwxyz";

  function createHash(key, data) {
    return sha1.str_hmac_sha1(key, data);
  };

  function doClick(e) {
    if (e.source.id === "regButton") {
      if (validatePasswords(hashKey, $.fPasswordText.value, $.sPasswordText.value)) {
        if (validateEmail($.emailText.value)) {










          $.register.close();




        } else {
          $.emailWarningLabel.text = "Please make sure your email is valid";
          $.emailText.value = null;
        }
      } else {
        $.passwordWarningLabel.text = "Please make sure your passwords are the same";
        $.fPasswordText.value = null;
        $.sPasswordText.value = null;
      }
    }

  }

  function doChkPasswords(e) {
    if (!validatePasswords(hashKey, $.fPasswordText.value, $.sPasswordText.value)) {
      $.sPasswordText.borderColor = "red";
      $.passwordWarningLabel.text = "Your passwords are different or missing";
    } else {
      $.sPasswordText.borderColor = "#646567";
      $.passwordWarningLabel.text = "";
    }
  }

  function doChkEmail(e) {
    if (!validateEmail($.emailText.value)) {
      $.emailText.borderColor = "red";
      $.emailWarningLabel.text = "Not (yet) a valid email address";
    } else {
      $.emailText.borderColor = "#646567";
      $.emailWarningLabel.text = "";
    }
  }

  function validatePasswords(key, pword1, pword2) {
    if (pword1.length === 0 || pword2.length === 0) {
      return false;
    } else {
      return sha1.str_hmac_sha1(key, pword1) === sha1.str_hmac_sha1(key, pword2);
    }
  }

  function validateEmail(address) {

    if (address.length == 0) return false;

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

    return re.test(address);
  };

  var args = arguments[0] || {};
  $.register.open();





  __defers['$.__views.emailText!change!doChkEmail'] && $.addListener($.__views.emailText, 'change', doChkEmail);__defers['$.__views.fPasswordText!change!doChkPasswords'] && $.addListener($.__views.fPasswordText, 'change', doChkPasswords);__defers['$.__views.sPasswordText!change!doChkPasswords'] && $.addListener($.__views.sPasswordText, 'change', doChkPasswords);__defers['$.__views.regButton!click!doClick'] && $.addListener($.__views.regButton, 'click', doClick);



  _.extend($, exports);
}

module.exports = Controller;