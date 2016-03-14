function doClick(e) {
  var login = Alloy.createController('login');
  $.intro.close();
}

var args = arguments[0] || {};
$.intro.open();