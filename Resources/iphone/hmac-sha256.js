!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./sha256"), require("./hmac")) : "function" == typeof define && define.amd ? define([ "./core", "./sha256", "./hmac" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    return CryptoJS.HmacSHA256;
});