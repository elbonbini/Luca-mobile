var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.moment = require("alloy/moment");

Alloy.Globals.Map = require("ti.map");

var CryptoJS = require("crypto-js");

var url = "http://192.168.0.5:80";

var JsonFormatter = {
    stringify: function(cipherParams) {
        var jsonObj = {
            ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
        };
        cipherParams.iv && (jsonObj.iv = cipherParams.iv.toString());
        cipherParams.salt && (jsonObj.s = cipherParams.salt.toString());
        return JSON.stringify(jsonObj);
    },
    parse: function(jsonStr) {
        var jsonObj = JSON.parse(jsonStr);
        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
        });
        jsonObj.iv && (cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv));
        jsonObj.s && (cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s));
        return cipherParams;
    }
};

Alloy.Globals.httpPost = function(collection, body, password) {
    var cryptoObj = CryptoJS.AES.encrypt(JSON.stringify(body), password, {
        format: JsonFormatter
    });
    console.log("JSON string to be encrypted: \n" + JSON.stringify(body));
    console.log("Encrypted string to be transmitted: \n" + cryptoObj);
    var httpClient = Ti.Network.createHTTPClient();
    httpClient.onload = function() {
        console.log("Success! Response: " + JSON.parse(this.responseText));
    };
    httpClient.ondatastream = function(e) {
        console.log(e);
    };
    httpClient.timeout = 2e4;
    httpClient.open("POST", url);
    console.log("\nHTTP link set up.\n");
    httpClient.setRequestHeader("Content-Type", "application/json");
    console.log("Sending...");
    httpClient.send(cryptoObj.toString());
};

Alloy.Globals.httpGet = function(collection, password) {
    var myUrl = url + collection;
    var httpClient = Ti.Network.createHTTPClient({
        onload: function() {
            console.log("Received text: " + this.responseText);
            alert("success");
            console.log(CryptoJS.AES.decrypt(this.responseText, password, {
                format: JsonFormatter
            }).toString(CryptoJS.enc.Utf8));
            return CryptoJS.AES.decrypt(this.responseText, password, {
                format: JsonFormatter
            }).toString(CryptoJS.enc.Utf8);
        },
        onerror: function(e) {
            console.log(e.error);
            alert("error");
        },
        timeout: 2e4
    });
    console.log(myUrl);
    httpClient.open("GET", myUrl);
    httpClient.setRequestHeader("Accept", "application/json");
    httpClient.send();
};

Alloy.createController("index");