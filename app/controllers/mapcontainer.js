'use strict';
/*
 * Controller for the embedded map view mapcontainer. The controller handles all map functionality,
 * initialising the map to the user's location, loading up livelihood zones from the associated JSON
 * file, initialising the picker, adding LZ ploygons to the map, zooming to them and handling user 
 * annotations.
 */

// Variables used in this view:

// arguments passed to the view from elsewhere
var args = arguments[0] || {};
// shorthand for various objects: the map, the map view and the LZ picker
const map = Alloy.Globals.Map;
const mapView = $.mapView;
const picker = $.pickerLzs;
//picker.width = "94 %";
var count = 0;
// empty object variable to hold the location view
var locationView = {};
// empty array variable to put polygons into for analysis andmanipulation across functions
var polygons = [];
// Button created and displayed on the annotation pop up bubble
const rightButton = Titanium.UI.createButton({
  backgroundColor: "#ffffff",
  backgroundSelectedColor: "#dfb770",
  image: "images/nav-right.png",
  width: 30,
  height: 30
});

const numsOnly = function(acc, e) {
  return typeof e === 'number' ? acc.concat(Array.of(e)) : acc;
};

//const n = (acc, e) => typeof e === 'number' ? accum.concat(Array.of(e)) : acc;

// Useful function (method) get the minimum value in an Array of values
Array.prototype.max = function() {
  return this.reduce(numsOnly, []).length > 0 ? Math.max.apply(Math, this.reduce(numsOnly, [])) : undefined;
};

// Useful function (method) get the maximum value in an Array of values 
Array.prototype.min = function () {
  return this.reduce(numsOnly, []).length > 0 ? Math.min.apply(Math, this.reduce(numsOnly, [])) : undefined;
};

// Sort out an array of objects.
function sortBy(field, reverse, primer) {
  const key = primer ? function(x) { return primer(x[field]); } : function(x) { return x[field]; };
  reverse = !reverse ? 1 : -1;
  return function (a, b) {
      return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    };
};

// Function to drill down to objects embedded in other objects. Can be used to sort on lower level
// embedded object properties.
function drillDown (arr, field) {
  function test(str, open, close) {
    return str.indexOf('{', open) < 0 || str.indexOf('{', open) > str.indexOf('}', close) ? str.indexOf('}', close) : false;
  }
  const result = [];
  arr.forEach(function(elem, i) {
    const oString = JSON.stringify(elem, i);
    const init = oString.indexOf(field);
    const beginObj = oString.lastIndexOf('{', init);
    const endObj = test(oString, init, init);
    result.push(JSON.parse(oString.slice(beginObj, endObj + 1)));
  });
//  for (i = 0, len = array.length; i < len; i++) {
//    var objStr = JSON.stringify(array[i]);
//    var init = objStr.indexOf(field);
//    var beginObj = objStrlastIndexOf("{", init);
//    function test (string, open, close) {
//      console.log("open " + string.indexOf("{", open));
//      console.log("close " + string.indexOf("}", close));
//      if (string.indexOf("{", open) < 0 || string.indexOf("{", open) > string.indexOf("}", close)) {
//        return string.indexOf("}", close);
//      } else {
//        console.log(false);
//      }
//    }
//    endObj = test(objStr, init, init);
//    console.log(objStr.slice(beginObj, endObj + 1));
//    result.push(JSON.parse(objStr.slice(beginObj, endObj + 1)));
//  }
//  console.log(result);
  return result;
}

// Function to fetch polygon geoJSON file from the *?* directory and prune it down to its core data array,
// parse it and return it as an object.
function fetchGeomFile(fileName, pruneString) {
  // identify the file and read it, converting it to text
  var f = Ti.Filesystem.getFile(fileName);
  var mapFile = f.read();
  var mapString = mapFile.text;
  // prune out the meta data on CRS, etc. as well as the last enclosing '}' bracket
  mapString = mapString.slice(mapString.indexOf(pruneString) + pruneString.length, mapString.length - 3);
  // parse the resultant string into a JSON object
  return JSON.parse(mapString);
}

