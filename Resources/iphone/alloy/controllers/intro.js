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
	this.__controllerPath = 'intro';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};







	$.__views.intro = Ti.UI.createWindow(
	{ backgroundColor: "#0f3c50", top: 0, left: 0, width: Titanium.UI.FILL, fullscreen: "True", exitOnClose: false, navBarHidden: true, id: "intro" });

	$.__views.intro && $.addTopLevelView($.__views.intro);
	var __alloyId78 = [];
	$.__views.introView1 = Ti.UI.createView(
	{ top: 0, height: Titanium.UI.FILL, bottom: 0, width: Titanium.UI.FILL, layout: "composite", id: "introView1" });

	__alloyId78.push($.__views.introView1);
	$.__views.__alloyId79 = Ti.UI.createLabel(
	function () {
		var o = {};
		Alloy.deepExtend(true, o, { left: 10, right: 10, height: Titanium.UI.SIZE, color: "#ffffff", textAlign: "center" });
		if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans-Light", fontSize: 16 } });
		if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans-Light", fontSize: 32 } });
		Alloy.deepExtend(true, o, { text: 'Welcome to Luca!\n' + '                  \n' + '                    \n' + 'We hope you enjoy using\n' + 'our app on your device.', id: "__alloyId79" });
		return o;
	}());

	$.__views.introView1.add($.__views.__alloyId79);
	$.__views.introView2 = Ti.UI.createView(
	{ top: 0, height: Titanium.UI.FILL, bottom: 0, width: Titanium.UI.FILL, id: "introView2" });

	__alloyId78.push($.__views.introView2);
	$.__views.__alloyId80 = Ti.UI.createLabel(
	function () {
		var o = {};
		Alloy.deepExtend(true, o, { left: 10, right: 10, height: Titanium.UI.SIZE, color: "#ffffff", textAlign: "center" });
		if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans-Light", fontSize: 16 } });
		if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans-Light", fontSize: 32 } });
		Alloy.deepExtend(true, o, { text: 'Luca uses the\n' + 'Household Economy Approach to \n' + 'understand how people make a living.\n' + '\n' + 'This can be used for many things:\n' + 'from managing disasters to finding\n' + 'ways to generate jobs.', id: "__alloyId80" });
		return o;
	}());

	$.__views.introView2.add($.__views.__alloyId80);
	$.__views.introView3 = Ti.UI.createView(
	{ top: 0, height: Titanium.UI.FILL, bottom: 0, width: Titanium.UI.FILL, id: "introView3" });

	__alloyId78.push($.__views.introView3);
	$.__views.__alloyId81 = Ti.UI.createLabel(
	function () {
		var o = {};
		Alloy.deepExtend(true, o, { left: 10, right: 10, height: Titanium.UI.SIZE, color: "#ffffff", textAlign: "center" });
		if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans-Light", fontSize: 16 } });
		if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans-Light", fontSize: 32 } });
		Alloy.deepExtend(true, o, { text: 'Luca captures complex livelihoods\n' + 'data and organises it, providing a simple\n' + 'way of sharing between ground user and\n' + 'analyst.', id: "__alloyId81" });
		return o;
	}());

	$.__views.introView3.add($.__views.__alloyId81);
	$.__views.__alloyId77 = Ti.UI.createScrollableView(
	{ bottom: 50, views: __alloyId78, backgroundImage: "splash_blurred.png", showPagingControl: "True", pagingControlAlpha: 0.2, pagingControlColor: "#646567", id: "__alloyId77" });

	$.__views.intro.add($.__views.__alloyId77);
	$.__views.enterApp = Ti.UI.createButton(
	function () {
		var o = {};
		if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 18 } });
		if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 22 } });
		Alloy.deepExtend(true, o, { backgroundColor: "#dfb770", color: "#ffffff", bottom: 0, height: 50, width: Titanium.UI.FILL, title: 'Click to Enter', id: "enterApp" });
		return o;
	}());

	$.__views.intro.add($.__views.enterApp);
	doClick ? $.addListener($.__views.enterApp, 'click', doClick) : __defers['$.__views.enterApp!click!doClick'] = true;exports.destroy = function () {};




	_.extend($, $.__views);


	function doClick(e) {
		var login = Alloy.createController('login');
		$.intro.close();
	}

	var args = arguments[0] || {};
	$.intro.open();





	__defers['$.__views.enterApp!click!doClick'] && $.addListener($.__views.enterApp, 'click', doClick);



	_.extend($, exports);
}

module.exports = Controller;