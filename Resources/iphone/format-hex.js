!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    !function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var CipherParams = C_lib.CipherParams;
        var C_enc = C.enc;
        var Hex = C_enc.Hex;
        var C_format = C.format;
        C_format.Hex = {
            stringify: function(cipherParams) {
                return cipherParams.ciphertext.toString(Hex);
            },
            parse: function(input) {
                var ciphertext = Hex.parse(input);
                return CipherParams.create({
                    ciphertext: ciphertext
                });
            }
        };
    }();
    return CryptoJS.format.Hex;
});