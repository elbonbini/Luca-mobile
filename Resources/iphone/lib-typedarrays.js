!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    !function() {
        if ("function" != typeof ArrayBuffer) return;
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var superInit = WordArray.init;
        var subInit = WordArray.init = function(typedArray) {
            typedArray instanceof ArrayBuffer && (typedArray = new Uint8Array(typedArray));
            (typedArray instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) && (typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength));
            if (typedArray instanceof Uint8Array) {
                var typedArrayByteLength = typedArray.byteLength;
                var words = [];
                for (var i = 0; typedArrayByteLength > i; i++) words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
                superInit.call(this, words, typedArrayByteLength);
            } else superInit.apply(this, arguments);
        };
        subInit.prototype = WordArray;
    }();
    return CryptoJS.lib.WordArray;
});