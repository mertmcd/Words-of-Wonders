(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd)
    define([], factory);
  else if (typeof exports === 'object')
    exports["Main"] = factory();
  else
    root["Main"] = factory();
})(window, function () {
  return /******/ (function (modules) { // webpackBootstrap
    /******/ // The module cache
    /******/
    var installedModules = {};
    /******/
    /******/ // The require function
    /******/
    function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/
      if (installedModules[moduleId]) {
        /******/
        return installedModules[moduleId].exports;
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/
      var module = installedModules[moduleId] = {
        /******/
        i: moduleId,
        /******/
        l: false,
        /******/
        exports: {}
        /******/
      };
      /******/
      /******/ // Execute the module function
      /******/
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/
      /******/ // Flag the module as loaded
      /******/
      module.l = true;
      /******/
      /******/ // Return the exports of the module
      /******/
      return module.exports;
      /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/
    __webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/
    __webpack_require__.d = function (exports, name, getter) {
      /******/
      if (!__webpack_require__.o(exports, name)) {
        /******/
        Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter
        });
        /******/
      }
      /******/
    };
    /******/
    /******/ // define __esModule on exports
    /******/
    __webpack_require__.r = function (exports) {
      /******/
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/
      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/
    /******/ // create a fake namespace object
    /******/ // mode & 1: value is a module id, require it
    /******/ // mode & 2: merge all properties of value into the ns
    /******/ // mode & 4: return value when already ns object
    /******/ // mode & 8|1: behave like require
    /******/
    __webpack_require__.t = function (value, mode) {
      /******/
      if (mode & 1) value = __webpack_require__(value);
      /******/
      if (mode & 8) return value;
      /******/
      if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
      /******/
      var ns = Object.create(null);
      /******/
      __webpack_require__.r(ns);
      /******/
      Object.defineProperty(ns, 'default', {
        enumerable: true,
        value: value
      });
      /******/
      if (mode & 2 && typeof value != 'string')
        for (var key in value) __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));
      /******/
      return ns;
      /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/
    __webpack_require__.n = function (module) {
      /******/
      var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
      /******/
      __webpack_require__.d(getter, 'a', getter);
      /******/
      return getter;
      /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/
    __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ // __webpack_public_path__
    /******/
    __webpack_require__.p = "/build/";
    /******/
    /******/
    /******/ // Load entry module and return exports
    /******/
    return __webpack_require__(__webpack_require__.s = 4);
    /******/
  })
  /************************************************************************/
  /******/
  ([
    /* 0 */
    /***/
    (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);

      function PhaserMain(main, data) {
        this.init = function () {
          var configWidth = data.width,
            configHeight = data.height;
          /*
          var config = {
              type: Phaser.AUTO,
              parent: 'game',
              width: configWidth,
              height: configHeight,
              transparent:data.transparent,
              scene: data.scenes,
              physics:data.physics,
          };
          */

          data.scene = data.scene || data.scenes;
          var config = Object.assign({}, data);

          if (data.render) {
            config.render = data.render;
          }

          if (data.bgColor) {
            config.backgroundColor = data.bgColor;
          }

          var game = new Phaser.Game(config);
          main.game = game;
          main.hasWebGL = game.device.features.webGL;

          if (game.canvas) {
            game.canvas.style.visibility = "hidden";
          }

          return game;
        };
      }

      /* harmony default export */
      __webpack_exports__["default"] = (PhaserMain);

      /***/
    }),
    /* 1 */
    /***/
    (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);

      function _createForOfIteratorHelper(o) {
        if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
          if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
            var i = 0;
            var F = function F() {};
            return {
              s: F,
              n: function n() {
                if (i >= o.length) return {
                  done: true
                };
                return {
                  done: false,
                  value: o[i++]
                };
              },
              e: function e(_e) {
                throw _e;
              },
              f: F
            };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var it, normalCompletion = true,
          didErr = false,
          err;
        return {
          s: function s() {
            it = o[Symbol.iterator]();
          },
          n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
          },
          e: function e(_e2) {
            didErr = true;
            err = _e2;
          },
          f: function f() {
            try {
              if (!normalCompletion && it["return"] != null) it["return"]();
            } finally {
              if (didErr) throw err;
            }
          }
        };
      }

      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(n);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }

      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }

      function Responsive(game, resizeCallback, postResizeCallback) {
        var gameWidth = game.config.width;
        var gameHeight = game.config.height;
        var resizeFunction;
        var lastWidth, lastHeight;

        this.resizeNow = function () {
          if (resizeFunction) {
            resizeFunction();
          }
        }; //var type = window.app && window.app.type && null;


        var type = null;

        if (window.app) {
          type = window.app.type;
        }

        this.startResponsive = function () {
          if (type == "dapi_iron") {
            if (window.NUC) {
              NUC.callback.onResize(function (width, height) {
                // Recalculate positions of in-game elements for specific orientation
                resizeCanvas({
                  width: width,
                  height: height
                });
              });
            } else {
              dapi.addEventListener("adResized", resizeCanvas);
            }
          } else if (type == "nucleo") {
            if (window.NUC) {
              NUC.callback.onResize(function (width, height) {
                // Recalculate positions of in-game elements for specific orientation
                resizeCanvas({
                  width: width,
                  height: height
                });
              });
            }
          } else {
            window.addEventListener('resize', resizeCanvas);
          }

          resizeCanvas();

          function resizeCanvas(event, force) {
            var iw = window.innerWidth,
              ih = window.innerHeight;
            /*
            if(type == "dapi_iron"){
                if(!event || !event.width){
                    var dimensions = dapi.getScreenSize();
                    if(dimensions){
                        iw = dimensions.width;
                        ih = dimensions.height;
                    }
                }
                else{
                    iw = event.width;
                    ih = event.height;
                }
            }
            */

            if (type == "dapi_iron" || type == "nucleo") {
              if (!event || !event.width) {
                var dimensions = dapi.getScreenSize();

                if (dimensions) {
                  iw = dimensions.width;
                  ih = dimensions.height;
                }
              } else {
                iw = event.width;
                ih = event.height;
              }
            } else if (type == "iron_pixel") {
              var _dimensions = window.mraid && window.mraid.getMaxSize();

              if (_dimensions) {
                iw = _dimensions.width;
                ih = _dimensions.height;
              }
            }

            var scale = Math.min(iw / gameWidth, ih / gameHeight);
            var width = iw / scale;
            var height = ih / scale; ///dont resize if we have the same size

            if (width == lastWidth && height == lastHeight && !force) { //return;
            }

            if (isNaN(width) || isNaN(height)) {
              setTimeout(resizeCanvas, 500);
              return;
            }

            game.canvas.setAttribute('style', ' -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1);' + ' -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');' + ' transform-origin: top left;');
            game.scale.resize(width, height);
            game.scene.scenes.forEach(function (scene) {
              scene.cameras.resize(width, height);
            });
            game.canvas.style.maxWidth = width;
            game.canvas.style.maxHeight = height;
            /*let canvas = game.canvas;
            let styleWidth = width+"px";
            let styleHeight = height+"px";
              canvas.style.maxWidth = styleWidth;
            canvas.style.maxHeight = styleHeight;
            canvas.style.width = styleWidth;
            canvas.style.height = styleHeight;*/

            resizeCallback(width, height);
            resizeObjects(width, height, scale);
            lastWidth = width;
            lastHeight = height;
            if (postResizeCallback) postResizeCallback();
          }

          resizeFunction = resizeCanvas;
        };

        function resizeObjects(w, h, scale) {
          var sceneList = game.scene.scenes;

          var _iterator = _createForOfIteratorHelper(sceneList),
            _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var scene = _step.value;

              var _iterator2 = _createForOfIteratorHelper(scene.children.list),
                _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var child = _step2.value;

                  if (child.onResizeCallback) {
                    child.onResizeCallback(w, h);
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }

      /* harmony default export */
      __webpack_exports__["default"] = (Responsive);

      /***/
    }),
    /* 2 */
    /***/
    (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);

      function _createForOfIteratorHelper(o) {
        if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
          if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
            var i = 0;
            var F = function F() {};
            return {
              s: F,
              n: function n() {
                if (i >= o.length) return {
                  done: true
                };
                return {
                  done: false,
                  value: o[i++]
                };
              },
              e: function e(_e) {
                throw _e;
              },
              f: F
            };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var it, normalCompletion = true,
          didErr = false,
          err;
        return {
          s: function s() {
            it = o[Symbol.iterator]();
          },
          n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
          },
          e: function e(_e2) {
            didErr = true;
            err = _e2;
          },
          f: function f() {
            try {
              if (!normalCompletion && it["return"] != null) it["return"]();
            } finally {
              if (didErr) throw err;
            }
          }
        };
      }

      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(n);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }

      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }

      function Loader() {
        this.loadBulk = function (scene, assetList, callback) {
          this.scene = scene;
          var numOfAssetLoaded = 0;
          var totalAssetToLoad = 0;

          var _iterator = _createForOfIteratorHelper(assetList),
            _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var asset = _step.value;
              totalAssetToLoad++;

              if (asset.type == "image") {
                this.loadImage(asset.key, asset.src);
                numOfAssetLoaded++;
              } else if (asset.type == "spritesheet") {
                this.loadSpriteSheet(asset.key, asset.src, asset.frameWidth, asset.frameHeight, assetLoaded);
              } else if (asset.type == "atlas") {
                this.loadAtlas(asset.key, asset.src, asset.json, assetLoaded);
              } else if (asset.type == "video") {
                this.loadVideo(asset.key, asset.src, assetLoaded);
              }
              /*else if(asset.type=="spine"){
                  this.loadSpine(asset.key,asset.src, asset.json,assetLoaded);
              }*/

            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          function assetLoaded() {
            numOfAssetLoaded++;

            if (numOfAssetLoaded >= totalAssetToLoad) {
              callback();
            }
          }
        };

        this.loadSpine = function (key, imageFile, atlasData, callback) {
          var atlasImg = new Image();

          atlasImg.onload = function () {
            //scene.textures.addAtlasJSONArray(key, atlasImg, atlasData);
            scene.textures.addAtlasJSONArray(key, atlasImg, atlasData);
            callback();
          };

          atlasImg.src = imageFile;
          /*
          let texture = new Spine.webgl.GLTexture( this.game.context as any, image )
          this.cache.custom.spineTextures.add( data.name, texture );
            let splitAtlasBase64 = data.atlas.split( ',' );
          let atlasBase64 = splitAtlasBase64[ splitAtlasBase64.length - 1 ];
            this.cache.custom.spine.add( data.name, { data: atob( atlasBase64 ) } );
          this.cache.json.add( data.name, data.src );
            ( this.load as any ).spine( data.name, undefined, undefined );
          this.filesLoaded++;
            if ( this.filesLoaded >= this.filesToLoad ) {
              onLoadingComplete();
          }
          */
        };

        this.setScene = function (scene) {
          this.scene = scene;
        };

        this.loadImage = function (key, imageFile) {
          this.scene.textures.addBase64(key, imageFile);
        };

        this.loadVideo = function (key, videoFile, callback) {
          var scene = this.scene;

          scene.load.video(key, videoFile);
          scene.load.once('complete', function () {
            callback && callback();
          });
          scene.load.start();
        };

        this.loadSpriteSheet = function (key, imageFile, width, height, callback) {
          var scene = this.scene;
          var img = new Image();

          img.onload = function () {
            scene.textures.addSpriteSheet(key, img, {
              frameWidth: width,
              frameHeight: height
            });
            callback();
          };

          img.src = imageFile;
          return img;
        };

        this.loadAtlas = function (key, imageFile, atlasData, callback) {
          var scene = this.scene;
          var atlasImg = new Image();

          atlasImg.onload = function () {
            scene.textures.addAtlasJSONArray(key, atlasImg, atlasData);
            callback();
          };

          atlasImg.src = imageFile;
          return atlasImg;
        };

        this.loadAudio = function (key, audioFile, callback) {
          var _this = this;

          var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
          audioCtx.decodeAudioData(toArrayBuffer(audioFile), function (buffer) {
            _this.cache.audio.add('loop', buffer);

            callback();
          }, function (e) {
            console.log("Error with decoding audio data" + e.err);
            callback();
          });
        };
      }

      /* harmony default export */
      __webpack_exports__["default"] = (Loader);

      /***/
    }),
    /* 3 */
    /***/
    (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);

      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof(obj) {
            return typeof obj;
          };
        } else {
          _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          };
        }
        return _typeof(obj);
      }

      function _createForOfIteratorHelper(o) {
        if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
          if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
            var i = 0;
            var F = function F() {};
            return {
              s: F,
              n: function n() {
                if (i >= o.length) return {
                  done: true
                };
                return {
                  done: false,
                  value: o[i++]
                };
              },
              e: function e(_e) {
                throw _e;
              },
              f: F
            };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var it, normalCompletion = true,
          didErr = false,
          err;
        return {
          s: function s() {
            it = o[Symbol.iterator]();
          },
          n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
          },
          e: function e(_e2) {
            didErr = true;
            err = _e2;
          },
          f: function f() {
            try {
              if (!normalCompletion && it["return"] != null) it["return"]();
            } finally {
              if (didErr) throw err;
            }
          }
        };
      }

      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(n);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }

      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }

      ///some utility functions
      function Utility() {
        ////RESPONSIVE BOX/////
        ///fills a defined rectangle with the given object from top to down (default)
        this.makeResponsiveBox = function (topLeft, objects, width, height, globalValues) {
          var defaults = {
            yratio: 1,
            xratio: 1,
            ///after every step main y value increases and x stay same as default
            increaseX: false,
            increaseY: true,
            ////x,y origin of the object in the target rectangle
            originX: 0.5,
            originY: 0.5,
            ///currently we only have fit and none here
            scaleType: "fit",
            ///fill ratio for the scale calculation
            fillRatioX: 1,
            fillRatioY: 0.8
          }; ////add global values to the defaults

          if (globalValues == undefined) {
            globalValues = {};
          }

          for (var def in globalValues) {
            if (globalValues.hasOwnProperty(def)) {
              defaults[def] = globalValues[def];
            }
          }

          var curPos = {
            x: topLeft.x,
            y: topLeft.y
          };

          var _iterator = _createForOfIteratorHelper(objects),
            _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var obj = _step.value;

              /*if(!obj.target){
                  continue;
              }*/
              ////fill with default values first
              for (var def in defaults) {
                if (defaults.hasOwnProperty(def)) {
                  if (obj[def] === undefined) {
                    obj[def] = defaults[def];
                  }
                }
              } ////find the new position and place the object


              var w = width * obj.xratio;
              var h = height * obj.yratio; ///the point we are going to place te object

              var placeX = curPos.x + w * obj.originX;
              var placeY = curPos.y + h * obj.originY;

              if (obj.increaseX) {
                curPos.x += w;
              }

              if (obj.increaseY) {
                curPos.y += h;
              } ///if it is a gap we are done here..


              if (obj.type == "gap") {
                continue;
              } ///if not it is an object so lets find its place and scale...


              var target = obj.target;
              target.x = placeX;
              target.y = placeY;
              var targetWidth = target.width || obj.width;
              var targetHeight = target.height || obj.height;
              w *= obj.fillRatioX;
              h *= obj.fillRatioY;
              var scale = 1;

              if (obj.scaleType == "fit") {
                scale = Math.min(w / targetWidth, h / targetHeight);
              }

              target.setScale(scale);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }; /////Parse bitmap with json objects (actually it supposed to be xml, we are tricking phaser)


        this.fixJsonForTextParsing = function (scene, name, fontJson) {
          fontJson.getElementsByTagName = function (id) {
            var elements = [];

            for (var prop in fontJson) {
              var val = fontJson[prop];

              if (id == prop) {
                val.getAttribute = getAttribute.bind(val);
                elements.push(val);
              }

              if (_typeof(val) == "object") {
                for (var prop2 in val) {
                  var val2 = val[prop2];

                  if (prop2 == id) {
                    val2.getAttribute = getAttribute.bind(val2);
                    elements.push(val2);

                    if (id == 'char') {
                      var _iterator2 = _createForOfIteratorHelper(val2),
                        _step2;

                      try {
                        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                          var v = _step2.value;
                          v.getAttribute = getAttribute.bind(v);
                        }
                      } catch (err) {
                        _iterator2.e(err);
                      } finally {
                        _iterator2.f();
                      }

                      return val2;
                    }
                  }
                }
              }
            }

            return elements;
          };

          function getAttribute(id) {
            for (var prop in this) {
              if (id == prop) {
                return this[prop];
              }
            }
          }

          if (name) {
            scene.cache.xml.add(name, fontJson);
          }
        };

        this.addBanner = function (data) {
          var scene = data.scene,
            str = data.str,
            fontName = data.fontName,
            backImage = data.backImage,
            backColor = data.backColor || "0x000000",
            fontColor = data.fontColor || "0xffffff";
          var bannerWidth = 540;
          var bannerHeight = 60;
          var banner = {};
          banner.height = bannerHeight; ///has back image or use graphics

          if (backImage) {
            banner.bg = scene.add.image(0, 0, backImage.texture, backImage.frame).setOrigin(0.5, 0);
          } else {
            banner.bg = scene.add.graphics();
          }

          var text = scene.add.bitmapText(0, 0, fontName, str);
          banner.text = text;
          text.baseWidth = text.width;
          text.baseHeight = text.height;

          banner.bg.onResizeCallback = function (w, h) {
            var bg = banner.bg;
            var text = banner.text;
            bannerHeight = h * 0.1;

            if (h > w) {
              bannerHeight = h * 0.06;
            }

            var scale = w / bannerWidth;

            if (scale > 1) {
              scale = 1;
            }

            if (w > h) { //scale*=0.7;
            }

            var scaledWidth = bannerWidth * scale;
            var scaledHeight = bannerHeight * scale;

            if (backImage) {
              bg.setScale((w + 100) / bg.width, scaledHeight / bg.height);
              bg.x = w / 2;
              bg.y = 0;
            } else {
              bg.clear();
              bg.x = 0;
              bg.y = 0;
              bg.fillStyle(backColor);
              bg.fillRect(0, 0, w, scaledHeight);
            }

            var textScale = Math.min(w * 0.9 / text.baseWidth, scaledHeight * 0.9 / text.baseHeight);
            text.setScale(textScale);
            text.x = w * 0.5 - text.width * 0.5;
            text.y = scaledHeight * 0.5 - text.height * 0.5;
            banner.height = scaledHeight;
          };

          if (data.backColor && backImage) {
            banner.bg.setTintFill(backColor);
          }

          if (data.fontColor) {
            text.setTint(fontColor);
          }

          return banner;
        };

        this.addBannerNormalText = function (data) {
          var scene = data.scene,
            str = data.str,
            fontName = data.fontName,
            backImage = data.backImage,
            backColor = data.backColor || "0x000000",
            fontColor = data.fontColor || "0xffffff";
          var bannerWidth = 540;
          var bannerHeight = 60;
          var banner = {};
          banner.height = bannerHeight; ///has back image or use graphics

          if (backImage) {
            banner.bg = scene.add.image(0, 0, backImage.texture, backImage.frame).setOrigin(0.5, 0);
          } else {
            banner.bg = scene.add.graphics();
          }

          var textData = {
            color: fontColor.replace("0x", "#"),
            align: 'center',
            fontSize: 40,
            fontFamily: fontName
          }; //var text=scene.add.bitmapText(0,0,fontName,str);

          var text = scene.add.text(0, 0, str, textData).setOrigin(0.5);
          banner.text = text;
          text.baseWidth = text.width;
          text.baseHeight = text.height;

          banner.bg.onResizeCallback = function (w, h) {
            var bg = banner.bg;
            var text = banner.text;
            bannerHeight = h * 0.1;

            if (h > w) {
              bannerHeight = h * 0.06;
            }

            var scale = w / bannerWidth;

            if (scale > 1) {
              scale = 1;
            }

            if (w > h) { //scale*=0.7;
            }

            var scaledWidth = bannerWidth * scale;
            var scaledHeight = bannerHeight * scale;

            if (backImage) {
              bg.setScale((w + 100) / bg.width, scaledHeight / bg.height);
              bg.x = w / 2;
              bg.y = 0;
            } else {
              bg.clear();
              bg.x = 0;
              bg.y = 0;
              bg.fillStyle(backColor);
              bg.fillRect(0, 0, w, scaledHeight);
            }

            var textScale = Math.min(w * 0.9 / text.baseWidth, scaledHeight * 0.9 / text.baseHeight);
            text.setScale(textScale);
            text.x = w * 0.5; //-text.width*0.5;

            text.y = scaledHeight * 0.5; //-text.height*0.5;

            banner.height = scaledHeight;
          };

          if (data.backColor && backImage) {
            banner.bg.setTintFill(backColor);
          }

          if (data.fontColor) {
            text.setTint(fontColor);
          }

          return banner;
        };

        this.addInstallButton = function (scene, atlas, frame, defScale) {
          if (!scene) {
            console.warn("scene couldn't found");
            return;
          }

          if (frame === undefined) {
            frame = "install";
          }

          if (!atlas) {
            atlas = frame;
            frame = null;
          }

          var btn = scene.add.sprite(0, 0, atlas, frame).setOrigin(0.5, 1).setInteractive();
          btn.on("pointerdown", this.gotoLink);
          btn.calcOnScale = true;

          btn.onResizeCallback = function (w, h) {
            var scale = w / 2 / btn.width;
            if (defScale) scale = defScale;
            this.setScale(scale);
            this.x = w / 2;
            this.y = h - 5;
            this.scene.tweens.killTweensOf(this);
            this.scene.tweens.add({
              targets: this,
              scaleX: scale * 0.95,
              scaleY: scale * 0.95,
              duration: 500,
              yoyo: true,
              repeat: -1
            });
          };

          btn.onResizeCallback(this.lastWidth, this.lastHeight);
          return btn;
        };
      }

      /* harmony default export */
      __webpack_exports__["default"] = (Utility);

      /***/
    }),
    /* 4 */
    /***/
    (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      // ESM COMPAT FLAG
      __webpack_require__.r(__webpack_exports__);

      // CONCATENATED MODULE: ./src/time.js
      function Time(totalGameTime) {
        var countTime,
          startTime,
          totalTimePassed = 0,
          totalTime = totalGameTime;
        this.isStarted = false;

        this.start = function () {
          //if(totalGameTime==0)return;
          this.isStarted = true;
          countTime = true;
          startTime = new Date().getTime();
        };

        this.stop = function () {
          if (!this.isStarted) {
            return;
          }

          totalTime = this.left();
          totalTimePassed = this.passed();
          countTime = false;
        };

        this.reset = function (newTime) {
          countTime = true;
          startTime = new Date().getTime();
          totalTime = newTime === undefined ? totalGameTime : newTime;
          totalGameTime = newTime;
        }; ///call when game is paused


        this.resume = function () {
          if (!countTime && startTime) {
            this.start();
          }
        }; ///get time left


        this.left = function () {
          if (!countTime) return totalTime - totalTimePassed;
          var elapsedTime = new Date().getTime() - startTime;
          elapsedTime /= 1000;
          return totalTime - elapsedTime;
        }; ///GET TIME Passed


        this.passed = function () {
          if (!countTime) return totalTimePassed;
          var elapsedTime = new Date().getTime() - startTime;
          elapsedTime /= 1000;
          return elapsedTime + totalTimePassed;
        };

        this.checkTimeUp = function () {
          if (!countTime || !totalGameTime) return;
          var elapsedTime = new Date().getTime() - startTime;
          elapsedTime /= 1000;

          if (elapsedTime >= totalTime) {
            return true;
          }
        };
      }

      /* harmony default export */
      var src_time = (Time);
      // CONCATENATED MODULE: ./src/index.js
      var library = "phaser";
      var physicsLibrary = "none";
      console.log('%c Playable Factory ', 'font-weight: bold; font-size: 25px; color: #ffffff; background: #162538; text-shadow: 1px 1px 0px #ffb600, -1px 1px 0px #ffb600, 1px -1px 0px #ffb600, -1px -1px 0px #ffb600'); //console.log(library, physicsLibrary);

      var LibraryMain = __webpack_require__(0)["default"];

      var Responsive = __webpack_require__(1)["default"];

      var Loader = __webpack_require__(2)["default"];

      var Utility = __webpack_require__(3)["default"];



      function Main(data) {
        var app = window.app || {};
        var that = this;
        var dapiGameStarted = false,
          mraidGameStarted = false,
          gameStartedCallback,
          gameInited = false,
          filesLoaded = false;
        this.gamePaused = false;
        var THREE = window.THREE || {};
        var phaserEvents;
        var responsivePlugin;
        var libraryMain = new LibraryMain(this, data, THREE);
        var loaderPlugin = new Loader(this, THREE);
        var time = new src_time(data.totalTime); ///public properties

        this.loader = loaderPlugin;
        this.time = time;
        this.lastWidth = data.width;
        this.lastHeight = data.height;
        this.soundEnabled = true;
        this.data = data;
        this.lastOrientation = null;
        this.curOrientation = data.width > data.height ? "landscape" : "portrait";
        this.utility = new Utility(this);
        /*
        0-boot
        1-preload
        2-assets loaded
        3-game state
        4-game ended
        */

        this.state = 0;

        window.forceGameStart = function () {
          if (gameInited) {
            return;
          }

          loaded = 100;
          initGame();
          var preloader = document.getElementById("preloader") || document.getElementById("preloader-gear");

          if (preloader) {
            //preloader.style.display="none";
            preloader.classList.add("hide");
          }
        }; ////type related stuffs


        var type = app.type || null;
        var checkMraidTypes = ["lifestreet", "applovin", "unity", "adcolony"];
        var isMraid = checkMraidTypes.indexOf(type) >= 0 ? true : false;

        if (type == "instant") {
          console.log("Waiting for instant");
          document.addEventListener("deviceready", function () {
            screen.orientation.lock('portrait');
            initGame();

            function hideSplashScreen() {
              if (navigator.splashscreen) {
                console.warn('Hiding splash screen'); // We're done initializing, remove the splash screen

                navigator.splashscreen.hide();
                return;
              }

              setTimeout(hideSplashScreen, 500);
            }

            setTimeout(hideSplashScreen, 1000);
            AndroidFullScreen.immersiveMode(successFunction, errorFunction);

            function successFunction() {
              console.log("success");
            }

            function errorFunction() {
              console.log("error");
            }
          }, false);
        }

        function callOnLoad() {
          if (type == "instant") {
            return;
          }

          if (app.onLoadCalled) return;
          app.onLoadCalled = true;

          if (type == "nucleo") {
            checkDapiNucleo();
          } else if (type == "dapi_iron") {
            checkDapi();
          } else if (isMraid) {
            checkMraid();
          } else if (type == "chartboost") {
            checkChartboost();
          } else {
            initGame();
          }

          if (data.nucleo && type == "nucleo") {
            var nuc = data.nucleo;
            NUC.init(nuc.mode || "pa", nuc.title, nuc.genre, nuc.version);
          }

          if (type == "crossinstall") {
            window.onerror = function (msg, url, line, col, error) {
              // '*' required
              window.parent.postMessage('IFRAME ERROR -- ' + error, '*');
            };
          }
        } //window.onload = callOnLoad;


        window.addEventListener("load", callOnLoad);

        app.callOnLoad = function () {
          callOnLoad();
        };

        function initGame() {
          if (gameInited) return;
          gameInited = true;

          if (library == "phaser") {
            var game = libraryMain.init(that, data);
            responsivePlugin = new Responsive(game, onResize, postResize);
            that.game = game;
            phaserEvents = game.events;
          } else if (library == "three") {
            gameStartedCallback = data.gameStartCallback;
            libraryMain.init(that, data, window.THREE);
            responsivePlugin = new Responsive(that, onResize, postResize);
          }

          if (type == "vungle") {
            window.addEventListener('ad-event-pause', function () {
              // Pause audio/video/animations inside here
              pauseGame();
            });
            window.addEventListener('ad-event-resume', function () {
              // Resume audio/video/animations inside here
              resumeGame();
            });
          } else if (type == "dapi_iron") {} else {
            window.addEventListener("blur", pauseGame);
            window.addEventListener("focus", resumeGame);
          }
        } ////RESIZE RELATED


        function onResize(w, h) {
          that.lastWidth = w;
          that.lastHeight = h;

          if (w > h) {
            that.curOrientation = "landscape";
          } else {
            that.curOrientation = "portrait";
          }

          if (library == "phaser") {
            phaserEvents.emit("gameresized", w, h);
          } else if (data.gameResized) {
            data.gameResized(w, h);
          }
        }

        function postResize(w, h) {
          that.lastOrientation = that.curOrientation;

          if (library == "phaser") {
            phaserEvents.emit("postresized", w, h);
          } else if (data.postResized) {
            data.postResized(w, h);
          }
        }

        var startGameCalled = false;

        function startGame() {
          if (startGameCalled) return;
          startGameCalled = true;

          function checkLoaded() {
            if (loaded >= 100) {
              setTimeout(toTheGame, 250);
            } else {
              loadUpdate(1);
              setTimeout(checkLoaded, 25);
            }
          }

          setTimeout(checkLoaded, 50);

          function toTheGame() {
            ////assetsLoaded function usually
            responsivePlugin.startResponsive();
            gameStartedCallback();
            that.state = 3;
            var canvas = library == "phaser" ? that.game.canvas : that.renderer.domElement;

            if (canvas) {
              canvas.style.visibility = "visible";
            } //responsivePlugin.startResponsive();


            that.resizeNow(); //is there a load gif

            var loading = document.getElementById("loading");

            if (loading) {
              loading.style.display = "none";
              loading.parentNode.removeChild(loading);
            } //is there a load bg


            var loadingBg = document.getElementById("loading-bg");

            if (loadingBg) {
              loadingBg.style.display = "none";
              loadingBg.parentNode.removeChild(loadingBg);
            } ////remove preloader


            var preloader = document.getElementById("preloader") || document.getElementById("preloader-gear");

            if (preloader) {
              preloader.classList.add("hide");
              setTimeout(function () {
                preloader.style.display = "none";
                preloader.parentElement.removeChild(preloader);

                if (library == "phaser") {
                  that.game.input.enabled = true;
                }
              }, 500); //750
            } ////Some stuff realted to ad networks


            if (window.NUC) {
              NUC.trigger.ready();
            }

            if (type == "mobvista") {
              window.mobvistaGameReady && window.mobvistaGameReady();
            }
          }

          ;
        }

        function pauseGame() {
          time.stop();
          that.gamePaused = true;

          if (library == "phaser") {
            phaserEvents.emit("gamepaused");
          } else if (data.gamePaused) {
            data.gamePaused();
          }
        }

        function resumeGame() {
          time.resume();
          that.gamePaused = false;

          if (library == "phaser") {
            phaserEvents.emit("gamecontinue");
          } else if (data.gameContinue) {
            data.gameContinue();
          }
        } /////PUBLIC FUNCTIONS
        ///call this function to force resizing


        this.resizeNow = function () {
          responsivePlugin.resizeNow();
        };

        this.restartGame = function (newTime) {
          time.reset(newTime);
          this.state = 3;

          if (window.NUC) {
            NUC.trigger.tryAgain();
          }
        };

        this.interacted = function () {
          if (type == "vungle") {
            parent.postMessage('interacted', '*');
          }

          window.NUC && window.NUC.trigger.interaction(); ///is this the first time of interaction

          if (!this.firstInteracted) {
            this.firstInteracted = true;

            if (type == "chartboost") {
              window.playable && window.playable.startGame();
            }
          }
        };

        this.gameFinished = function (didWon, reason) {
          if (window.NUC) {
            if (didWon) {
              NUC.trigger.endGame('win');
            } else {
              if (reason == "timeup") {
                NUC.trigger.endGame('timer');
              } else {
                NUC.trigger.endGame('lose');
              }
            }
          }

          if (type == "mobvista") {
            window.mobvistaGameEnd && window.mobvistaGameEnd();
          } else if (type == "vungle") {
            parent.postMessage('complete', '*');
          } else if (type == "chartboost") {
            window.playable && window.playable.finishGame();
          } else if (type == "lifestreet") {
            window.lsm_goalAchieved && window.lsm_goalAchieved();
          }
        }; ///UPDATE


        this.update = function () {
          if (this.state == 3 && time.checkTimeUp()) {
            this.state = 4;

            if (library == "phaser") {
              phaserEvents.emit("timeup");
            } else if (data.timeUp) {
              data.timeUp();
            }
          }
        }; ///if the assets loaded from outside call this function


        this.assetsLoaded = function () {
          filesLoaded = true;
          that.state = 2;
          startGame();
        }; ///LOAD ASSETS


        this.loadAssets = function (scene, assetList, loadCallback) {
          gameStartedCallback = loadCallback;
          this.state = 1;

          function assetLoaded() {
            filesLoaded = true;
            that.state = 2; ///loading finished
            ///if type is dapi wait for dapi start

            if (type == "dapi_iron" && !dapiGameStarted) {
              return;
            }
            /*if(isMraid && !mraidGameStarted){
                return;
            }*/


            startGame();
          }

          if (assetList.length == 0) {
            assetLoaded();
            return;
          }

          loaderPlugin.loadBulk(scene, assetList, assetLoaded);
        };

        this.openMarket = function (events, localX, localY, func) {
          visitStore();

          if (events) {
            events.preventDefault && events.preventDefault();
            events.stopPropagation && events.stopPropagation();
          }

          if (func && func.stopPropagation) {
            func.stopPropagation();
          }
        };

        this.openMarketFinal = function (events, localX, localY, func) {
          visitStore();
          this.gameFinished(true);

          if (events) {
            events.preventDefault && events.preventDefault();
            events.stopPropagation && events.stopPropagation();
          }

          if (func && func.stopPropagation) {
            func.stopPropagation();
          }
        }; ////VISIT LINK


        this.gotoLink = function (pointer, localX, localY, func) {
          console.log("click" + type);
          visitStore();

          if (func && func.stopPropagation) {
            func.stopPropagation();
          }

          if (data.ctaClicked) {
            data.ctaClicked();
          }
        };

        function visitStore() {
          if (!window.type) {
            window.alert("CTA Clicked!");
          } else if (type == "instant") {
            window.plugins.instantHelper.download();
          } else if (type == "google") {
            if (window.ExitApi) {
              ExitApi.exit();
            } else {
              window.open(clickTag);
            }
          } else if (type == "fb") {
            FbPlayableAd.onCTAClick();
          } else if (type == "liftoff") {
            Liftoff.open();
          } else if (type == "mobvista") {
            window.install && window.install();
          } else if (type == "mraid_iron") {
            mraid.openStoreUrl();
          } else if (type == "dapi_iron") {
            if (!window.dapi) {
              console.warn("dapi not found");
            }

            dapi.openStoreUrl();
          } else if (type == "iron_pixel") {
            if (!window.mraid) {
              console.warn("mraid not found");
            }

            mraid.openStoreUrl();
          } else if (type == "nucleo") {
            if (window.NUC) {
              NUC.trigger.convert();
            }
          } else if (type == "adcolony") {
            if (!window.mraid) {
              console.warn("mraid not found");
            }

            mraid.openStore(lp_url);
          } else if (type == "lifestreet" || type == "unity" || type == "applovin") {
            if (!window.mraid) {
              console.warn("mraid not found");
            }

            mraid.open(lp_url);
          } else if (type == "vungle") {
            parent.postMessage('download', '*');
          } else if (type == "tapjoy") {
            window.TJ_API && window.TJ_API.objectiveComplete();
            window.TJ_API && window.TJ_API.gameplayFinished();
            window.TJ_API && window.TJ_API.click();
          } else if (type == "toutiao") {
            window.playableSDK.openAppStore();
          } else if (type == "crossinstall") {
            window.parent.postMessage('click_go', '*'); // '*' required
          } else if (type == "chartboost") {
            //window.playable && window.playable.clickInstall();
            mraid.open(lp_url);
          }
        }

        this.startTimer = function () {
          if (this.timeStarted) return;
          time.start();
          this.timeStarted = true;
        };

        function checkDapiNucleo() {
          function startGame(width, height) {
            if (dapiGameStarted) {
              resumeGame();
              return;
            }

            dapiGameStarted = true;
            initGame({
              width: width,
              height: height
            });
          }

          NUC.callback.onStart(function (width, height, isAudioEnabled) {
            // Start the gaming process here...
            startGame(width, height);
            that.soundEnabled = isAudioEnabled;
          });
          NUC.callback.onImpression(function (width, height) {
            // Start the gaming process here...
            startGame(width, height);
          });
          NUC.callback.onDeviceData(function (os, osVersion, deviceId, deviceLanguage, apiLevel) { //device data
          });
          NUC.callback.onPause(function () {
            // Pause tweens, timers, music and sound effects
            pauseGame();
          });
          NUC.callback.onResume(function () {
            // Resume tweens, timers, music and sound effects
            resumeGame();
          });
          NUC.callback.onMute(function () {
            // Disable all sound effects
            // ALL, seriously
            that.soundEnabled = false;

            if (phaserEvents) {
              phaserEvents.emit("soundchanged", that.soundEnabled);
            } else if (data.soundChanged) {
              data.soundChanged(that.soundEnabled);
            }
          });
          NUC.callback.onUnmute(function () {
            // Enable sound effects
            that.soundEnabled = true;

            if (phaserEvents) {
              phaserEvents.emit("soundchanged", that.soundEnabled);
            } else if (data.soundChanged) {
              data.soundChanged(that.soundEnabled);
            }
          }); ///SOME CALLBACKS
          //onTimeUpdate
        }

        function checkDapi() {
          dapi.isReady() ? onReadyCallback() : dapi.addEventListener("ready", onReadyCallback);

          function onReadyCallback() {
            //No need to listen to this event anymore
            dapi.removeEventListener("ready", onReadyCallback); //If the ad is visible start the game

            if (dapi.isViewable()) {
              startGame();
            }

            dapi.addEventListener("viewableChange", viewableChangeCallback);
            dapi.addEventListener("audioVolumeChange", audioVolumeChangeCallback);
            that.soundEnabled = !!dapi.getAudioVolume(); //dapi.addEventListener("adResized", orientationCallback);
          }

          function startGame() {
            if (dapiGameStarted) {
              resumeGame();
              return;
            }

            dapiGameStarted = true;
            initGame(dapi.getScreenSize());
          }

          function viewableChangeCallback(e) {
            e.isViewable ? startGame() : dapiPause(); //start the game or resume
          }

          function dapiPause() {
            pauseGame();
          }

          function audioVolumeChangeCallback(volume) {
            that.soundEnabled = !!volume;

            if (phaserEvents) {
              phaserEvents.emit("soundchanged", that.soundEnabled);
            } else if (data.soundChanged) {
              data.soundChanged(that.soundEnabled);
            }
          }
          /*
          dapi.addEventListener("adResized", function(event){
              let game = that.game;
              if(!game || !game.scale || !game.scale.resize){
                  return;
              }
              var iw = window.innerWidth, ih=window.innerHeight;
              if(!event || !event.width){
                  var dimensions=dapi.getScreenSize();
                  if(dimensions){
                      iw=dimensions.width;
                      ih=dimensions.height;
                  }
                }
              else{
                  iw=event.width;
                  ih=event.height;
              }
                game.scale.resize(iw,ih);
          });*/

        } ///MRAID RELATED


        function checkMraid() {
          if (!window.mraid) {
            mraidGameStarted = true;
            initGame();
            console.warn("mraid not found!");
            return;
          } // Wait for the SDK to become ready


          if (mraid.getState() === 'loading') {
            mraid.addEventListener('ready', onSdkReady);
          } else {
            onSdkReady();
          }

          function viewableChangeHandler(viewable) {
            // start/pause/resume gameplay, stop/play sounds
            if (viewable) {
              showMyAd();
            } else { // pause 
            }
          }

          function onSdkReady() {
            mraid.addEventListener('viewableChange', viewableChangeHandler); // Wait for the ad to become viewable for the first time

            if (mraid.isViewable()) {
              showMyAd();
            }
          }

          function showMyAd() {
            mraidGameStarted = true;

            if (!gameInited) {
              initGame();
              return;
            } ///l=!0,h.state>1||!c||y() and replace it with l=!0,h.state>2||!c||y()
            ////state 2 means assets loaded

            /*if(that.state>1 || !filesLoaded){
                return;
            }*/


            startGame();
          }
        } ////CHARTBOOST


        function checkChartboost() {
          if (!window.mraid) {
            mraidGameStarted = true;
            initGame();
            console.warn("mraid not found!");
            return;
          } // Wait for the SDK to become ready


          if (mraid.getState() === 'loading') {
            mraid.addEventListener('ready', onSdkReady);
          } else if (mraid.getState() === 'default') {
            showMyAd();
          } else {
            onSdkReady();
          }

          function viewableChangeHandler(viewable) {
            // start/pause/resume gameplay, stop/play sounds
            if (viewable) {
              showMyAd();
            } else { // pause 
            }
          }

          function onSdkReady() {
            mraid.addEventListener('viewableChange', viewableChangeHandler);

            if (mraid.isViewable()) {
              showMyAd();
            }
          }

          function showMyAd() {
            mraidGameStarted = true;

            if (!gameInited) {
              initGame();
              return;
            }

            startGame();
          }
        }

        function checkChartboostOld() {
          if (!window.playable) {
            initGame();
            return;
          }

          window.playable.init = function () {
            initGame(); //playable.GAME_NAME = '[companyName]-[gameName]';

            playable.GAME_NAME = data.gameName, playable.REWARDED_DURATION = data.totalTime; //'30'

            playable.INTERSTITIAL_DURATION = data.totalTime;
            playable.HIDE_TIMER = 'false';
          };
        }
      }

      /* harmony default export */
      var src = __webpack_exports__["default"] = (Main);

      /***/
    })
    /******/
  ]);
});