!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    CryptoJS.pad.ZeroPadding = {
        pad: function(data, blockSize) {
            var blockSizeBytes = 4 * blockSize;
            data.clamp();
            data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
        },
        unpad: function(data) {
            var dataWords = data.words;
            var i = data.sigBytes - 1;
            while (!(dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 255)) i--;
            data.sigBytes = i + 1;
        }
    };
    return CryptoJS.pad.ZeroPadding;
});