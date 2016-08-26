function doClick(e) {
  if(e.source.id === "newUserButton") {
    var register = Alloy.createController("register");
    $.login.add("register");
    $.newUserGroup.visible = false;
  } else if (e.source.id === "forgotPasswordButton") {
    alert("An email will be sent to your address.");
//        $.login.close();
  } else {
    Alloy.Globals.parent.open({exitOnClose:true});
    $.login.close();
  }
}

var args = arguments[0] || {};
$.login.open();
