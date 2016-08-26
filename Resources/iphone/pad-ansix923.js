!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    CryptoJS.pad.AnsiX923 = {
        pad: function(data, blockSize) {
            var dataSigBytes = data.sigBytes;
            var blockSizeBytes = 4 * blockSize;
            var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
            var lastBytePos = dataSigBytes + nPaddingBytes - 1;
            data.clamp();
            data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
            data.sigBytes += nPaddingBytes;
        },
        unpad: function(data) {
            var nPaddingBytes = 255 & data.words[data.sigBytes - 1 >>> 2];
            data.sigBytes -= nPaddingBytes;
        }
    };
    return CryptoJS.pad.Ansix923;
});