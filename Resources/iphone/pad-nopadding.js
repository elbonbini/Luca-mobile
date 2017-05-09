!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    CryptoJS.pad.NoPadding = {
        pad: function() {},
        unpad: function() {}
    };
    return CryptoJS.pad.NoPadding;
});