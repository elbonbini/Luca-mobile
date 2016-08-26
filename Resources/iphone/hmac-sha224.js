!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./sha256"), require("./sha224"), require("./hmac")) : "function" == typeof define && define.amd ? define([ "./core", "./sha256", "./sha224", "./hmac" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    return CryptoJS.HmacSHA224;
});