/*
 * Function that calls fetchGeometryFile to extract geometric data for a single feature
 */
function fetchSingleGeom(fileName, pruneString, idCondition) {
  // identify the file and read it, converting it to text
  var mapData = fetchGeomFile(fileName, pruneString);
  // filter against the 'condition' gid value passed in
  for (var i = 0; i < mapData.length; i++) {
    var shape = mapData[i];
    if (shape.properties.gid == idCondition) {
      var coords = shape.geometry.coordinates;
    };
  }
  // return the coordinate points as a 4-dimensional array
  return coords;
}

/*
 * Gets the geometrical extent of the outer ring polygons for zooming. The result is tweaked slightly to fit
 * the polygon onto the screen under the "Choose Livelihood Zone ..." label
 */
function polygonExtent(points) {
  // make sure there is actually a polygon
  if (points.length > 0) {
    // arrays for storing lists of lists of longitude and latitude coordinates from all the outer polygon rings
    var lngs = [];
    var lats = [];
    // loop over each polygon
    for (i = 0; i < points.length; i++) {
      // make sure the polygon contains coordinates
      if (points[i].length > 0) {
        // loop over and load the points into each longitude and latitude array
        for (j = 0; j < points[i].length; j++) {
          lngs.push(points[i][j][0]);
          lats.push(points[i][j][1]);
        }
      }
    }
    // get the minimum, maximum of each array
    var lngMin = lngs.min();
    var lngMax = lngs.max();
    var latMin = lats.min();
    var latMax = lats.max();
    // get the width and height of the bounding boxes
    var deltaLngs = lngMax - lngMin;
    var deltaLats = latMax - latMin;
    // set the return object to the centre (offset slightly on vertical) and the box width & height
    return {
      longitude: lngMin + (deltaLngs / 2),
      latitude: latMin + (deltaLats * 9.2 / 16),
      longitudeDelta: Math.max(deltaLngs, deltaLats),
      latitudeDelta: 1.21 * Math.max(deltaLngs, deltaLats)
    };
  }
}

