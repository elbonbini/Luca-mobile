// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
//

Alloy.Globals.moment = require('alloy/moment');
Alloy.Globals.Map = require('ti.map');
var CryptoJS = require("crypto-js");
var url = "http://192.168.0.5:80";


var JsonFormatter = {
    stringify: function (cipherParams) {
        // create json object with ciphertext
        var jsonObj = {
            ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
        };

        // optionally add iv and salt
        if (cipherParams.iv) {
            jsonObj.iv = cipherParams.iv.toString();
        }
        if (cipherParams.salt) {
            jsonObj.s = cipherParams.salt.toString();
        }

        // stringify json object
        return JSON.stringify(jsonObj);
    },

    parse: function (jsonStr) {
        // parse json string
        var jsonObj = JSON.parse(jsonStr);

        // extract ciphertext from json object, and create cipher params object
        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
        });

        // optionally extract iv and salt
        if (jsonObj.iv) {
            cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
        }
        if (jsonObj.s) {
            cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
        }

        return cipherParams;
    }
};



// Test out CryptoJS
//console.log("Input\n********************************\nkey = " + password);
//var dataObject = {
//    email : "rethman@telkomsa.net",
//    password: "n1ch0l4s"
//};
//
//console.log("JSON of user details: \n" + JSON.stringify(dataObject));
//
//var hw = CryptoJS.AES.encrypt(JSON.stringify(dataObject), password, { format: JsonFormatter });
//console.log("Output\n********************************\nThesa are the encrypted strings: \n" + hw);
//
//var nw = CryptoJS.AES.decrypt(hw, password, { format: JsonFormatter });
//console.log("This is the string after being decrypted: \n" + nw.toString(CryptoJS.enc.Utf8));
// It works! Woo-hoo...



//Alloy.Globals.cipher = (function(direction, body, password) {
//    if (direction = "encipher") {
//        return CryptoJS.AES.encrypt(JSON.stringify(dataObject), password, {
//            mode: CryptoJS.mode.CTR, 
//            padding: CryptoJS.pad.AnsiX923
//        });
//    } else if (direction = "decipher") {
//        var deciphered = CryptoJS.AES.decrypt(hw, password, {
//            mode: CryptoJS.mode.CTR, padding: CryptoJS.pad.AnsiX923
//        });
//        return deciphered.toString(CryptoJS.enc.Utf8);
//    } else {
//        console.log("Direction must be either \'encipher\' or \'decipher\'!");
//    }
//});

Alloy.Globals.httpPost = (function(collection, body, password) {
    var myUrl = url + collection;
    var cryptoObj = CryptoJS.AES.encrypt(JSON.stringify(body), password, {
        format: JsonFormatter 
    });
//    console.log("body to be sent: \n" + body);
    console.log("JSON string to be encrypted: \n" + JSON.stringify(body));
    console.log("Encrypted string to be transmitted: \n" + cryptoObj);
//    var blob = cryptoObj.toBlob();
    
    var httpClient = Ti.Network.createHTTPClient();
    httpClient.onload = function(e) {
        // handle response, which at minimum will be an HTTP status code
        console.log("Success! Response: " + JSON.parse(this.responseText));
    };
    httpClient.ondatastream = function(e) {
        console.log(e);
    };
    // timeout for connection in milliseconds
    httpClient.timeout = 20000;
    // Request is actually sent with this statement
    httpClient.open('POST', url);
    console.log("\nHTTP link set up.\n");
    httpClient.setRequestHeader('Content-Type','application/json');
    console.log("Sending...");
    httpClient.send(cryptoObj.toString());
// Example of POST to /Images from the command line
// curl -H "Content-Type: application/json" -X POST -d '{"title":"New Item"}' https://localhost:3000/items
});

Alloy.Globals.httpGet = (function(collection, password) {
    // Add the require Mongo collection on to the URL and create the client for sending the request
    var myUrl = url + collection;
    var httpClient = Ti.Network.createHTTPClient({
        // function called when the response data is available
        onload : function(e) {
            console.log("Received text: " + this.responseText);
            alert('success');
            console.log(CryptoJS.AES.decrypt(this.responseText, 
                password, {format: JsonFormatter}).toString(CryptoJS.enc.Utf8));
            return CryptoJS.AES.decrypt(this.responseText, 
                password, {format: JsonFormatter}).toString(CryptoJS.enc.Utf8);
        },
        // function called when an error occurs, including a timeout
        onerror : function(e) {
            console.log(e.error);
            alert('error');
        },
        timeout : 20000  // in milliseconds
    });
    // Prepare the connection.
    console.log(myUrl);
    httpClient.open("GET", myUrl);
    httpClient.setRequestHeader('Accept','application/json');
    // Send the request.
    httpClient.send();
});
