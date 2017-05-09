!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./x64-core"), require("./sha512"), require("./hmac")) : "function" == typeof define && define.amd ? define([ "./core", "./x64-core", "./sha512", "./hmac" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    return CryptoJS.HmacSHA512;
});