// Function to load up values in the livelihood zone picker from the geometry file shape attributes.
function loadPicker(dataFile, pruneString) {
  // get the data as a JSON object
  var mapAttrib = drillDown(fetchGeomFile(dataFile, pruneString), 'lz_code');
//  var mapAttrib = function (fetchGeomFile(dataFile, pruneString) ) {
    
//  })
//  console.log("Array length: " + mapAttrib.length + "\nArray:\n" + mapAttrib);
  mapAttrib = mapAttrib.sort(sortBy('lz_code'), false, parseInt);
  
  // set font details, family
  if(Ti.Platform.osname === "ipad" || Ti.Platform.osname === "iphone") {
    var family = "GillSans";
  } else {
    var family = "Gill Light SSi Light";
  }
  // set font details, size
  if(Ti.Platform.osname === 'ipad') {
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
  } else {
    // do nothing for now
  }
  // set the font objects
  var fontName = {
    fontFamily : family,
    fontSize : sizeName
  };
  var fontCodeAbbrev = {
    fontFamily: family,
    fontSize: sizeCodeAbbrev
  };
  
//  var widthPicker = 
//  console.log("Picker's parent: " , picker.parent.id);
//  picker.width = Ti.UI.
  
  // load up the control
  mapAttrib.forEach(function(e) {
//    var shape = e;
    const row = Ti.UI.createPickerRow({
      width : '100%'
    });
    const labelGid = Ti.UI.createLabel({
      textAlign: 'right',
      width: '100%',
      visible: false,
      text: e.gid,
      font: fontName
    });
    const labelCode = Ti.UI.createLabel({
      left: 0,
      width: '15%',
      tope: 0,
      height: '50%',
      textAlign: 'left',
      text: e.lz_code,
      font: fontCodeAbbrev
    });
    const labelAbbrev = Ti.UI.createLabel({
      left: 0,
      width: '15%',
      top: '50%',
      height: '50%',
      textAlign: 'left',
      text: e.lz_abbrev,
      font: fontCodeAbbrev
    });
    const labelName = Ti.UI.createLabel({
      left: '15%',
      width: '85%',
      textAlign: 'eft',
      text: e.lz_name,
      font: fontName
    });
    row.add(labelGid);
    row.add(labelCode);
    row.add(labelAbbrev);
    row.add(labelName);
    picker.columns[0].addRow(row);
  });
//  for (var i = 0; i < mapAttrib.length; i++) {
//    var shape = mapAttrib[i];
//    var row = Ti.UI.createPickerRow({
//      width : "100%"
//    });
//    var labelGid = Ti.UI.createLabel({
//      textAlign: "right",
//      width: "100%",
//      visible: false,
//      text: shape.gid,
//      font: fontName
//    });
//    var labelCode = Ti.UI.createLabel({
//      left: 0,
//      width: "15%",
//      top: 0,
//      height: "50%",
//      textAlign: "left",
//      text: shape.lz_code,
//      font: fontCodeAbbrev
//    });
//    var labelAbbrev = Ti.UI.createLabel({
//      left: 0,
//      width: "15%",
//      top: "50%",
//      height: "50%",
//      textAlign: "left",
//      text: shape.lz_abbrev,
//      font: fontCodeAbbrev
//    });
//      var labelName = Ti.UI.createLabel({
//         left: "15%",
//         width: "85%",
//         textAlign: "left",
//         text: shape.lz_name,
//         font: fontName
//      });
//    console.log("labelCode: ", labelCode.text, ", left: ", labelCode.left, " width: ", labelCode.width);
//    console.log("labelAbbrev: ", labelAbbrev.text, ", left: ", labelAbbrev.left, " width: ", labelAbbrev.width);
//    console.log("labelName: ", labelName.text, ", left: ", labelName.left, " width: ", labelName.width, " alignment: ", labelName.textAlign);
//      row.add(labelGid);
//      row.add(labelCode);
//      row.add(labelAbbrev);
//      row.add(labelName);
//    row.add(viewLzAttribs);
//      picker.columns[0].addRow(row);
//   }

}

// Function to set the region for the visible extent of the map. Used in finding the user location and in zooming
// to the livelihood zones
function setMapRegion(lng, lat, lngDelta, latDelta) {
  var defineRegion = {
    longitude: lng,
    latitude: lat,
    longitudeDelta: lngDelta,
    latitudeDelta: latDelta
  };
  mapView.region = defineRegion;
}

// Use Yahoo geocoding API to obtain address from lon/lat coords.
// Find the annotation with myId that is the same as the passed id (the reason for doing this is that the
// mapView.addAnnotation method doesn't push them in the order in which they are added on the map, extract
// the reverse geocode from yahoo maps using the Yahoo.yql method and process the results in the callback.
function revGeocodeYahoo(lat, lng, id) {
  // look up the geocode info by querying the Yahoo database
  var queryString = 'select * from yahoo.maps.findLocation where q="' + lat + ','+ lng + '" and gflags="R"';
//  console.log("Trying Yahoo reverse geocoder...");
//  console.log(queryString);
  Titanium.Yahoo.yql(queryString, function(e) {
//    console.log(e);
//    console.log(JSON.stringify(e.source));
//    console.log("Result (0=failed, 1=success): " + e.data == null);
    if (e.data !== null && e.data !== undefined) {
      var resultSet = e.data.json.ResultSet;
      if (resultSet.error || resultSet === null) {
        // connection error
        console.log("Error: " + resultSet.error + ", " + resultSet.error);
        alert("Unable to connect to the Internet");
        return null;
      } else if (resultSet.Found = 1) {
        // results obtained.
//      console.log('city = ' + resultSet.Result.city);
//      console.log('county = ' + resultSet.Result.county);
        var city = resultSet.Result.city + ", ";
        // city has a value?
        if (resultSet.Result.city !== undefined && resultSet.Result.city.length > 0) {
          // yes. County has a value?
          if (resultSet.Result.county !== undefined && resultSet.Result.county.length > 0) {
            // yes. Are they the same?
            if (resultSet.Result.city !== resultSet.Result.county) {
              // no, city and county are different so concatenate them; otherwise just use city (default)
              city = city + resultSet.Result.county + ", ";
            }
          }
        } else {
          // city does not have a value. County has a value?
          if (resultSet.Result.county !== undefined && resultSet.Result.county.length > 0) {
            console.log("county is defined...");
            // yes, so use it instead
            city = resultSet.Result.county + ", ";
          } else {
            // neither have a value so output is blank
            city = "";
          }
        }
        var postal = "";
        if (resultSet.Result.postal !== undefined && resultSet.Result.postal.length > 0) {
          postal = resultSet.Result.postal + ", ";
        }
        // set the annotation value
        setAnnotationSubtitle(id, city + postal + resultSet.Result.state);
      }
    } else {
//      console.log(" ...Failed.\n");
      revGeocodeGoogle(lat, lng, id);
    }
  });
}

