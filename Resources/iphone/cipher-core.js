!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    CryptoJS.lib.Cipher || function(undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
        var C_enc = C.enc;
        C_enc.Utf8;
        var Base64 = C_enc.Base64;
        var C_algo = C.algo;
        var EvpKDF = C_algo.EvpKDF;
        var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
            cfg: Base.extend(),
            createEncryptor: function(key, cfg) {
                return this.create(this._ENC_XFORM_MODE, key, cfg);
            },
            createDecryptor: function(key, cfg) {
                return this.create(this._DEC_XFORM_MODE, key, cfg);
            },
            init: function(xformMode, key, cfg) {
                this.cfg = this.cfg.extend(cfg);
                this._xformMode = xformMode;
                this._key = key;
                this.reset();
            },
            reset: function() {
                BufferedBlockAlgorithm.reset.call(this);
                this._doReset();
            },
            process: function(dataUpdate) {
                this._append(dataUpdate);
                return this._process();
            },
            finalize: function(dataUpdate) {
                dataUpdate && this._append(dataUpdate);
                var finalProcessedData = this._doFinalize();
                return finalProcessedData;
            },
            keySize: 4,
            ivSize: 4,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: function() {
                function selectCipherStrategy(key) {
                    return "string" == typeof key ? PasswordBasedCipher : SerializableCipher;
                }
                return function(cipher) {
                    return {
                        encrypt: function(message, key, cfg) {
                            return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                        },
                        decrypt: function(ciphertext, key, cfg) {
                            return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                        }
                    };
                };
            }()
        });
        C_lib.StreamCipher = Cipher.extend({
            _doFinalize: function() {
                var finalProcessedBlocks = this._process(true);
                return finalProcessedBlocks;
            },
            blockSize: 1
        });
        var C_mode = C.mode = {};
        var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
            createEncryptor: function(cipher, iv) {
                return this.Encryptor.create(cipher, iv);
            },
            createDecryptor: function(cipher, iv) {
                return this.Decryptor.create(cipher, iv);
            },
            init: function(cipher, iv) {
                this._cipher = cipher;
                this._iv = iv;
            }
        });
        var CBC = C_mode.CBC = function() {
            function xorBlock(words, offset, blockSize) {
                var iv = this._iv;
                if (iv) {
                    var block = iv;
                    this._iv = undefined;
                } else var block = this._prevBlock;
                for (var i = 0; blockSize > i; i++) words[offset + i] ^= block[i];
            }
            var CBC = BlockCipherMode.extend();
            CBC.Encryptor = CBC.extend({
                processBlock: function(words, offset) {
                    var cipher = this._cipher;
                    var blockSize = cipher.blockSize;
                    xorBlock.call(this, words, offset, blockSize);
                    cipher.encryptBlock(words, offset);
                    this._prevBlock = words.slice(offset, offset + blockSize);
                }
            });
            CBC.Decryptor = CBC.extend({
                processBlock: function(words, offset) {
                    var cipher = this._cipher;
                    var blockSize = cipher.blockSize;
                    var thisBlock = words.slice(offset, offset + blockSize);
                    cipher.decryptBlock(words, offset);
                    xorBlock.call(this, words, offset, blockSize);
                    this._prevBlock = thisBlock;
                }
            });
            return CBC;
        }();
        var C_pad = C.pad = {};
        var Pkcs7 = C_pad.Pkcs7 = {
            pad: function(data, blockSize) {
                var blockSizeBytes = 4 * blockSize;
                var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
                var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
                var paddingWords = [];
                for (var i = 0; nPaddingBytes > i; i += 4) paddingWords.push(paddingWord);
                var padding = WordArray.create(paddingWords, nPaddingBytes);
                data.concat(padding);
            },
            unpad: function(data) {
                var nPaddingBytes = 255 & data.words[data.sigBytes - 1 >>> 2];
                data.sigBytes -= nPaddingBytes;
            }
        };
        C_lib.BlockCipher = Cipher.extend({
            cfg: Cipher.cfg.extend({
                mode: CBC,
                padding: Pkcs7
            }),
            reset: function() {
                Cipher.reset.call(this);
                var cfg = this.cfg;
                var iv = cfg.iv;
                var mode = cfg.mode;
                if (this._xformMode == this._ENC_XFORM_MODE) var modeCreator = mode.createEncryptor; else {
                    var modeCreator = mode.createDecryptor;
                    this._minBufferSize = 1;
                }
                this._mode = modeCreator.call(mode, this, iv && iv.words);
            },
            _doProcessBlock: function(words, offset) {
                this._mode.processBlock(words, offset);
            },
            _doFinalize: function() {
                var padding = this.cfg.padding;
                if (this._xformMode == this._ENC_XFORM_MODE) {
                    padding.pad(this._data, this.blockSize);
                    var finalProcessedBlocks = this._process(true);
                } else {
                    var finalProcessedBlocks = this._process(true);
                    padding.unpad(finalProcessedBlocks);
                }
                return finalProcessedBlocks;
            },
            blockSize: 4
        });
        var CipherParams = C_lib.CipherParams = Base.extend({
            init: function(cipherParams) {
                this.mixIn(cipherParams);
            },
            toString: function(formatter) {
                return (formatter || this.formatter).stringify(this);
            }
        });
        var C_format = C.format = {};
        var OpenSSLFormatter = C_format.OpenSSL = {
            stringify: function(cipherParams) {
                var ciphertext = cipherParams.ciphertext;
                var salt = cipherParams.salt;
                if (salt) var wordArray = WordArray.create([ 1398893684, 1701076831 ]).concat(salt).concat(ciphertext); else var wordArray = ciphertext;
                return wordArray.toString(Base64);
            },
            parse: function(openSSLStr) {
                var ciphertext = Base64.parse(openSSLStr);
                var ciphertextWords = ciphertext.words;
                if (1398893684 == ciphertextWords[0] && 1701076831 == ciphertextWords[1]) {
                    var salt = WordArray.create(ciphertextWords.slice(2, 4));
                    ciphertextWords.splice(0, 4);
                    ciphertext.sigBytes -= 16;
                }
                return CipherParams.create({
                    ciphertext: ciphertext,
                    salt: salt
                });
            }
        };
        var SerializableCipher = C_lib.SerializableCipher = Base.extend({
            cfg: Base.extend({
                format: OpenSSLFormatter
            }),
            encrypt: function(cipher, message, key, cfg) {
                cfg = this.cfg.extend(cfg);
                var encryptor = cipher.createEncryptor(key, cfg);
                var ciphertext = encryptor.finalize(message);
                var cipherCfg = encryptor.cfg;
                return CipherParams.create({
                    ciphertext: ciphertext,
                    key: key,
                    iv: cipherCfg.iv,
                    algorithm: cipher,
                    mode: cipherCfg.mode,
                    padding: cipherCfg.padding,
                    blockSize: cipher.blockSize,
                    formatter: cfg.format
                });
            },
            decrypt: function(cipher, ciphertext, key, cfg) {
                cfg = this.cfg.extend(cfg);
                ciphertext = this._parse(ciphertext, cfg.format);
                var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
                return plaintext;
            },
            _parse: function(ciphertext, format) {
                return "string" == typeof ciphertext ? format.parse(ciphertext, this) : ciphertext;
            }
        });
        var C_kdf = C.kdf = {};
        var OpenSSLKdf = C_kdf.OpenSSL = {
            execute: function(password, keySize, ivSize, salt) {
                salt || (salt = WordArray.random(8));
                var key = EvpKDF.create({
                    keySize: keySize + ivSize
                }).compute(password, salt);
                var iv = WordArray.create(key.words.slice(keySize), 4 * ivSize);
                key.sigBytes = 4 * keySize;
                return CipherParams.create({
                    key: key,
                    iv: iv,
                    salt: salt
                });
            }
        };
        var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
            cfg: SerializableCipher.cfg.extend({
                kdf: OpenSSLKdf
            }),
            encrypt: function(cipher, message, password, cfg) {
                cfg = this.cfg.extend(cfg);
                var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
                cfg.iv = derivedParams.iv;
                var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
                ciphertext.mixIn(derivedParams);
                return ciphertext;
            },
            decrypt: function(cipher, ciphertext, password, cfg) {
                cfg = this.cfg.extend(cfg);
                ciphertext = this._parse(ciphertext, cfg.format);
                var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
                cfg.iv = derivedParams.iv;
                var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
                return plaintext;
            }
        });
    }();
});