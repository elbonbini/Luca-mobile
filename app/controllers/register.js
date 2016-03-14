var sha1 = require('alloy/sha1');
var hashKey = "01234567890abcdefghijklmnopqrstuvwxyz";
//var buttonCount = 0;
function createHash (key, data) {
  return sha1.str_hmac_sha1(key, data);
};


function doClick(e) {
  if (e.source.id === "regButton") {
    if (validatePasswords(hashKey, $.fPasswordText.value, $.sPasswordText.value)) {
      if (validateEmail($.emailText.value)) {
        // Check email exists?
/*        console.log('/users, ' + Ti.App.guid);
        var existing = Alloy.Globals.httpGet('/users', Ti.App.guid);
        alert(existing);
        if (existing === '') {
          Alloy.Globals.httpPost('/users', {
              'email' : $.emailText.value,
              'password' : createHash(hashKey, $.fPasswordText.value),
              'sent_at' : Alloy.Globals.moment()
          }, Ti.App.guid); */
          $.register.close();
/*        } else {
          $.emailWarningLabel.text = "This email address is already in use" +
            "\nChoose a different email address, please.";
        } */
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
//    Ti.API.info("button Press count: " + buttonCount);
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
  // First check if any value was actually set
  if (address.length == 0) return false;
  // Now validate the email format using nasty regular expressions to check that it obeys email rules!
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
//    var re = /^([\w#$!~\-\&\*\'\+\(\)\=\;\:\,])[\w#$!~\-\&\*\'\+\(\)\=\;\:\,\.]*@\w+\.\w\w/;
  return re.test(address);
};

var args = arguments[0] || {};
$.register.open();