// Use the Google geocoding API to obtain address from long/lat coords
//
function revGeocodeGoogle(lat, lng, id) {
//  console.log("Trying Google reverse geocoder...");
  var url="http://maps.google.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
  xhr = Titanium.Network.createHTTPClient();
  xhr.open('GET',url);
//  Ti.API.info('>>> go get data for Rgeocode! ...URL: '+url);
  xhr.onload = function() {
    var result = JSON.parse(this.responseText);
//    console.log(result);
    if (result.status === "OK") {
      setAnnotationSubtitle(id, result.results[0].formatted_address);
//      console.log("Success!: " + result.results[0].formatted_address);
    } else {
      revGeocodeW3C(lat, lng, id);
    }
  };
  xhr.send();
}

// Use the W3C geocoding API to obtain address from long/lat coords
//
function revGeocodeW3C(lat, lng, id) {
  Ti.Geolocation.reverseGeocoder(lat, lng , function(e) {
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

// Sets the name of the location on the annotation (usually called by the reverse geocoder)
//
function setAnnotationSubtitle(id, string) {
  // loop through annotations comparing myId with the passsed id argument.
  for (i = 0; i < mapView.annotations.length; i++) {
    if (mapView.annotations[i].myId === id) var annotation = mapView.annotations[i];
  }
  // set the annotation subtitle string
  annotation.subtitle = string;
}

// 
//
rightButton.addEventListener('singletap',function(e) {
  locationView = Alloy.createController('location', args);
//  console.log(JSON.stringify(locationView.location));
  locationView.location.addEventListener('close', function(e) {
//    console.log(args);
    if (args["removeAnnotation"]) {
      for (i = 0; i < mapView.annotations.length; i++) {
        if (mapView.annotations[i].myId == args.annotationId) {
          mapView.removeAnnotation(mapView.annotations[i]);
        }
      }
    }
  });
});

mapView.addEventListener('click', function(evt) {
  if (evt.clicksource === "pin") {
    args["removeAnnotation"] = false;
    args["annotationId"] = evt.annotation.myId;
    args["annotationLong"] = evt.annotation.longitude;
    args["annotationLat"] = evt.annotation.latitude;
    args["annotationTitle"] = evt.annotation.title;
    args["annotationSubtitle"] = evt.annotation.subtitle;
  }
});

// Add the annotaion to the map, setting properties except for subtitle which comes from
// reverse geocoding
// 
mapView.addEventListener('longclick', function(evt) {
  mapView.addAnnotation({
    latitude: evt.latitude,
    longitude: evt.longitude,
    draggable: true,
    title: 'Location #' + (count + 1),
    pincolor: map.ANNOTATION_GREEN,
    rightView: rightButton,
    myId: count
  });
  // initialise the reverse geocoding here. This can be slow, so it is not assigned to a variable
  var locDetails = revGeocodeYahoo(evt.latitude, evt.longitude, count);
//  alert(locDetails);
//  console.log("Result (1 = Success, 0 = Fail): " + locDetails == null);
//  if (locDetails === null) {
//    locDetails = revGeocodeGoogle(evt.latitude, evt.longitude);
//  }
//  console.log("Result (1 = Success, 0 = Fail): " + locDetails == null);
//  if (locDeatils === null) {
//    alert("Cannot find location.");
//  } else {
//  }
//  annotation.subtitle = locDetails;
  // add in the new item to the drawer
//  var listView = Alloy.Globals.parent.listLeft;
//  console.log(Alloy.Globals.parent.listLeft);
//  console.log(listView);
  count += 1;
});

function doLabelClick(e) {
   // shows the picker wheel or hides it i
   if (picker.visible) {
//    console.log(picker.width);
      picker.visible = false;
   } else {
//    console.log("picker width: " , picker.width);
//    console.log("parent:\n",e.source.parent.width);
//    picker.width = e.source.parent.width;
//    picker.columns[0].width = picker.width;
//    console.log("picker width: " , picker.width, " column width: ", picker.columns[0].width);
      picker.visible = true;
   }
}

function doPolyExtentClick(e) {
  // make sure there is a polygon and it's not empty, or else do nothing
  if (polygons.length !== 0) {
    region = polygonExtent(polygons);
    // check there are both coordinates of the centre point and at least one delta; if not, do nothing
    if (!isNaN(region.longitude && region.latitude && (region.longitudeDelta || region.latitudeDelta))) {
      setMapRegion(region.longitude, region.latitude, region.longitudeDelta, region.latitudeDelta);
    }
  }
}

// When the user selects and item in the picker that item must be used to select and draw in the livelihood
// zone polygon. A call is made to fetch the polygon geom (which in turn fetches the polygon geoJSON file)
// and to asdd it to the map
//
function doPickerChange(e) {
  // hide the picker
  picker.visible = false;
  // get the selected gid of the polygon
  var gid = picker.getSelectedRow(e.index).children[0].text;
  // clear off all previous livelihood zone polygons from the map and hide the picker
  mapView.removeAllPolygons();
  polygons = [];
  // test for a livelihood zone; if not, picker (gid) is value "x" instead of a number
  if (gid === "x") {
    $.labelCode.text = " ";
    $.labelAbbrev.text = " ";
    $.labelChooseZone.text = "Click here to select a livelihood zone ...";
  } else {
    //change the labels at the top
    $.labelCode.text = picker.getSelectedRow(e.index).children[1].text;
    $.labelAbbrev.text = picker.getSelectedRow(e.index).children[2].text;
    $.labelChooseZone.text = picker.getSelectedRow(e.index).children[3].text;
    // get the polygon points array
    var points = fetchSingleGeom("livezones.json", "\"features\": ", gid);
    // array for collecting the points that make up holes
    var holes = [];
    // loop over the top dimension of the array; each item is a polygon and its holes
    for (var i = 0; i < points.length; i++) {
      // if there are any second dimension arrays of index > 0 then they are holes
      if (points[i].slice(1).length > 0) holes = points[i].slice(1);
      // create the polygon
      var poly = map.createPolygon({
        strokeColor: "#99997b76",
        strokeWidth: 0.7,
        fillColor: "#44bb9a8e",
        points: points[i][0],
        holes:  holes,
        level: map.OVERLAY_LEVEL_ABOVE_ROADS
      });
      // add the polygon to the map
      mapView.addPolygon(poly);
      polygons.push(poly.points);
    }
  }
}

// Start up code for map begins here.
// Set up the initial (user's) location and a sensible map region.
// Make the picker invisible because it's a popup, but load it up with values
//
if (Ti.Geolocation.locationServicesEnabled) {
  Titanium.Geolocation.getCurrentPosition(function(e) {
    if (e.error) {
      Ti.API.error('Error: ' + e.error);
    } else {
      setMapRegion(e.coords.longitude, e.coords.latitude, 0.05, 0.05);
    }
  });
} else {
  alert('Please enable location services');
}

// sort out the picker: load it up with LZ attributes from the LZ JSON file.
picker.visible = false;
loadPicker("livezones.json", "\"features\": ");
