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
  this.__controllerPath = 'mapcontainer';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.livezones = Ti.UI.createView(
  { id: "livezones" });

  $.__views.livezones && $.addTopLevelView($.__views.livezones);
  var __alloyId138 = [];
  $.__views.mapView = (require("ti.map").createView || Ti.UI.createView)(
  { top: 0, regionFit: true, animate: true, userLocation: true, userLocationButton: true, compassEnabled: true, enableZoomControls: true, annotations: __alloyId138, id: "mapView" });

  $.__views.livezones.add($.__views.mapView);
  $.__views.viewLabels = Ti.UI.createView(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { center: { x: "50%" }, top: 0, height: "50dp", borderColor: "#000000", borderWidth: 1, backgroundColor: "#ffffff", opacity: 0.7 });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { width: 280 });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { width: 720 });
    Alloy.deepExtend(true, o, { id: "viewLabels" });
    return o;
  }());

  $.__views.livezones.add($.__views.viewLabels);
  $.__views.labelCode = Ti.UI.createLabel(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { left: 0, width: "15%", top: 0, height: "50%", textAlign: "left" });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 8 } });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 13 } });
    Alloy.deepExtend(true, o, { color: "#000000", left: "2%", width: "15%", top: 0, height: "23dp", textAlign: "left", id: "labelCode" });
    return o;
  }());

  $.__views.viewLabels.add($.__views.labelCode);
  doLabelClick ? $.addListener($.__views.labelCode, 'click', doLabelClick) : __defers['$.__views.labelCode!click!doLabelClick'] = true;$.__views.labelAbbrev = Ti.UI.createLabel(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { left: 0, width: "15%", top: "50%", height: "50%", textAlign: "left" });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 8 } });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 13 } });
    Alloy.deepExtend(true, o, { color: "#000000", left: "2%", width: "15%", top: 22, height: "23dp", textAlign: "left", id: "labelAbbrev" });
    return o;
  }());

  $.__views.viewLabels.add($.__views.labelAbbrev);
  doLabelClick ? $.addListener($.__views.labelAbbrev, 'click', doLabelClick) : __defers['$.__views.labelAbbrev!click!doLabelClick'] = true;$.__views.labelChooseZone = Ti.UI.createLabel(
  function () {
    var o = {};
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 12 } });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 20 } });
    Alloy.deepExtend(true, o, { color: "#000000", left: "15%", right: "40dp", top: 0, height: "50dp", textAlign: "left", text: 'Click here to select a livelihood zone ...', id: "labelChooseZone" });
    return o;
  }());

  $.__views.viewLabels.add($.__views.labelChooseZone);
  doLabelClick ? $.addListener($.__views.labelChooseZone, 'click', doLabelClick) : __defers['$.__views.labelChooseZone!click!doLabelClick'] = true;$.__views.viewPolyExtent = Ti.UI.createView(
  { right: "1dp", width: "40dp", top: 0, bottom: 0, id: "viewPolyExtent" });

  $.__views.viewLabels.add($.__views.viewPolyExtent);
  doPolyExtentClick ? $.addListener($.__views.viewPolyExtent, 'click', doPolyExtentClick) : __defers['$.__views.viewPolyExtent!click!doPolyExtentClick'] = true;$.__views.buttonPolyExtent = Ti.UI.createButton(
  function () {
    var o = {};
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 18 } });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 22 } });
    Alloy.deepExtend(true, o, { image: "images/android_locate.png", left: "3dp", right: "3dp", top: "2dp", bottom: "16dp", id: "buttonPolyExtent" });
    return o;
  }());

  $.__views.viewPolyExtent.add($.__views.buttonPolyExtent);
  $.__views.labelPolyExtent = Ti.UI.createLabel(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { left: 0, right: "2dp", bottom: "1dp", textAlign: "center" });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 8 } });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 14 } });
    Alloy.deepExtend(true, o, { text: 'Extent', id: "labelPolyExtent" });
    return o;
  }());

  $.__views.viewPolyExtent.add($.__views.labelPolyExtent);
  $.__views.pickerLzs = Ti.UI.createPicker(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { borderColor: "#000000", borderWidth: 1, center: { x: "50%" }, top: "50dp", type: Titanium.UI.PICKER_TYPE_PLAIN, selectionIndicator: true, useSpinner: true, opacity: 0.7 });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { width: 280 });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { width: 720 });
    Alloy.deepExtend(true, o, { id: "pickerLzs" });
    return o;
  }());

  $.__views.livezones.add($.__views.pickerLzs);
  var __alloyId139 = [];$.__views.lzDetails = Ti.UI.createPickerColumn(
  { id: "lzDetails" });

  __alloyId139.push($.__views.lzDetails);
  $.__views.__alloyId140 = Ti.UI.createPickerRow(
  { id: "__alloyId140" });

  $.__views.lzDetails.addRow($.__views.__alloyId140);
  $.__views.__alloyId141 = Ti.UI.createLabel(
  { textAlign: "right", width: 20, visible: false, text: 'x', id: "__alloyId141" });

  $.__views.__alloyId140.add($.__views.__alloyId141);
  $.__views.__alloyId142 = Ti.UI.createLabel(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { left: 0, width: "15%", top: 0, height: "50%", textAlign: "left" });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 8 } });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 13 } });
    Alloy.deepExtend(true, o, { id: "__alloyId142" });
    return o;
  }());

  $.__views.__alloyId140.add($.__views.__alloyId142);
  $.__views.__alloyId143 = Ti.UI.createLabel(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { left: 0, width: "15%", top: "50%", height: "50%", textAlign: "left" });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 8 } });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 13 } });
    Alloy.deepExtend(true, o, { id: "__alloyId143" });
    return o;
  }());

  $.__views.__alloyId140.add($.__views.__alloyId143);
  $.__views.__alloyId144 = Ti.UI.createLabel(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { left: "15%", width: "85%", right: 0, textAlign: "left" });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 14 } });
    if (Alloy.isTablet) Alloy.deepExtend(true, o, { font: { fontFamily: "GillSans", fontSize: 20 } });
    Alloy.deepExtend(true, o, { text: 'No livelihood zone', id: "__alloyId144" });
    return o;
  }());

  $.__views.__alloyId140.add($.__views.__alloyId144);
  $.__views.pickerLzs.add(__alloyId139);
  doPickerChange ? $.addListener($.__views.pickerLzs, 'change', doPickerChange) : __defers['$.__views.pickerLzs!change!doPickerChange'] = true;exports.destroy = function () {};




  _.extend($, $.__views);


  'use strict';











  var args = arguments[0] || {};

  const map = Alloy.Globals.Map;
  const mapView = $.mapView;
  const picker = $.pickerLzs;

  var count = 0;

  var locationView = {};

  var polygons = [];

  const rightButton = Titanium.UI.createButton({
    backgroundColor: "#ffffff",
    backgroundSelectedColor: "#dfb770",
    image: "images/nav-right.png",
    width: 30,
    height: 30 });


  const numsOnly = function (acc, e) {
    return typeof e === 'number' ? acc.concat(Array.of(e)) : acc;
  };




  Array.prototype.max = function () {
    return this.reduce(numsOnly, []).length > 0 ? Math.max.apply(Math, this.reduce(numsOnly, [])) : undefined;
  };


  Array.prototype.min = function () {
    return this.reduce(numsOnly, []).length > 0 ? Math.min.apply(Math, this.reduce(numsOnly, [])) : undefined;
  };


  function sortBy(field, reverse, primer) {
    const key = primer ? function (x) {
      return primer(x[field]);
    } : function (x) {
      return x[field];
    };
    reverse = !reverse ? 1 : -1;
    return function (a, b) {
      return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    };
  };



  function drillDown(arr, field) {
    function test(str, open, close) {
      return str.indexOf('{', open) < 0 || str.indexOf('{', open) > str.indexOf('}', close) ? str.indexOf('}', close) : false;
    }
    const result = [];
    arr.forEach(function (elem, i) {
      const oString = JSON.stringify(elem, i);
      const init = oString.indexOf(field);
      const beginObj = oString.lastIndexOf('{', init);
      const endObj = test(oString, init, init);
      result.push(JSON.parse(oString.slice(beginObj, endObj + 1)));
    });


















    return result;
  }



  function fetchGeomFile(fileName, pruneString) {

    var f = Ti.Filesystem.getFile(fileName);
    var mapFile = f.read();
    var mapString = mapFile.text;

    mapString = mapString.slice(mapString.indexOf(pruneString) + pruneString.length, mapString.length - 3);

    return JSON.parse(mapString);
  }




  function fetchSingleGeom(fileName, pruneString, idCondition) {

    var mapData = fetchGeomFile(fileName, pruneString);

    for (var i = 0; i < mapData.length; i++) {
      var shape = mapData[i];
      if (shape.properties.gid == idCondition) {
        var coords = shape.geometry.coordinates;
      };
    }

    return coords;
  }





  function polygonExtent(points) {

    if (points.length > 0) {

      var lngs = [];
      var lats = [];

      for (i = 0; i < points.length; i++) {

        if (points[i].length > 0) {

          for (j = 0; j < points[i].length; j++) {
            lngs.push(points[i][j][0]);
            lats.push(points[i][j][1]);
          }
        }
      }

      var lngMin = lngs.min();
      var lngMax = lngs.max();
      var latMin = lats.min();
      var latMax = lats.max();

      var deltaLngs = lngMax - lngMin;
      var deltaLats = latMax - latMin;

      return {
        longitude: lngMin + deltaLngs / 2,
        latitude: latMin + deltaLats * 9.2 / 16,
        longitudeDelta: Math.max(deltaLngs, deltaLats),
        latitudeDelta: 1.21 * Math.max(deltaLngs, deltaLats) };

    }
  }


  function loadPicker(dataFile, pruneString) {

    var mapAttrib = drillDown(fetchGeomFile(dataFile, pruneString), 'lz_code');




    mapAttrib = mapAttrib.sort(sortBy('lz_code'), false, parseInt);


    if (Ti.Platform.osname === "ipad" || Ti.Platform.osname === "iphone") {
      var family = "GillSans";
    } else {
      var family = "Gill Light SSi Light";
    }

    if (Ti.Platform.osname === 'ipad') {
      var sizeName = 20;
      var sizeCodeAbbrev = 13;
    } else if (Ti.Platform.osname === 'iphone') {
      var sizeName = 14;
      var sizeCodeAbbrev = 8;
    } else if (Ti.Platform.osname === 'android') {
      if (Alloy.Globals.isTablet) {
        var sizeName = 22;
        var sizeCodeAbbrev = 14;
      } else {
        var sizeName = 14;
        var sizeCodeAbbrev = 9;
      }
    } else {}



    var fontName = {
      fontFamily: family,
      fontSize: sizeName };

    var fontCodeAbbrev = {
      fontFamily: family,
      fontSize: sizeCodeAbbrev };







    mapAttrib.forEach(function (e) {

      const row = Ti.UI.createPickerRow({
        width: '100%' });

      const labelGid = Ti.UI.createLabel({
        textAlign: 'right',
        width: '100%',
        visible: false,
        text: e.gid,
        font: fontName });

      const labelCode = Ti.UI.createLabel({
        left: 0,
        width: '15%',
        tope: 0,
        height: '50%',
        textAlign: 'left',
        text: e.lz_code,
        font: fontCodeAbbrev });

      const labelAbbrev = Ti.UI.createLabel({
        left: 0,
        width: '15%',
        top: '50%',
        height: '50%',
        textAlign: 'left',
        text: e.lz_abbrev,
        font: fontCodeAbbrev });

      const labelName = Ti.UI.createLabel({
        left: '15%',
        width: '85%',
        textAlign: 'eft',
        text: e.lz_name,
        font: fontName });

      row.add(labelGid);
      row.add(labelCode);
      row.add(labelAbbrev);
      row.add(labelName);
      picker.columns[0].addRow(row);
    });















































  }



  function setMapRegion(lng, lat, lngDelta, latDelta) {
    var defineRegion = {
      longitude: lng,
      latitude: lat,
      longitudeDelta: lngDelta,
      latitudeDelta: latDelta };

    mapView.region = defineRegion;
  }





  function revGeocodeYahoo(lat, lng, id) {

    var queryString = 'select * from yahoo.maps.findLocation where q="' + lat + ',' + lng + '" and gflags="R"';


    Titanium.Yahoo.yql(queryString, function (e) {



      if (e.data !== null && e.data !== undefined) {
        var resultSet = e.data.json.ResultSet;
        if (resultSet.error || resultSet === null) {

          console.log("Error: " + resultSet.error + ", " + resultSet.error);
          alert("Unable to connect to the Internet");
          return null;
        } else if (resultSet.Found = 1) {



          var city = resultSet.Result.city + ", ";

          if (resultSet.Result.city !== undefined && resultSet.Result.city.length > 0) {

            if (resultSet.Result.county !== undefined && resultSet.Result.county.length > 0) {

              if (resultSet.Result.city !== resultSet.Result.county) {

                city = city + resultSet.Result.county + ", ";
              }
            }
          } else {

            if (resultSet.Result.county !== undefined && resultSet.Result.county.length > 0) {
              console.log("county is defined...");

              city = resultSet.Result.county + ", ";
            } else {

              city = "";
            }
          }
          var postal = "";
          if (resultSet.Result.postal !== undefined && resultSet.Result.postal.length > 0) {
            postal = resultSet.Result.postal + ", ";
          }

          setAnnotationSubtitle(id, city + postal + resultSet.Result.state);
        }
      } else {

        revGeocodeGoogle(lat, lng, id);
      }
    });
  }



  function revGeocodeGoogle(lat, lng, id) {

    var url = "http://maps.google.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
    xhr = Titanium.Network.createHTTPClient();
    xhr.open('GET', url);

    xhr.onload = function () {
      var result = JSON.parse(this.responseText);

      if (result.status === "OK") {
        setAnnotationSubtitle(id, result.results[0].formatted_address);

      } else {
        revGeocodeW3C(lat, lng, id);
      }
    };
    xhr.send();
  }



  function revGeocodeW3C(lat, lng, id) {
    Ti.Geolocation.reverseGeocoder(lat, lng, function (e) {
      var code = "";
      console.log(e);
      if (e.error) {
        Ti.API.error('Error: ' + e.error);
      } else if (e.success) {
        if (os_name = "ios") {
          code = e.places[0].zipCode;
        } else {
          code = e.places[0].postCode;
        }
        locationName = e.places[0].street + ", " + e.places[0].city + ", " + e.places[0].region + ", " + code;
        var address = e.places[0].address;
        console.log(address);
        console.log(locationName);
      }
    });
  }



  function setAnnotationSubtitle(id, string) {

    for (i = 0; i < mapView.annotations.length; i++) {
      if (mapView.annotations[i].myId === id) var annotation = mapView.annotations[i];
    }

    annotation.subtitle = string;
  }



  rightButton.addEventListener('singletap', function (e) {
    locationView = Alloy.createController('location', args);

    locationView.location.addEventListener('close', function (e) {

      if (args["removeAnnotation"]) {
        for (i = 0; i < mapView.annotations.length; i++) {
          if (mapView.annotations[i].myId == args.annotationId) {
            mapView.removeAnnotation(mapView.annotations[i]);
          }
        }
      }
    });
  });

  mapView.addEventListener('click', function (evt) {
    if (evt.clicksource === "pin") {
      args["removeAnnotation"] = false;
      args["annotationId"] = evt.annotation.myId;
      args["annotationLong"] = evt.annotation.longitude;
      args["annotationLat"] = evt.annotation.latitude;
      args["annotationTitle"] = evt.annotation.title;
      args["annotationSubtitle"] = evt.annotation.subtitle;
    }
  });




  mapView.addEventListener('longclick', function (evt) {
    mapView.addAnnotation({
      latitude: evt.latitude,
      longitude: evt.longitude,
      draggable: true,
      title: 'Location #' + (count + 1),
      pincolor: map.ANNOTATION_GREEN,
      rightView: rightButton,
      myId: count });


    var locDetails = revGeocodeYahoo(evt.latitude, evt.longitude, count);















    count += 1;
  });

  function doLabelClick(e) {

    if (picker.visible) {

      picker.visible = false;
    } else {





      picker.visible = true;
    }
  }

  function doPolyExtentClick(e) {

    if (polygons.length !== 0) {
      region = polygonExtent(polygons);

      if (!isNaN(region.longitude && region.latitude && (region.longitudeDelta || region.latitudeDelta))) {
        setMapRegion(region.longitude, region.latitude, region.longitudeDelta, region.latitudeDelta);
      }
    }
  }





  function doPickerChange(e) {

    picker.visible = false;

    var gid = picker.getSelectedRow(e.index).children[0].text;

    mapView.removeAllPolygons();
    polygons = [];

    if (gid === "x") {
      $.labelCode.text = " ";
      $.labelAbbrev.text = " ";
      $.labelChooseZone.text = "Click here to select a livelihood zone ...";
    } else {

      $.labelCode.text = picker.getSelectedRow(e.index).children[1].text;
      $.labelAbbrev.text = picker.getSelectedRow(e.index).children[2].text;
      $.labelChooseZone.text = picker.getSelectedRow(e.index).children[3].text;

      var points = fetchSingleGeom("livezones.json", "\"features\": ", gid);

      var holes = [];

      for (var i = 0; i < points.length; i++) {

        if (points[i].slice(1).length > 0) holes = points[i].slice(1);

        var poly = map.createPolygon({
          strokeColor: "#99997b76",
          strokeWidth: 0.7,
          fillColor: "#44bb9a8e",
          points: points[i][0],
          holes: holes,
          level: map.OVERLAY_LEVEL_ABOVE_ROADS });


        mapView.addPolygon(poly);
        polygons.push(poly.points);
      }
    }
  }





  if (Ti.Geolocation.locationServicesEnabled) {
    Titanium.Geolocation.getCurrentPosition(function (e) {
      if (e.error) {
        Ti.API.error('Error: ' + e.error);
      } else {
        setMapRegion(e.coords.longitude, e.coords.latitude, 0.05, 0.05);
      }
    });
  } else {
    alert('Please enable location services');
  }


  picker.visible = false;
  loadPicker("livezones.json", "\"features\": ");





  __defers['$.__views.labelCode!click!doLabelClick'] && $.addListener($.__views.labelCode, 'click', doLabelClick);__defers['$.__views.labelAbbrev!click!doLabelClick'] && $.addListener($.__views.labelAbbrev, 'click', doLabelClick);__defers['$.__views.labelChooseZone!click!doLabelClick'] && $.addListener($.__views.labelChooseZone, 'click', doLabelClick);__defers['$.__views.viewPolyExtent!click!doPolyExtentClick'] && $.addListener($.__views.viewPolyExtent, 'click', doPolyExtentClick);__defers['$.__views.pickerLzs!change!doPickerChange'] && $.addListener($.__views.pickerLzs, 'change', doPickerChange);



  _.extend($, exports);
}

module.exports = Controller;