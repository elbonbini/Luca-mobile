!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    !function(undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var X32WordArray = C_lib.WordArray;
        var C_x64 = C.x64 = {};
        C_x64.Word = Base.extend({
            init: function(high, low) {
                this.high = high;
                this.low = low;
            }
        });
        C_x64.WordArray = Base.extend({
            init: function(words, sigBytes) {
                words = this.words = words || [];
                this.sigBytes = sigBytes != undefined ? sigBytes : 8 * words.length;
            },
            toX32: function() {
                var x64Words = this.words;
                var x64WordsLength = x64Words.length;
                var x32Words = [];
                for (var i = 0; x64WordsLength > i; i++) {
                    var x64Word = x64Words[i];
                    x32Words.push(x64Word.high);
                    x32Words.push(x64Word.low);
                }
                return X32WordArray.create(x32Words, this.sigBytes);
            },
            clone: function() {
                var clone = Base.clone.call(this);
                var words = clone.words = this.words.slice(0);
                var wordsLength = words.length;
                for (var i = 0; wordsLength > i; i++) words[i] = words[i].clone();
                return clone;
            }
        });
    }();
    return CryptoJS;
});