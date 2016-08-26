!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    CryptoJS.mode.ECB = function() {
        var ECB = CryptoJS.lib.BlockCipherMode.extend();
        ECB.Encryptor = ECB.extend({
            processBlock: function(words, offset) {
                this._cipher.encryptBlock(words, offset);
            }
        });
        ECB.Decryptor = ECB.extend({
            processBlock: function(words, offset) {
                this._cipher.decryptBlock(words, offset);
            }
        });
        return ECB;
    }();
    return CryptoJS.mode.ECB;
});