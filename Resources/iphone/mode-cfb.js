!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    CryptoJS.mode.CFB = function() {
        function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
            var iv = this._iv;
            if (iv) {
                var keystream = iv.slice(0);
                this._iv = void 0;
            } else var keystream = this._prevBlock;
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; blockSize > i; i++) words[offset + i] ^= keystream[i];
        }
        var CFB = CryptoJS.lib.BlockCipherMode.extend();
        CFB.Encryptor = CFB.extend({
            processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
                this._prevBlock = words.slice(offset, offset + blockSize);
            }
        });
        CFB.Decryptor = CFB.extend({
            processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                var thisBlock = words.slice(offset, offset + blockSize);
                generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
                this._prevBlock = thisBlock;
            }
        });
        return CFB;
    }();
    return CryptoJS.mode.CFB;
});