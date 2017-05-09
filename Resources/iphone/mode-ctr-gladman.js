!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    CryptoJS.mode.CTRGladman = function() {
        function incWord(word) {
            if (255 === (word >> 24 & 255)) {
                var b1 = word >> 16 & 255;
                var b2 = word >> 8 & 255;
                var b3 = 255 & word;
                if (255 === b1) {
                    b1 = 0;
                    if (255 === b2) {
                        b2 = 0;
                        255 === b3 ? b3 = 0 : ++b3;
                    } else ++b2;
                } else ++b1;
                word = 0;
                word += b1 << 16;
                word += b2 << 8;
                word += b3;
            } else word += 1 << 24;
            return word;
        }
        function incCounter(counter) {
            0 === (counter[0] = incWord(counter[0])) && (counter[1] = incWord(counter[1]));
            return counter;
        }
        var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();
        var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
            processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                var iv = this._iv;
                var counter = this._counter;
                if (iv) {
                    counter = this._counter = iv.slice(0);
                    this._iv = void 0;
                }
                incCounter(counter);
                var keystream = counter.slice(0);
                cipher.encryptBlock(keystream, 0);
                for (var i = 0; blockSize > i; i++) words[offset + i] ^= keystream[i];
            }
        });
        CTRGladman.Decryptor = Encryptor;
        return CTRGladman;
    }();
    return CryptoJS.mode.CTRGladman;
});