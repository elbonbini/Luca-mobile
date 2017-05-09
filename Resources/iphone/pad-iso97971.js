!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    CryptoJS.pad.Iso97971 = {
        pad: function(data, blockSize) {
            data.concat(CryptoJS.lib.WordArray.create([ 2147483648 ], 1));
            CryptoJS.pad.ZeroPadding.pad(data, blockSize);
        },
        unpad: function(data) {
            CryptoJS.pad.ZeroPadding.unpad(data);
            data.sigBytes--;
        }
    };
    return CryptoJS.pad.Iso97971;
});