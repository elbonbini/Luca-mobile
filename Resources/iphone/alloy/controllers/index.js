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
  this.__controllerPath = 'index';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  var __alloyId0 = [];$.__views.__alloyId1 = Ti.UI.createWindow(
  { backgroundColor: "#0f3c50", top: 0, left: 0, width: Titanium.UI.FILL, fullscreen: false, exitOnClose: false, navBarHidden: true, id: "__alloyId1" });

  $.__views.leftDrawer = Ti.UI.createView(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { left: 0, top: 20, height: Titanium.UI.FILL, backgroundColor: "#0f3c50", layout: "vertical" });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { width: "70%" });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { width: "40%" });
    Alloy.deepExtend(true, o, { id: "leftDrawer" });
    return o;
  }());

  $.__views.__alloyId1.add($.__views.leftDrawer);
  clickCentre ? $.addListener($.__views.leftDrawer, 'click', clickCentre) : __defers['$.__views.leftDrawer!click!clickCentre'] = true;$.__views.__alloyId3 = Ti.UI.createView(
  { height: "70dp", id: "__alloyId3" });

  $.__views.listTitleL = Ti.UI.createLabel(
  { font: { fontFamily: "GillSans-Light", fontSize: "24dp" }, backgroundColor: "#0f3c50", color: "#dfb770", left: "10dp", top: 20, text: 'Interview Level', id: "listTitleL" });

  $.__views.__alloyId3.add($.__views.listTitleL);
  var __alloyId4 = {};var __alloyId7 = [];var __alloyId8 = { type: 'Ti.UI.Label', bindId: 'infoL', properties: { font: { fontFamily: "GillSans-Light", fontSize: "20dp" }, color: "#dfb770", left: "30dp", top: 0, bindId: "infoL" } };__alloyId7.push(__alloyId8);var __alloyId9 = { type: 'Ti.UI.Label', bindId: 'es_infoL', properties: { font: { fontFamily: "GillSans-Light", fontSize: "14dp" }, color: "#ffffff", left: "30dp", top: "25dp", bindId: "es_infoL" } };__alloyId7.push(__alloyId9);var __alloyId6 = { properties: { name: "templateLeft" }, childTemplates: __alloyId7 };__alloyId4["templateLeft"] = __alloyId6;$.__views.__alloyId13 = Ti.UI.createLabel(
  { backgroundColor: "#053240", color: "#dfb770", left: "20dp", height: "30dp", font: { fontFamily: "GillSans-Light", fontSize: "24dp" }, text: 'Livelihood zone', id: "__alloyId13" });

  var __alloyId14 = [];$.__views.__alloyId15 = { properties: { backgroundColor: "#0f3c50", id: "__alloyId15" }, infoL: { text: "Add location..." }, es_infoL: { text: "Enter new location by its details" } };__alloyId14.push($.__views.__alloyId15);$.__views.__alloyId10 = Ti.UI.createListSection(
  { headerView: $.__views.__alloyId13, id: "__alloyId10" });

  $.__views.__alloyId10.items = __alloyId14;var __alloyId16 = [];__alloyId16.push($.__views.__alloyId10);$.__views.__alloyId20 = Ti.UI.createLabel(
  { backgroundColor: "#053240", color: "#dfb770", left: "20dp", height: "30dp", font: { fontFamily: "GillSans-Light", fontSize: "24dp" }, text: 'Community', id: "__alloyId20" });

  var __alloyId21 = [];$.__views.__alloyId22 = { properties: { backgroundColor: "#0f3c50", id: "__alloyId22" }, infoL: { text: "Better off" }, es_infoL: { text: "Assets, proportion" } };__alloyId21.push($.__views.__alloyId22);$.__views.__alloyId23 = { properties: { backgroundColor: "#0f3c50", id: "__alloyId23" }, infoL: { text: "Middle" }, es_infoL: { text: "Assets, proportion" } };__alloyId21.push($.__views.__alloyId23);$.__views.__alloyId24 = { properties: { backgroundColor: "#0f3c50", id: "__alloyId24" }, infoL: { text: "Poor" }, es_infoL: { text: "Assets, proportion" } };__alloyId21.push($.__views.__alloyId24);$.__views.__alloyId25 = { properties: { backgroundColor: "#0f3c50", id: "__alloyId25" }, infoL: { text: "Very poor" }, es_infoL: { text: "Assets, proportion" } };__alloyId21.push($.__views.__alloyId25);$.__views.__alloyId26 = { properties: { backgroundColor: "#0f3c50", id: "__alloyId26" }, infoL: { text: "Add..." }, es_infoL: { text: "New wealth Group..." } };__alloyId21.push($.__views.__alloyId26);$.__views.__alloyId17 = Ti.UI.createListSection(
  { headerView: $.__views.__alloyId20, id: "__alloyId17" });

  $.__views.__alloyId17.items = __alloyId21;__alloyId16.push($.__views.__alloyId17);$.__views.__alloyId30 = Ti.UI.createLabel(
  { backgroundColor: "#053240", color: "#dfb770", left: "20dp", height: "30dp", font: { fontFamily: "GillSans-Light", fontSize: "24dp" }, text: 'Household', id: "__alloyId30" });

  var __alloyId31 = [];$.__views.__alloyId32 = { properties: { backgroundColor: "#0f3c50", id: "__alloyId32" }, infoL: { text: "Household Interview 1" }, es_infoL: { text: "Livelihood strategies" } };__alloyId31.push($.__views.__alloyId32);$.__views.__alloyId33 = { properties: { backgroundColor: "#0f3c50", id: "__alloyId33" }, infoL: { text: "Household Interview 2" }, es_infoL: { text: "Livelihood strategies" } };__alloyId31.push($.__views.__alloyId33);$.__views.__alloyId34 = { properties: { backgroundColor: "#0f3c50", id: "__alloyId34" }, infoL: { text: "Add..." }, es_infoL: { text: "New household interview..." } };__alloyId31.push($.__views.__alloyId34);$.__views.__alloyId27 = Ti.UI.createListSection(
  { headerView: $.__views.__alloyId30, id: "__alloyId27" });

  $.__views.__alloyId27.items = __alloyId31;__alloyId16.push($.__views.__alloyId27);$.__views.listLeft = Ti.UI.createListView(
  { top: 0, left: 0, layout: "vertical", visible: true, lifecycleContainer: "livelihood", backgroundColor: "#0f3c50", width: "100%", height: "100%", sections: __alloyId16, templates: __alloyId4, headerView: $.__views.__alloyId3, id: "listLeft", defaultItemTemplate: "templateLeft" });

  $.__views.leftDrawer.add($.__views.listLeft);
  doItemClickL ? $.addListener($.__views.listLeft, 'itemclick', doItemClickL) : __defers['$.__views.listLeft!itemclick!doItemClickL'] = true;$.__views.rightDrawer = Ti.UI.createView(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { right: 0, top: 20, height: Titanium.UI.FILL, backgroundColor: "#adaaab" });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { width: "70%" });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { width: "40%" });
    Alloy.deepExtend(true, o, { id: "rightDrawer" });
    return o;
  }());

  $.__views.__alloyId1.add($.__views.rightDrawer);
  clickCentre ? $.addListener($.__views.rightDrawer, 'click', clickCentre) : __defers['$.__views.rightDrawer!click!clickCentre'] = true;$.__views.searchItemR = Ti.UI.createSearchBar(
  { id: "searchItemR", barColor: "#adaaab" });

  $.__views.__alloyId36 = Ti.UI.createView(
  { height: "70dp", id: "__alloyId36" });

  $.__views.listTitleR = Ti.UI.createLabel(
  { font: { fontFamily: "GillSans-Light", fontSize: "24dp" }, color: "#0f3c50", left: "10dp", top: 0, text: 'Livelihood categories', id: "listTitleR" });

  $.__views.__alloyId36.add($.__views.listTitleR);
  var __alloyId37 = {};var __alloyId40 = [];var __alloyId41 = { type: 'Ti.UI.Label', bindId: 'infoR', properties: { font: { fontFamily: "GillSans-Light", fontSize: "20dp" }, color: "#0f3c50", left: "30dp", top: 0, bindId: "infoR" } };__alloyId40.push(__alloyId41);var __alloyId42 = { type: 'Ti.UI.Label', bindId: 'es_infoR', properties: { font: { fontFamily: "GillSans-Light", fontSize: "14dp" }, color: "#ffffff", left: "30dp", top: "25dp", bindId: "es_infoR" } };__alloyId40.push(__alloyId42);var __alloyId39 = { properties: { name: "templateRight" }, childTemplates: __alloyId40 };__alloyId37["templateRight"] = __alloyId39;var __alloyId45 = [];$.__views.__alloyId46 = { properties: { backgroundColor: "#adaaab", searchableText: "livestock, cattle, pigs, sheep, goats, chickens, camels, milk, dairy, ghee, meat, animal", id: "__alloyId46" }, infoR: { text: "Livestock" }, es_infoR: { text: "Dairy, meat, animal sales" } };__alloyId45.push($.__views.__alloyId46);$.__views.__alloyId47 = { properties: { backgroundColor: "#adaaab", searchableText: "crops, maize, beans, legumes, pulses, fruit, vegetables, tomatoes, onions, cabbage, yield, tobacco, sorghum, millet, cash", id: "__alloyId47" }, infoR: { text: "Crops" }, es_infoR: { text: "Staple, non-staple, cash crops" } };__alloyId45.push($.__views.__alloyId47);$.__views.__alloyId48 = { properties: { backgroundColor: "#adaaab", searchableText: "maize, sorghum, millet, cassava, rice, bread, wheat", id: "__alloyId48" }, infoR: { text: "Staple Food Purchase" }, es_infoR: { text: "Grains, cereals, tubers" } };__alloyId45.push($.__views.__alloyId48);$.__views.__alloyId49 = { properties: { backgroundColor: "#adaaab", searchableText: "meat, pulses, legumes, dairy, fruit, vegetables", id: "__alloyId49" }, infoR: { text: "Non-Staple Basic Food Purchase" }, es_infoR: { text: "Meat, dairy, legumes, fruit, veg" } };__alloyId45.push($.__views.__alloyId49);$.__views.__alloyId50 = { properties: { backgroundColor: "#adaaab", searchableText: "labour, clearing, land preparation, weeding, harvesting, mudding, thatching", id: "__alloyId50" }, infoR: { text: "Casual Employment" }, es_infoR: { text: "Agricultural, domestic, constuction" } };__alloyId45.push($.__views.__alloyId50);$.__views.__alloyId51 = { properties: { backgroundColor: "#adaaab", searchableText: "job, contract, civil, service, full time", id: "__alloyId51" }, infoR: { text: "Formal Employment" }, es_infoR: { text: "Job, contract" } };__alloyId45.push($.__views.__alloyId51);$.__views.__alloyId52 = { properties: { backgroundColor: "#adaaab", searchableText: "charcoal, firewood, wood, grass, mats, baskets, carving", id: "__alloyId52" }, infoR: { text: "Self-Employment" }, es_infoR: { text: "Collection, crafts" } };__alloyId45.push($.__views.__alloyId52);$.__views.__alloyId53 = { properties: { backgroundColor: "#adaaab", searchableText: "kiosk, pick-up, truck, bakkie, taxi, minibus, shop", id: "__alloyId53" }, infoR: { text: "Small business" }, es_infoR: { text: "Trading, hiring, services" } };__alloyId45.push($.__views.__alloyId53);$.__views.__alloyId54 = { properties: { backgroundColor: "#adaaab", searchableText: "loan, grant, social, development, welfare, vulnerable, orphan, ovc, indigent, disability, pension, old age", id: "__alloyId54" }, infoR: { text: "Formal Support" }, es_infoR: { text: "Social development, grants, loans" } };__alloyId45.push($.__views.__alloyId54);$.__views.__alloyId55 = { properties: { backgroundColor: "#adaaab", searchableText: "gift, loan, remittance, help, stokvel", id: "__alloyId55" }, infoR: { text: "Informal Support" }, es_infoR: { text: "Gifts, loans, remittances" } };__alloyId45.push($.__views.__alloyId55);$.__views.__alloyId43 = Ti.UI.createListSection(
  { id: "__alloyId43" });

  $.__views.__alloyId43.items = __alloyId45;var __alloyId56 = [];__alloyId56.push($.__views.__alloyId43);$.__views.listRight = Ti.UI.createListView(
  { top: 0, left: 0, layout: "vertical", visible: true, lifecycleContainer: "livelihood", backgroundColor: "#adaaab", right: 0, width: "100%", height: "100%", sections: __alloyId56, templates: __alloyId37, searchView: $.__views.searchItemR, headerView: $.__views.__alloyId36, id: "listRight", defaultItemTemplate: "templateRight" });

  $.__views.rightDrawer.add($.__views.listRight);
  doItemClickR ? $.addListener($.__views.listRight, 'itemclick', doItemClickR) : __defers['$.__views.listRight!itemclick!doItemClickR'] = true;$.__views.centreBoard = Ti.UI.createView(
  { backgroundColor: "#e3e4e6", viewShadowColor: "#020202", viewShadowRadius: "20%", top: 0, left: 0, width: "100%", height: "100%", zIndex: 5, id: "centreBoard" });

  $.__views.__alloyId1.add($.__views.centreBoard);
  $.__views.centreHeader = Ti.UI.createView(
  { backgroundColor: "#2f5c70", borderColor: "#646567", borderWidth: 0.25, top: 0, left: 0, width: "100%", height: 76, id: "centreHeader" });

  $.__views.centreBoard.add($.__views.centreHeader);
  $.__views.buttonLeftDrawerOpen = Ti.UI.createButton(
  function () {
    var o = {};
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 18 } });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 22 } });
    Alloy.deepExtend(true, o, { top: 28, width: "36dip", height: "36dip", selectedColor: "#646567", tintColor: "#cccccc", left: 10, image: "images/layer-7.png", id: "buttonLeftDrawerOpen" });
    return o;
  }());

  $.__views.centreHeader.add($.__views.buttonLeftDrawerOpen);
  clickLeft ? $.addListener($.__views.buttonLeftDrawerOpen, 'click', clickLeft) : __defers['$.__views.buttonLeftDrawerOpen!click!clickLeft'] = true;$.__views.centreHeaderArea = Ti.UI.createView(
  { top: 20, left: 60, right: 60, height: 56, id: "centreHeaderArea" });

  $.__views.centreHeader.add($.__views.centreHeaderArea);
  clickCentre ? $.addListener($.__views.centreHeaderArea, 'click', clickCentre) : __defers['$.__views.centreHeaderArea!click!clickCentre'] = true;$.__views.labelCentreTitle = Ti.UI.createLabel(
  { top: 4, color: "#dfb770", font: { fontFamily: "GillSans-Light", fontSize: 28 }, text: 'Welcome!', id: "labelCentreTitle" });

  $.__views.centreHeaderArea.add($.__views.labelCentreTitle);
  $.__views.labelCentreSubtitle = Ti.UI.createLabel(
  { top: 34, color: "#dfb770", font: { fontFamily: "GillSans-Light", fontSize: 18 }, text: 'Click either side button', id: "labelCentreSubtitle" });

  $.__views.centreHeaderArea.add($.__views.labelCentreSubtitle);
  $.__views.buttonRightDrawerOpen = Ti.UI.createButton(
  function () {
    var o = {};
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 18 } });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 22 } });
    Alloy.deepExtend(true, o, { top: 28, width: "36dip", height: "36dip", selectedColor: "#646567", tintColor: "#cccccc", right: 10, image: "images/list-fat-7.png", id: "buttonRightDrawerOpen" });
    return o;
  }());

  $.__views.centreHeader.add($.__views.buttonRightDrawerOpen);
  clickRight ? $.addListener($.__views.buttonRightDrawerOpen, 'click', clickRight) : __defers['$.__views.buttonRightDrawerOpen!click!clickRight'] = true;$.__views.centreBody = Ti.UI.createView(
  { top: 76, left: 0, width: "100%", bottom: 0, id: "centreBody" });

  $.__views.centreBoard.add($.__views.centreBody);
  clickCentre ? $.addListener($.__views.centreBody, 'click', clickCentre) : __defers['$.__views.centreBody!click!clickCentre'] = true;if (true) {
    $.__views.mapElement = Alloy.createController('mapcontainer', { id: "mapElement", __parentSymbol: $.__views.centreBody });
    $.__views.mapElement.setParent($.__views.centreBody);
  }
  $.__views.dataHolder = Ti.UI.createView(
  { id: "dataHolder", backgroundColor: "#ffffff" });

  $.__views.centreBody.add($.__views.dataHolder);
  var __alloyId59 = [];$.__views.__alloyId60 = { properties: { title: "Data set 1 ...", id: "__alloyId60" } };__alloyId59.push($.__views.__alloyId60);$.__views.__alloyId61 = { properties: { title: "Data set 2 ...", id: "__alloyId61" } };__alloyId59.push($.__views.__alloyId61);$.__views.__alloyId62 = { properties: { title: "Data set 3 ...", id: "__alloyId62" } };__alloyId59.push($.__views.__alloyId62);$.__views.__alloyId63 = { properties: { title: "Data set 4 ...", id: "__alloyId63" } };__alloyId59.push($.__views.__alloyId63);$.__views.__alloyId64 = { properties: { title: "Data set 5 ...", id: "__alloyId64" } };__alloyId59.push($.__views.__alloyId64);$.__views.__alloyId65 = { properties: { title: "Data set 6 ...", id: "__alloyId65" } };__alloyId59.push($.__views.__alloyId65);$.__views.__alloyId66 = { properties: { title: "Data set 7 ...", id: "__alloyId66" } };__alloyId59.push($.__views.__alloyId66);$.__views.__alloyId57 = Ti.UI.createListSection(
  { id: "__alloyId57" });

  $.__views.__alloyId57.items = __alloyId59;var __alloyId67 = [];__alloyId67.push($.__views.__alloyId57);$.__views.listLivelihood = Ti.UI.createListView(
  { top: "1%", left: "1%", height: "60%", width: "98%", backgroundColor: "#ffffff", bubbleParent: true, sections: __alloyId67, id: "listLivelihood" });

  $.__views.dataHolder.add($.__views.listLivelihood);
  clickCentre ? $.addListener($.__views.listLivelihood, 'itemclick', clickCentre) : __defers['$.__views.listLivelihood!itemclick!clickCentre'] = true;$.__views.imageGraph = Ti.UI.createImageView(
  { top: "62%", height: "36%", center: { x: "50%" }, width: "75%", image: "images/zalof_sf.png", id: "imageGraph" });

  $.__views.dataHolder.add($.__views.imageGraph);
  $.__views.interviews = Ti.UI.createTab(
  { window: $.__views.__alloyId1, id: "interviews", title: "Interviews", icon: "images/note-write-7.png" });

  __alloyId0.push($.__views.interviews);$.__views.background = Ti.UI.createWindow(
  { backgroundColor: "#0f3c50", top: 0, left: 0, width: Titanium.UI.FILL, fullscreen: false, exitOnClose: false, navBarHidden: true, id: "background" });

  $.__views.__alloyId69 = Ti.UI.createListView(
  { top: "72dp", id: "__alloyId69" });

  $.__views.background.add($.__views.__alloyId69);
  $.__views.__alloyId68 = Ti.UI.createTab(
  { window: $.__views.background, title: "Info", icon: "images/spanner-7.png", id: "__alloyId68" });

  __alloyId0.push($.__views.__alloyId68);$.__views.myUpdates = Ti.UI.createWindow(
  { backgroundColor: "#0f3c50", top: 0, left: 0, width: Titanium.UI.FILL, fullscreen: false, exitOnClose: false, navBarHidden: true, id: "myUpdates" });

  $.__views.__alloyId71 = Ti.UI.createLabel(
  function () {
    var o = {};
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans-Light", fontSize: 16 } });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans-Light", fontSize: 32 } });
    Alloy.deepExtend(true, o, { text: 'Announcements, user status and messages will go here', color: "#ffffff", left: "5%", right: "5%", wordWrap: true, textAlign: "center", id: "__alloyId71" });
    return o;
  }());

  $.__views.myUpdates.add($.__views.__alloyId71);
  $.__views.__alloyId70 = Ti.UI.createTab(
  { window: $.__views.myUpdates, title: "News", icon: "images/share-connect-7.png", id: "__alloyId70" });

  __alloyId0.push($.__views.__alloyId70);$.__views.myProfile = Ti.UI.createWindow(
  { backgroundColor: "#0f3c50", top: 0, left: 0, width: Titanium.UI.FILL, fullscreen: false, exitOnClose: false, navBarHidden: true, id: "myProfile" });

  $.__views.__alloyId73 = Ti.UI.createLabel(
  function () {
    var o = {};
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans-Light", fontSize: 16 } });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans-Light", fontSize: 32 } });
    Alloy.deepExtend(true, o, { text: 'User profile, teams and connections will go here', color: "#ffffff", left: "5%", right: "5%", wordWrap: true, textAlign: "center", id: "__alloyId73" });
    return o;
  }());

  $.__views.myProfile.add($.__views.__alloyId73);
  $.__views.__alloyId72 = Ti.UI.createTab(
  { window: $.__views.myProfile, title: "Profile", icon: "images/circle-user-7.png", id: "__alloyId72" });

  __alloyId0.push($.__views.__alloyId72);$.__views.about = Ti.UI.createWindow(
  { backgroundColor: "#0f3c50", top: 0, left: 0, width: Titanium.UI.FILL, fullscreen: false, exitOnClose: false, navBarHidden: true, id: "about" });

  $.__views.labelVersion = Ti.UI.createLabel(
  function () {
    var o = {};
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans-Light", fontSize: 16 } });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans-Light", fontSize: 32 } });
    Alloy.deepExtend(true, o, { text: 'Luca version', id: "labelVersion", top: "6%", textAlign: "center", color: "#dfb770" });
    return o;
  }());

  $.__views.about.add($.__views.labelVersion);
  $.__views.__alloyId75 = Ti.UI.createView(
  { borderColor: "#ffffff", borderWidth: "1dp", top: "15%", left: "5%", bottom: "5%", right: "5%", id: "__alloyId75" });

  $.__views.about.add($.__views.__alloyId75);
  $.__views.__alloyId76 = Ti.UI.createLabel(
  function () {
    var o = {};
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans-Light", fontSize: 8 } });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans-Light", fontSize: 13 } });
    Alloy.deepExtend(true, o, { text: 'Credits:\n' + 'Created by: Charles Rethman on a MacBook Pro 13-inch Retina, running OSX 10.10\n' + 'Graphics: Rudi White on an iMac, running OSX 10.10\n' + '\n' + 'A great number of software packages were used in this piece of work, most of them free and open source:\n' + '  • Appcelerator Studio (Titanium, Titanium Alloy, Aptana, Eclipse IDE)\n' + '  • Apple Xcode (Builder, Simulator and Instruments)\n' + '  • Genymotion Android Emulator\n' + '  • MongoDB\n' + '  • Node.js, which includes the following packages:\n' + '      HTPP, CryptoJS, Express, Passport, MongoDB, Jade, BodyParser\n' + '  • TextMate Editor\n' + '\n' + 'In addition, a lot of tutorials helped with getting the fundamentals right:\n' + '  • "How to Write An iOS App that Uses a Node.js/MongoDB Web Service" by\n' + '    Mike Katz - http://www.raywenderlich.com\n' + '  • "Beer Locker: Building a RESTful API With Node" by Scott Smith -\n' + '    http://scottksmith.com\n' + '  • "Eloquent JavaScript" by Marijke Haverbeke - http://eloquentjavascript.net\n' + '  • "JavaScript, The Good Parts" by Douglas Crockford', top: "2%", left: "2%", bottom: "2%", right: "2%", backgroundColor: "#0f3c50", color: "#ffffff", wordWrap: true, verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP, id: "__alloyId76" });
    return o;
  }());

  $.__views.__alloyId75.add($.__views.__alloyId76);
  $.__views.__alloyId74 = Ti.UI.createTab(
  { window: $.__views.about, title: "About", icon: "images/shop-7.png", id: "__alloyId74" });

  __alloyId0.push($.__views.__alloyId74);$.__views.index = Ti.UI.createTabGroup(
  { tabs: __alloyId0, tintColor: "#2f5c70", id: "index" });

  $.__views.index && $.addTopLevelView($.__views.index);
  exports.destroy = function () {};




  _.extend($, $.__views);


  'use strict';




  var countEvents = [0, 0];
  var args = arguments[0] || {};




  function initWindow(name) {
    var userView = Alloy.createController(name);
  };





  function anim(drawer, movePos) {



    var drawMotion = Ti.UI.create2DMatrix();

    drawMotion = drawMotion.translate(movePos, 0);

    var a = Ti.UI.createAnimation({

      transform: drawMotion,

      duration: 350,

      autoreverse: false,

      repeat: 1 });


    drawer.animate(a, function () {

      if (Ti.Platform.osname !== "android" && Ti.App.keyboardVisible) $.searchItemR.blur();

      if (movePos === 0) {
        $.leftDrawer.zIndex = 0;
        $.rightDrawer.zIndex = 0;
      }
    });
  }



















  function slide(width) {

    var obj = {
      prop: 0.4,
      density: 1,
      dist: 100 };


    if (Ti.Platform.osname == "android") {

      obj.density = Ti.Platform.displayCaps.dpi / 160;


      if (Ti.Platform.displayCaps.platformHeight * Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.dpi * Ti.Platform.displayCaps.dpi) + Ti.Platform.displayCaps.platformWidth * Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi * Ti.Platform.displayCaps.dpi) < 49) obj.prop = 0.7;else obj.prop = 0.4;
    } else {

      obj.density = 1;
      if (Ti.Platform.osname == "iphone") obj.prop = 0.7;else if (Ti.Platform.osname == "ipad") obj.prop = 0.4;
    }
    obj.dist = obj.prop * obj.density * $.index.rect.width;
    return obj;
  }




















  function clickLeft(e) {
    if ($.leftDrawer.zIndex > $.rightDrawer.zIndex) anim($.centreBoard, 0);else {

      $.leftDrawer.zIndex = 3;
      $.rightDrawer.zIndex = 0;

      anim($.centreBoard, slide().dist);
    }
  }




  function clickRight(e) {
    if ($.rightDrawer.zIndex > $.leftDrawer.zIndex) anim($.centreBoard, 0);else {

      $.leftDrawer.zIndex = 0;
      $.rightDrawer.zIndex = 3;

      anim($.centreBoard, -1 * slide().dist);
    }
  }




  function clickCentre(e) {

    if ($.leftDrawer.zIndex === 3 || $.rightDrawer.zIndex === 3) anim($.centreBoard, 0);
  }




  function doItemClickL(e) {

    var item = e.section.getItemAt(e.itemIndex);
    if (e.sectionIndex === 0) {
      $.mapElement.visible = true;
      $.dataHolder.visible = false;
    } else {
      $.mapElement.visible = false;
      $.dataHolder.visible = true;
    };

    $.labelCentreTitle.text = item.infoL.text;

    clickCentre();
  }




  function doItemClickR(e) {

    var item = e.section.getItemAt(e.itemIndex);

    $.labelCentreSubtitle.text = item.infoR.text;

    clickCentre();
  }




  $.leftDrawer.zIndex = 0;
  $.rightDrawer.zIndex = 0;
  $.mapElement.visible = true;
  $.dataHolder.visible = false;




  $.labelVersion.text = "Luca: mobile HEA platform, build " + Ti.App.getVersion() + "\n© Charles Rethman, Wahenga 2015";




  Alloy.Globals.parent = $.index;
  initWindow("intro");





  __defers['$.__views.leftDrawer!click!clickCentre'] && $.addListener($.__views.leftDrawer, 'click', clickCentre);__defers['$.__views.listLeft!itemclick!doItemClickL'] && $.addListener($.__views.listLeft, 'itemclick', doItemClickL);__defers['$.__views.rightDrawer!click!clickCentre'] && $.addListener($.__views.rightDrawer, 'click', clickCentre);__defers['$.__views.listRight!itemclick!doItemClickR'] && $.addListener($.__views.listRight, 'itemclick', doItemClickR);__defers['$.__views.buttonLeftDrawerOpen!click!clickLeft'] && $.addListener($.__views.buttonLeftDrawerOpen, 'click', clickLeft);__defers['$.__views.centreHeaderArea!click!clickCentre'] && $.addListener($.__views.centreHeaderArea, 'click', clickCentre);__defers['$.__views.buttonRightDrawerOpen!click!clickRight'] && $.addListener($.__views.buttonRightDrawerOpen, 'click', clickRight);__defers['$.__views.centreBody!click!clickCentre'] && $.addListener($.__views.centreBody, 'click', clickCentre);__defers['$.__views.listLivelihood!itemclick!clickCentre'] && $.addListener($.__views.listLivelihood, 'itemclick', clickCentre);



  _.extend($, exports);
}

module.exports = Controller;