!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./ripemd160"), require("./hmac")) : "function" == typeof define && define.amd ? define([ "./core", "./ripemd160", "./hmac" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    return CryptoJS.HmacRIPEMD160;
});