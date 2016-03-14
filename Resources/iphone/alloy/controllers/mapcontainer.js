function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function drillDown(array, field) {
        function test(string, open, close) {
            if (string.indexOf("{", open) < 0 || string.indexOf("{", open) > string.indexOf("}", close)) return string.indexOf("}", close);
            console.log(false);
        }
        var result = [];
        for (i = 0, len = array.length; len > i; i++) {
            var objStr = JSON.stringify(array[i]);
            var init = objStr.indexOf(field);
            var beginObj = objStr.lastIndexOf("{", init);
            endObj = test(objStr, init, init);
            result.push(JSON.parse(objStr.slice(beginObj, endObj + 1)));
        }
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
            if (shape.properties.gid == idCondition) var coords = shape.geometry.coordinates;
        }
        return coords;
    }
    function polygonExtent(points) {
        if (points.length > 0) {
            var lngs = [];
            var lats = [];
            for (i = 0; i < points.length; i++) if (points[i].length > 0) for (j = 0; j < points[i].length; j++) {
                lngs.push(points[i][j][0]);
                lats.push(points[i][j][1]);
            }
            var lngMin = lngs.min();
            var lngMax = lngs.max();
            var latMin = lats.min();
            var latMax = lats.max();
            var deltaLngs = lngMax - lngMin;
            var deltaLats = latMax - latMin;
            return {
                longitude: lngMin + deltaLngs / 2,
                latitude: latMin + 9.2 * deltaLats / 16,
                longitudeDelta: Math.max(deltaLngs, deltaLats),
                latitudeDelta: 1.21 * Math.max(deltaLngs, deltaLats)
            };
        }
    }
    function loadPicker(dataFile, pruneString) {
        var mapAttrib = drillDown(fetchGeomFile(dataFile, pruneString), "lz_code");
        mapAttrib = mapAttrib.sort(sortBy("lz_code"), false, parseInt);
        if ("ipad" === Ti.Platform.osname || "iphone" === Ti.Platform.osname) var family = "GillSans"; else var family = "Gill Light SSi Light";
        if ("ipad" === Ti.Platform.osname) {
            var sizeName = 20;
            var sizeCodeAbbrev = 13;
        } else if ("iphone" === Ti.Platform.osname) {
            var sizeName = 14;
            var sizeCodeAbbrev = 8;
        } else if ("android" === Ti.Platform.osname) if (Alloy.Globals.isTablet) {
            var sizeName = 22;
            var sizeCodeAbbrev = 14;
        } else {
            var sizeName = 14;
            var sizeCodeAbbrev = 9;
        }
        var fontName = {
            fontFamily: family,
            fontSize: sizeName
        };
        var fontCodeAbbrev = {
            fontFamily: family,
            fontSize: sizeCodeAbbrev
        };
        for (var i = 0; i < mapAttrib.length; i++) {
            var shape = mapAttrib[i];
            var row = Ti.UI.createPickerRow();
            var labelGid = Ti.UI.createLabel({
                textAlign: "right",
                width: 20,
                visible: false,
                text: shape.gid,
                font: fontName
            });
            var labelCode = Ti.UI.createLabel({
                left: 0,
                width: "15%",
                top: 0,
                height: "50%",
                textAlign: "left",
                text: shape.lz_code,
                font: fontCodeAbbrev
            });
            var labelAbbrev = Ti.UI.createLabel({
                left: 0,
                width: "15%",
                top: "50%",
                height: "50%",
                textAlign: "left",
                text: shape.lz_abbrev,
                font: fontCodeAbbrev
            });
            var labelName = Ti.UI.createLabel({
                left: "15%",
                right: 0,
                textAlign: "left",
                text: shape.lz_name,
                font: fontName
            });
            row.add(labelGid);
            row.add(labelCode);
            row.add(labelAbbrev);
            row.add(labelName);
            picker.columns[0].addRow(row);
        }
    }
    function setMapRegion(lng, lat, lngDelta, latDelta) {
        var defineRegion = {
            longitude: lng,
            latitude: lat,
            longitudeDelta: lngDelta,
            latitudeDelta: latDelta
        };
        mapView.region = defineRegion;
    }
    function revGeocodeYahoo(lat, lng, id) {
        var queryString = 'select * from yahoo.maps.findLocation where q="' + lat + "," + lng + '" and gflags="R"';
        Titanium.Yahoo.yql(queryString, function(e) {
            if (null !== e.data) {
                var resultSet = e.data.json.ResultSet;
                if (resultSet.error || null === resultSet) {
                    console.log("Error: " + resultSet.error + ", " + resultSet.error);
                    alert("Unable to connect to the Internet");
                    return null;
                }
                if (resultSet.Found = 1) {
                    var city = resultSet.Result.city + ", ";
                    if (void 0 !== resultSet.Result.city && resultSet.Result.city.length > 0) void 0 !== resultSet.Result.county && resultSet.Result.county.length > 0 && resultSet.Result.city !== resultSet.Result.county && (city = city + resultSet.Result.county + ", "); else if (void 0 !== resultSet.Result.county && resultSet.Result.county.length > 0) {
                        console.log("county is defined...");
                        city = resultSet.Result.county + ", ";
                    } else city = "";
                    var postal = "";
                    void 0 !== resultSet.Result.postal && resultSet.Result.postal.length > 0 && (postal = resultSet.Result.postal + ", ");
                    setAnnotationSubtitle(id, city + postal + resultSet.Result.state);
                }
            } else revGeocodeGoogle(lat, lng, id);
        });
    }
    function revGeocodeGoogle(lat, lng, id) {
        var url = "http://maps.google.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
        xhr = Titanium.Network.createHTTPClient();
        xhr.open("GET", url);
        xhr.onload = function() {
            var result = JSON.parse(this.responseText);
            "OK" === result.status ? setAnnotationSubtitle(id, result.results[0].formatted_address) : revGeocodeW3C(lat, lng, id);
        };
        xhr.send();
    }
    function revGeocodeW3C(lat, lng) {
        Ti.Geolocation.reverseGeocoder(lat, lng, function(e) {
            var code = "";
            console.log(e);
            if (e.error) Ti.API.error("Error: " + e.error); else if (e.success) {
                code = (os_name = "ios") ? e.places[0].zipCode : e.places[0].postCode;
                locationName = e.places[0].street + ", " + e.places[0].city + ", " + e.places[0].region + ", " + code;
                var address = e.places[0].address;
                console.log(address);
                console.log(locationName);
            }
        });
    }
    function setAnnotationSubtitle(id, string) {
        for (i = 0; i < mapView.annotations.length; i++) if (mapView.annotations[i].myId === id) var annotation = mapView.annotations[i];
        annotation.subtitle = string;
    }
    function doLabelClick() {
        picker.visible = picker.visible ? false : true;
    }
    function doPolyExtentClick() {
        if (0 !== polygons.length) {
            region = polygonExtent(polygons);
            isNaN(region.longitude && region.latitude && (region.longitudeDelta || region.latitudeDelta)) || setMapRegion(region.longitude, region.latitude, region.longitudeDelta, region.latitudeDelta);
        }
    }
    function doPickerChange(e) {
        picker.visible = false;
        var gid = picker.getSelectedRow(e.index).children[0].text;
        mapView.removeAllPolygons();
        polygons = [];
        if ("x" === gid) {
            $.labelCode.text = " ";
            $.labelAbbrev.text = " ";
            $.labelChooseZone.text = "Click here to select a livelihood zone ...";
        } else {
            $.labelCode.text = picker.getSelectedRow(e.index).children[1].text;
            $.labelAbbrev.text = picker.getSelectedRow(e.index).children[2].text;
            $.labelChooseZone.text = picker.getSelectedRow(e.index).children[3].text;
            var points = fetchSingleGeom("livezones.json", '"features": ', gid);
            var holes = [];
            for (var i = 0; i < points.length; i++) {
                points[i].slice(1).length > 0 && (holes = points[i].slice(1));
                var poly = map.createPolygon({
                    strokeColor: "#99997b76",
                    strokeWidth: .7,
                    fillColor: "#44bb9a8e",
                    points: points[i][0],
                    holes: holes,
                    level: map.OVERLAY_LEVEL_ABOVE_ROADS
                });
                mapView.addPolygon(poly);
                polygons.push(poly.points);
            }
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mapcontainer";
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
    $.__views.livezones = Ti.UI.createView({
        id: "livezones"
    });
    $.__views.livezones && $.addTopLevelView($.__views.livezones);
    var __alloyId138 = [];
    $.__views.mapView = (require("ti.map").createView || Ti.UI.createView)({
        top: 0,
        regionFit: true,
        animate: true,
        userLocation: true,
        userLocationButton: true,
        compassEnabled: true,
        enableZoomControls: true,
        annotations: __alloyId138,
        id: "mapView"
    });
    $.__views.livezones.add($.__views.mapView);
    $.__views.viewLabels = Ti.UI.createView({
        center: {
            x: "50%"
        },
        width: "94%",
        top: 0,
        height: "45dp",
        borderColor: "#000000",
        borderWidth: 1,
        backgroundColor: "#ffffff",
        opacity: .7,
        id: "viewLabels"
    });
    $.__views.livezones.add($.__views.viewLabels);
    $.__views.labelCode = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            left: 0,
            width: "15%",
            top: 0,
            height: "50%",
            textAlign: "left"
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 8
            }
        });
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 13
            }
        });
        Alloy.deepExtend(true, o, {
            color: "#000000",
            left: "2%",
            width: "15%",
            top: 0,
            height: "23dp",
            textAlign: "left",
            id: "labelCode"
        });
        return o;
    }());
    $.__views.viewLabels.add($.__views.labelCode);
    doLabelClick ? $.addListener($.__views.labelCode, "click", doLabelClick) : __defers["$.__views.labelCode!click!doLabelClick"] = true;
    $.__views.labelAbbrev = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            left: 0,
            width: "15%",
            top: "50%",
            height: "50%",
            textAlign: "left"
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 8
            }
        });
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 13
            }
        });
        Alloy.deepExtend(true, o, {
            color: "#000000",
            left: "2%",
            width: "15%",
            top: 22,
            height: "23dp",
            textAlign: "left",
            id: "labelAbbrev"
        });
        return o;
    }());
    $.__views.viewLabels.add($.__views.labelAbbrev);
    doLabelClick ? $.addListener($.__views.labelAbbrev, "click", doLabelClick) : __defers["$.__views.labelAbbrev!click!doLabelClick"] = true;
    $.__views.labelChooseZone = Ti.UI.createLabel(function() {
        var o = {};
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
            color: "#000000",
            left: "15%",
            right: "42dp",
            top: 0,
            height: "45dp",
            textAlign: "left",
            text: "Click here to select a livelihood zone ...",
            id: "labelChooseZone"
        });
        return o;
    }());
    $.__views.viewLabels.add($.__views.labelChooseZone);
    doLabelClick ? $.addListener($.__views.labelChooseZone, "click", doLabelClick) : __defers["$.__views.labelChooseZone!click!doLabelClick"] = true;
    $.__views.buttonPolyExtent = Ti.UI.createButton(function() {
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
            image: "images/android_locate.png",
            right: "6dp",
            width: "30dp",
            top: "3dp",
            bottom: "12dp",
            id: "buttonPolyExtent"
        });
        return o;
    }());
    $.__views.viewLabels.add($.__views.buttonPolyExtent);
    doPolyExtentClick ? $.addListener($.__views.buttonPolyExtent, "click", doPolyExtentClick) : __defers["$.__views.buttonPolyExtent!click!doPolyExtentClick"] = true;
    $.__views.pickerLzs = Ti.UI.createPicker({
        borderColor: "#000000",
        borderWidth: 1,
        center: {
            x: "50%"
        },
        width: "94%",
        top: "43dp",
        selectionIndicator: true,
        useSpinner: true,
        opacity: .7,
        id: "pickerLzs"
    });
    $.__views.livezones.add($.__views.pickerLzs);
    var __alloyId139 = [];
    $.__views.lzdetails = Ti.UI.createPickerColumn({
        id: "lzdetails"
    });
    __alloyId139.push($.__views.lzdetails);
    $.__views.__alloyId140 = Ti.UI.createPickerRow({
        id: "__alloyId140"
    });
    $.__views.lzdetails.addRow($.__views.__alloyId140);
    $.__views.__alloyId141 = Ti.UI.createLabel({
        textAlign: "right",
        width: 20,
        visible: false,
        id: "__alloyId141"
    });
    $.__views.__alloyId140.add($.__views.__alloyId141);
    $.__views.__alloyId142 = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            left: 0,
            width: "15%",
            top: 0,
            height: "50%",
            textAlign: "left"
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 8
            }
        });
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 13
            }
        });
        Alloy.deepExtend(true, o, {
            id: "__alloyId142"
        });
        return o;
    }());
    $.__views.__alloyId140.add($.__views.__alloyId142);
    $.__views.__alloyId143 = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            left: 0,
            width: "15%",
            top: "50%",
            height: "50%",
            textAlign: "left"
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 8
            }
        });
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 13
            }
        });
        Alloy.deepExtend(true, o, {
            id: "__alloyId143"
        });
        return o;
    }());
    $.__views.__alloyId140.add($.__views.__alloyId143);
    $.__views.__alloyId144 = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            left: "15%",
            right: 0,
            textAlign: "left"
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 14
            }
        });
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            font: {
                fontFamily: "GillSans",
                fontSize: 20
            }
        });
        Alloy.deepExtend(true, o, {
            text: "No livelihood zone",
            id: "__alloyId144"
        });
        return o;
    }());
    $.__views.__alloyId140.add($.__views.__alloyId144);
    $.__views.pickerLzs.add(__alloyId139);
    doPickerChange ? $.addListener($.__views.pickerLzs, "change", doPickerChange) : __defers["$.__views.pickerLzs!change!doPickerChange"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var map = Alloy.Globals.Map;
    var mapView = $.mapView;
    var picker = $.pickerLzs;
    var count = 0;
    var locationView = {};
    var polygons = [];
    var rightButton = Titanium.UI.createButton({
        backgroundColor: "#ffffff",
        backgroundSelectedColor: "#dfb770",
        image: "images/nav-right.png",
        width: 30,
        height: 30
    });
    var sortBy = function(field, reverse, primer) {
        var key = primer ? function(x) {
            return primer(x[field]);
        } : function(x) {
            return x[field];
        };
        reverse = reverse ? -1 : 1;
        return function(a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        };
    };
    Array.prototype.max = function() {
        return Math.max.apply(Math, this);
    };
    Array.prototype.min = function() {
        return Math.min.apply(Math, this);
    };
    rightButton.addEventListener("singletap", function() {
        locationView = Alloy.createController("location", args);
        locationView.location.addEventListener("close", function() {
            if (args["removeAnnotation"]) for (i = 0; i < mapView.annotations.length; i++) mapView.annotations[i].myId == args.annotationId && mapView.removeAnnotation(mapView.annotations[i]);
        });
    });
    mapView.addEventListener("click", function(evt) {
        if ("pin" === evt.clicksource) {
            args["removeAnnotation"] = false;
            args["annotationId"] = evt.annotation.myId;
            args["annotationLong"] = evt.annotation.longitude;
            args["annotationLat"] = evt.annotation.latitude;
            args["annotationTitle"] = evt.annotation.title;
            args["annotationSubtitle"] = evt.annotation.subtitle;
        }
    });
    mapView.addEventListener("longclick", function(evt) {
        mapView.addAnnotation({
            latitude: evt.latitude,
            longitude: evt.longitude,
            draggable: true,
            title: "Location #" + (count + 1),
            pincolor: map.ANNOTATION_GREEN,
            rightView: rightButton,
            myId: count
        });
        revGeocodeYahoo(evt.latitude, evt.longitude, count);
        count += 1;
    });
    Ti.Geolocation.locationServicesEnabled ? Titanium.Geolocation.getCurrentPosition(function(e) {
        e.error ? Ti.API.error("Error: " + e.error) : setMapRegion(e.coords.longitude, e.coords.latitude, .05, .05);
    }) : alert("Please enable location services");
    picker.visible = false;
    loadPicker("livezones.json", '"features": ');
    __defers["$.__views.labelCode!click!doLabelClick"] && $.addListener($.__views.labelCode, "click", doLabelClick);
    __defers["$.__views.labelAbbrev!click!doLabelClick"] && $.addListener($.__views.labelAbbrev, "click", doLabelClick);
    __defers["$.__views.labelChooseZone!click!doLabelClick"] && $.addListener($.__views.labelChooseZone, "click", doLabelClick);
    __defers["$.__views.buttonPolyExtent!click!doPolyExtentClick"] && $.addListener($.__views.buttonPolyExtent, "click", doPolyExtentClick);
    __defers["$.__views.pickerLzs!change!doPickerChange"] && $.addListener($.__views.pickerLzs, "change", doPickerChange);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;