!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./x64-core"), require("./sha3"), require("./hmac")) : "function" == typeof define && define.amd ? define([ "./core", "./x64-core", "./sha3", "./hmac" ], factory) : factory(root.CryptoJS);
}(this, function() {
    return CryptoJSHmacSHA3;
});