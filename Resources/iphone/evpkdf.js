!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./sha1"), require("./hmac")) : "function" == typeof define && define.amd ? define([ "./core", "./sha1", "./hmac" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    !function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var MD5 = C_algo.MD5;
        var EvpKDF = C_algo.EvpKDF = Base.extend({
            cfg: Base.extend({
                keySize: 4,
                hasher: MD5,
                iterations: 1
            }),
            init: function(cfg) {
                this.cfg = this.cfg.extend(cfg);
            },
            compute: function(password, salt) {
                var cfg = this.cfg;
                var hasher = cfg.hasher.create();
                var derivedKey = WordArray.create();
                var derivedKeyWords = derivedKey.words;
                var keySize = cfg.keySize;
                var iterations = cfg.iterations;
                while (derivedKeyWords.length < keySize) {
                    block && hasher.update(block);
                    var block = hasher.update(password).finalize(salt);
                    hasher.reset();
                    for (var i = 1; iterations > i; i++) {
                        block = hasher.finalize(block);
                        hasher.reset();
                    }
                    derivedKey.concat(block);
                }
                derivedKey.sigBytes = 4 * keySize;
                return derivedKey;
            }
        });
        C.EvpKDF = function(password, salt, cfg) {
            return EvpKDF.create(cfg).compute(password, salt);
        };
    }();
    return CryptoJS.EvpKDF;
});