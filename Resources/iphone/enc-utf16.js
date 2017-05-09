!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    !function() {
        function swapEndian(word) {
            return word << 8 & 4278255360 | word >>> 8 & 16711935;
        }
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        C_enc.Utf16 = C_enc.Utf16BE = {
            stringify: function(wordArray) {
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var utf16Chars = [];
                for (var i = 0; sigBytes > i; i += 2) {
                    var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 65535;
                    utf16Chars.push(String.fromCharCode(codePoint));
                }
                return utf16Chars.join("");
            },
            parse: function(utf16Str) {
                var utf16StrLength = utf16Str.length;
                var words = [];
                for (var i = 0; utf16StrLength > i; i++) words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
                return WordArray.create(words, 2 * utf16StrLength);
            }
        };
        C_enc.Utf16LE = {
            stringify: function(wordArray) {
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var utf16Chars = [];
                for (var i = 0; sigBytes > i; i += 2) {
                    var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 65535);
                    utf16Chars.push(String.fromCharCode(codePoint));
                }
                return utf16Chars.join("");
            },
            parse: function(utf16Str) {
                var utf16StrLength = utf16Str.length;
                var words = [];
                for (var i = 0; utf16StrLength > i; i++) words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
                return WordArray.create(words, 2 * utf16StrLength);
            }
        };
    }();
    return CryptoJS.enc.Utf16;
});