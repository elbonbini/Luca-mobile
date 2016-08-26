!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./sha1"), require("./hmac")) : "function" == typeof define && define.amd ? define([ "./core", "./sha1", "./hmac" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    return CryptoJS.HmacSHA1;
});