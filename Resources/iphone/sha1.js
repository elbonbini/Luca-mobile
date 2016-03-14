!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    !function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var W = [];
        var SHA1 = C_algo.SHA1 = Hasher.extend({
            _doReset: function() {
                this._hash = new WordArray.init([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
            },
            _doProcessBlock: function(M, offset) {
                var H = this._hash.words;
                var a = H[0];
                var b = H[1];
                var c = H[2];
                var d = H[3];
                var e = H[4];
                for (var i = 0; 80 > i; i++) {
                    if (16 > i) W[i] = 0 | M[offset + i]; else {
                        var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                        W[i] = n << 1 | n >>> 31;
                    }
                    var t = (a << 5 | a >>> 27) + e + W[i];
                    t += 20 > i ? (b & c | ~b & d) + 1518500249 : 40 > i ? (b ^ c ^ d) + 1859775393 : 60 > i ? (b & c | b & d | c & d) - 1894007588 : (b ^ c ^ d) - 899497514;
                    e = d;
                    d = c;
                    c = b << 30 | b >>> 2;
                    b = a;
                    a = t;
                }
                H[0] = H[0] + a | 0;
                H[1] = H[1] + b | 0;
                H[2] = H[2] + c | 0;
                H[3] = H[3] + d | 0;
                H[4] = H[4] + e | 0;
            },
            _doFinalize: function() {
                var data = this._data;
                var dataWords = data.words;
                var nBitsTotal = 8 * this._nDataBytes;
                var nBitsLeft = 8 * data.sigBytes;
                dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
                data.sigBytes = 4 * dataWords.length;
                this._process();
                return this._hash;
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                clone._hash = this._hash.clone();
                return clone;
            }
        });
        C.SHA1 = Hasher._createHelper(SHA1);
        C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
    }();
    return CryptoJS.SHA1;
});