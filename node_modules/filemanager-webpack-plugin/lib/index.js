'use strict';

var fs = require('fs');
var path = require('path');
var cpx = require('cpx');
var fsExtra = require('fs-extra');
var makeDir = require('make-dir');

/**
 * Execute copy action
 *
 * @param {Object} command - Command data for given action
 * @return {Function|null} - Function that returns a promise or null
 */
function copyAction(command, options) {
  var verbose = options.verbose;


  if (!command.source || !command.destination) {
    if (verbose) {
      console.log('  - FileManagerPlugin: Warning - copy parameter has to be formated as follows: { source: <string>, destination: <string> }');
    }
    return null;
  }

  return function () {
    return new Promise(function (resolve, reject) {
      // if source is a file, just copyFile()
      // if source is a NOT a glob pattern, simply append **/*
      var fileRegex = /(\*|\{+|\}+)/g;
      var matches = fileRegex.exec(command.source);

      if (matches === null) {
        fs.lstat(command.source, function (sErr, sStats) {
          if (sErr) return reject(sErr);

          fs.lstat(command.destination, function (dErr, dStats) {
            if (sStats.isFile()) {
              var destination = dStats && dStats.isDirectory() ? command.destination + '/' + path.basename(command.source) : command.destination;

              if (verbose) {
                console.log('  - FileManagerPlugin: Start copy source: ' + command.source + ' to destination: ' + destination);
              }

              /*
               * If the supplied destination is a directory copy inside.
               * If the supplied destination is a directory that does not exist yet create it & copy inside
               */

              var pathInfo = path.parse(destination);

              var execCopy = function execCopy(src, dest) {
                fsExtra.copy(src, dest, function (err) {
                  if (err) reject(err);
                  resolve();
                });
              };

              if (pathInfo.ext === '') {
                makeDir(destination).then(function (mPath) {
                  execCopy(command.source, destination + '/' + path.basename(command.source));
                });
              } else {
                execCopy(command.source, destination);
              }
            } else {
              var sourceDir = command.source + (command.source.substr(-1) !== '/' ? '/' : '') + '**/*';
              copyDirectory(sourceDir, command.destination, resolve, reject, options);
            }
          });
        });
      } else {
        copyDirectory(command.source, command.destination, resolve, reject, options);
      }
    });
  };
}

/**
 * Execute copy directory
 *
 * @param {string} source - source file path
 * @param {string} destination - destination file path
 * @param {Function} resolve - function used to resolve a Promise
 * @param {Function} reject - function used to reject a Promise
 * @return {void}
 */
function copyDirectory(source, destination, resolve, reject, options) {
  var verbose = options.verbose;

  /* cpx options */

  var cpxOptions = {
    clean: false,
    includeEmptyDirs: true,
    update: false
  };

  if (verbose) {
    console.log('  - FileManagerPlugin: Start copy source file: ' + source + ' to destination file: ' + destination);
  }

  cpx.copy(source, destination, cpxOptions, function (err) {
    if (err && options.verbose) {
      console.log('  - FileManagerPlugin: Error - copy failed', err);
      reject(err);
    }

    if (verbose) {
      console.log('  - FileManagerPlugin: Finished copy source: ' + source + ' to destination: ' + destination);
    }

    resolve();
  });
}

var fs$1 = require('fs');
var mv = require('mv');

/**
 * Execute move action
 *
 * @param {Object} command - Command data for given action
 * @return {Function|null} - Function that returns a promise or null
 */
function moveAction(command, options) {
  var verbose = options.verbose;


  if (!command.source || !command.destination) {
    if (verbose) {
      console.log('  - FileManagerPlugin: Warning - move parameter has to be formated as follows: { source: <string>, destination: <string> }');
    }
    return null;
  }

  if (fs$1.existsSync(command.source)) {
    return function () {
      return new Promise(function (resolve, reject) {
        if (verbose) {
          console.log('  - FileManagerPlugin: Start move source: ' + command.source + ' to destination: ' + command.destination);
        }

        mv(command.source, command.destination, { mkdirp: false }, function (err) {
          if (err) {
            if (verbose) {
              console.log('  - FileManagerPlugin: Error - move failed', err);
            }
            reject(err);
          }

          if (verbose) {
            console.log('  - FileManagerPlugin: Finished move source: ' + command.source + ' to destination: ' + command.destination);
          }

          resolve();
        });
      });
    };
  } else {
    process.emitWarning('  - FileManagerPlugin: Could not move ' + command.source + ': path does not exist');
    return null;
  }
}

