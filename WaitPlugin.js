// WaitPlugin.js
const WebpackBeforeBuildPlugin = require('before-build-webpack')
const fs = require('fs')

class WaitPlugin extends WebpackBeforeBuildPlugin {
  constructor(file, interval = 500, timeout = 300000) {
    super(function(stats, callback) {
      let start = Date.now()

      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }

      function poll() {
        if (fs.existsSync(file)) {
          callback()
        } else if (Date.now() - start > timeout) {
          throw Error("Maybe it just wasn't meant to be.")
        } else {
          setTimeout(poll, interval)
        }
      }

      poll();
    })
  }
}

module.exports = WaitPlugin