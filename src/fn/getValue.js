'use strict'
const splitPath = require('./splitPath')

module.exports = (obj, path) => {
  let parts = splitPath(path)
  let val = obj

  for (let i = 0; i < parts.length; i += 1) {
    if (val[parts[i]]) {
      val = val[parts[i]]
    } else {
      val = null
      break
    }
  }

  return val
}