var fs$2 = require('fs');
var rimraf = require('rimraf');

/**
 * Execute delete action
 *
 * @param {Object} command - Command data for given action
 * @return {Function|null} - Function that returns a promise or null
 */
function deleteAction(command, options) {
  var verbose = options.verbose;


  return function () {
    return new Promise(function (resolve, reject) {
      if (verbose) {
        console.log('  - FileManagerPlugin: Starting delete path ' + command.source);
      }

      if (typeof command.source !== 'string') {
        if (verbose) {
          console.log('  - FileManagerPlugin: Warning - delete parameter has to be type of string. Process canceled.');
        }
        reject();
      }

      rimraf(command.source, {}, function (response) {
        if (verbose && response === null) {
          console.log('  - FileManagerPlugin: Finished delete path ' + command.source);
        }
        resolve();
      });
    });
  };
}

var makeDir$1 = require('make-dir');

/**
 * Execute mkdir action
 *
 * @param {Object} command - Command data for given action
 * @return {Function|null} - Function that returns a promise or null
 */
function mkdirAction(command, options) {
  var verbose = options.verbose;


  return function () {
    if (verbose) {
      console.log('  - FileManagerPlugin: Creating path ' + command.source);
    }

    if (typeof command.source !== 'string') {
      if (verbose) {
        console.log('  - FileManagerPlugin: Warning - mkdir parameter has to be type of string. Process canceled.');
      }
      return null;
    }

    return makeDir$1(command.source);
  };
}

var fs$3 = require('fs-extra');
var path$1 = require('path');
var archiver = require('archiver');

/**
 * Execute mkdir action
 *
 * @param {Object} command - Command data for given action
 * @return {Function|null} - Function that returns a promise or null
 */
