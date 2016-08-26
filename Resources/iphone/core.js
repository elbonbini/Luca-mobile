!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory() : "function" == typeof define && define.amd ? define([], factory) : root.CryptoJS = factory();
}(this, function() {
    var CryptoJS = CryptoJS || function(Math, undefined) {
        var C = {};
        var C_lib = C.lib = {};
        var Base = C_lib.Base = function() {
            function F() {}
            return {
                extend: function(overrides) {
                    F.prototype = this;
                    var subtype = new F();
                    overrides && subtype.mixIn(overrides);
                    subtype.hasOwnProperty("init") || (subtype.init = function() {
                        subtype.$super.init.apply(this, arguments);
                    });
                    subtype.init.prototype = subtype;
                    subtype.$super = this;
                    return subtype;
                },
                create: function() {
                    var instance = this.extend();
                    instance.init.apply(instance, arguments);
                    return instance;
                },
                init: function() {},
                mixIn: function(properties) {
                    for (var propertyName in properties) properties.hasOwnProperty(propertyName) && (this[propertyName] = properties[propertyName]);
                    properties.hasOwnProperty("toString") && (this.toString = properties.toString);
                },
                clone: function() {
                    return this.init.prototype.extend(this);
                }
            };
        }();
        var WordArray = C_lib.WordArray = Base.extend({
            init: function(words, sigBytes) {
                words = this.words = words || [];
                this.sigBytes = sigBytes != undefined ? sigBytes : 4 * words.length;
            },
            toString: function(encoder) {
                return (encoder || Hex).stringify(this);
            },
            concat: function(wordArray) {
                var thisWords = this.words;
                var thatWords = wordArray.words;
                var thisSigBytes = this.sigBytes;
                var thatSigBytes = wordArray.sigBytes;
                this.clamp();
                if (thisSigBytes % 4) for (var i = 0; thatSigBytes > i; i++) {
                    var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                } else for (var i = 0; thatSigBytes > i; i += 4) thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2];
                this.sigBytes += thatSigBytes;
                return this;
            },
            clamp: function() {
                var words = this.words;
                var sigBytes = this.sigBytes;
                words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
                words.length = Math.ceil(sigBytes / 4);
            },
            clone: function() {
                var clone = Base.clone.call(this);
                clone.words = this.words.slice(0);
                return clone;
            },
            random: function(nBytes) {
                var words = [];
                var r = function(m_w) {
                    var m_w = m_w;
                    var m_z = 987654321;
                    var mask = 4294967295;
                    return function() {
                        m_z = 36969 * (65535 & m_z) + (m_z >> 16) & mask;
                        m_w = 18e3 * (65535 & m_w) + (m_w >> 16) & mask;
                        var result = (m_z << 16) + m_w & mask;
                        result /= 4294967296;
                        result += .5;
                        return result * (Math.random() > .5 ? 1 : -1);
                    };
                };
                for (var rcache, i = 0; nBytes > i; i += 4) {
                    var _r = r(4294967296 * (rcache || Math.random()));
                    rcache = 987654071 * _r();
                    words.push(4294967296 * _r() | 0);
                }
                return new WordArray.init(words, nBytes);
            }
        });
        var C_enc = C.enc = {};
        var Hex = C_enc.Hex = {
            stringify: function(wordArray) {
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var hexChars = [];
                for (var i = 0; sigBytes > i; i++) {
                    var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    hexChars.push((bite >>> 4).toString(16));
                    hexChars.push((15 & bite).toString(16));
                }
                return hexChars.join("");
            },
            parse: function(hexStr) {
                var hexStrLength = hexStr.length;
                var words = [];
                for (var i = 0; hexStrLength > i; i += 2) words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
                return new WordArray.init(words, hexStrLength / 2);
            }
        };
        var Latin1 = C_enc.Latin1 = {
            stringify: function(wordArray) {
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var latin1Chars = [];
                for (var i = 0; sigBytes > i; i++) {
                    var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    latin1Chars.push(String.fromCharCode(bite));
                }
                return latin1Chars.join("");
            },
            parse: function(latin1Str) {
                var latin1StrLength = latin1Str.length;
                var words = [];
                for (var i = 0; latin1StrLength > i; i++) words[i >>> 2] |= (255 & latin1Str.charCodeAt(i)) << 24 - i % 4 * 8;
                return new WordArray.init(words, latin1StrLength);
            }
        };
        var Utf8 = C_enc.Utf8 = {
            stringify: function(wordArray) {
                try {
                    return decodeURIComponent(escape(Latin1.stringify(wordArray)));
                } catch (e) {
                    throw new Error("Malformed UTF-8 data");
                }
            },
            parse: function(utf8Str) {
                return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
        };
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            reset: function() {
                this._data = new WordArray.init();
                this._nDataBytes = 0;
            },
            _append: function(data) {
                "string" == typeof data && (data = Utf8.parse(data));
                this._data.concat(data);
                this._nDataBytes += data.sigBytes;
            },
            _process: function(doFlush) {
                var data = this._data;
                var dataWords = data.words;
                var dataSigBytes = data.sigBytes;
                var blockSize = this.blockSize;
                var blockSizeBytes = 4 * blockSize;
                var nBlocksReady = dataSigBytes / blockSizeBytes;
                nBlocksReady = doFlush ? Math.ceil(nBlocksReady) : Math.max((0 | nBlocksReady) - this._minBufferSize, 0);
                var nWordsReady = nBlocksReady * blockSize;
                var nBytesReady = Math.min(4 * nWordsReady, dataSigBytes);
                if (nWordsReady) {
                    for (var offset = 0; nWordsReady > offset; offset += blockSize) this._doProcessBlock(dataWords, offset);
                    var processedWords = dataWords.splice(0, nWordsReady);
                    data.sigBytes -= nBytesReady;
                }
                return new WordArray.init(processedWords, nBytesReady);
            },
            clone: function() {
                var clone = Base.clone.call(this);
                clone._data = this._data.clone();
                return clone;
            },
            _minBufferSize: 0
        });
        C_lib.Hasher = BufferedBlockAlgorithm.extend({
            cfg: Base.extend(),
            init: function(cfg) {
                this.cfg = this.cfg.extend(cfg);
                this.reset();
            },
            reset: function() {
                BufferedBlockAlgorithm.reset.call(this);
                this._doReset();
            },
            update: function(messageUpdate) {
                this._append(messageUpdate);
                this._process();
                return this;
            },
            finalize: function(messageUpdate) {
                messageUpdate && this._append(messageUpdate);
                var hash = this._doFinalize();
                return hash;
            },
            blockSize: 16,
            _createHelper: function(hasher) {
                return function(message, cfg) {
                    return new hasher.init(cfg).finalize(message);
                };
            },
            _createHmacHelper: function(hasher) {
                return function(message, key) {
                    return new C_algo.HMAC.init(hasher, key).finalize(message);
                };
            }
        });
        var C_algo = C.algo = {};
        return C;
    }(Math);
    return CryptoJS;
});