!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./md5"), require("./hmac")) : "function" == typeof define && define.amd ? define([ "./core", "./md5", "./hmac" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    return CryptoJS.HmacMD5;
});