function archiveAction(command, options) {
  var verbose = options.verbose;


  return function () {
    return new Promise(function (resolve, reject) {
      if (!command.source || !command.destination) {
        if (verbose) {
          console.log('  - FileManagerPlugin: Warning - archive parameter has to be formated as follows: { source: <string>, destination: <string> }');
        }
        reject();
      }

      var fileRegex = /(\*|\{+|\}+)/g;
      var matches = fileRegex.exec(command.source);

      var isGlob = matches !== null;

      fs$3.lstat(command.source, function (sErr, sStats) {
        var output = fs$3.createWriteStream(command.destination);
        var archive = archiver(command.format, command.options);

        archive.on('error', function (err) {
          return reject(err);
        });
        archive.pipe(output);

        // Exclude destination file from archive
        var destFile = path$1.basename(command.destination);
        var globOptions = Object.assign({ ignore: destFile }, command.options.globOptions || {});

        if (isGlob) archive.glob(command.source, globOptions);else if (sStats.isFile()) archive.file(command.source, { name: path$1.basename(command.source) });else if (sStats.isDirectory()) archive.glob('**/*', {
          cwd: command.source,
          ignore: destFile
        });
        archive.finalize().then(function () {
          return resolve();
        });
      });
    });
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var FileManagerPlugin = function () {
  function FileManagerPlugin(options) {
    classCallCheck(this, FileManagerPlugin);

    this.options = this.setOptions(options);
  }

  createClass(FileManagerPlugin, [{
    key: 'setOptions',
    value: function setOptions(userOptions) {
      var defaultOptions = {
        verbose: false,
        moveWithMkdirp: false,
        onStart: {},
        onEnd: {}
      };

      for (var key in defaultOptions) {
        if (userOptions.hasOwnProperty(key)) {
          defaultOptions[key] = userOptions[key];
        }
      }

      return defaultOptions;
    }
  }, {
    key: 'checkOptions',
    value: function checkOptions(stage) {
      var _this = this;

      if (this.options.verbose && Object.keys(this.options[stage]).length) {
        console.log('FileManagerPlugin: processing ' + stage + ' event');
      }

      var operationList = [];

      if (this.options[stage] && Array.isArray(this.options[stage])) {
        this.options[stage].map(function (opts) {
          return operationList.push.apply(operationList, toConsumableArray(_this.parseFileOptions(opts, true)));
        });
      } else {
        operationList.push.apply(operationList, toConsumableArray(this.parseFileOptions(this.options[stage])));
      }

      if (operationList.length) {
        operationList.reduce(function (previous, fn) {
          return previous.then(function (retVal) {
            return fn(retVal);
          }).catch(function (err) {
            return console.log(err);
          });
        }, Promise.resolve());
      }
    }
  }, {
    key: 'replaceHash',
    value: function replaceHash(filename) {
      return filename.replace('[hash]', this.fileHash);
    }
  }, {
    key: 'processAction',
    value: function processAction(action, params, commandOrder) {
      var result = action(params, this.options);

      if (result !== null) {
        commandOrder.push(result);
      }
    }
  }, {
    key: 'parseFileOptions',
    value: function parseFileOptions(options) {
      var _this2 = this;

      var commandOrder = [];

      Object.keys(options).forEach(function (actionType) {
        var actionOptions = options[actionType];
        var actionParams = null;

        actionOptions.forEach(function (actionItem) {
          switch (actionType) {
            case 'copy':
              actionParams = Object.assign({ source: _this2.replaceHash(actionItem.source) }, actionItem.destination && { destination: actionItem.destination });

              _this2.processAction(copyAction, actionParams, commandOrder);

              break;

            case 'move':
              actionParams = Object.assign({ source: _this2.replaceHash(actionItem.source) }, actionItem.destination && { destination: actionItem.destination });

              _this2.processAction(moveAction, actionParams, commandOrder);

              break;

            case 'delete':
              if (!Array.isArray(actionOptions) || typeof actionItem !== 'string') {
                throw Error('  - FileManagerPlugin: Fail - delete parameters has to be an array of strings');
              }

              actionParams = Object.assign({ source: _this2.replaceHash(actionItem) });
              _this2.processAction(deleteAction, actionParams, commandOrder);

              break;

            case 'mkdir':
              actionParams = { source: _this2.replaceHash(actionItem) };
              _this2.processAction(mkdirAction, actionParams, commandOrder);

              break;

            case 'archive':
              actionParams = {
                source: _this2.replaceHash(actionItem.source),
                destination: actionItem.destination,
                format: actionItem.format ? actionItem.format : 'zip',
                options: actionItem.options ? actionItem.options : { zlib: { level: 9 } }
              };

              _this2.processAction(archiveAction, actionParams, commandOrder);

              break;

            default:
              break;
          }
        });
      });

      return commandOrder;
    }
  }, {
    key: 'apply',
    value: function apply(compiler) {
      var that = this;

      var comp = function comp(compilation) {
        try {
          that.checkOptions('onStart');
        } catch (error) {
          compilation.errors.push(error);
        }
      };

      var afterEmit = function afterEmit(compilation, cb) {
        that.fileHash = compilation.hash;

        try {
          that.checkOptions('onEnd');
        } catch (error) {
          compilation.errors.push(error);
        }

        cb();
      };

      if (compiler.hooks) {
        compiler.hooks.compilation.tap('compilation', comp);
        compiler.hooks.afterEmit.tapAsync('afterEmit', afterEmit);
      } else {
        compiler.plugin('compilation', comp);
        compiler.plugin('after-emit', afterEmit);
      }
    }
  }]);
  return FileManagerPlugin;
}();

module.exports = FileManagerPlugin;
//# sourceMappingURL=index.js.map
