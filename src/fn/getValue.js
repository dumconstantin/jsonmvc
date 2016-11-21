'use strict'
const splitPath = require('./splitPath')

const getValue = (db, path) => {
  let result

  if (db.dynamic.fns[path]) {
    let nodes = db.dynamic.deps[path]
    let args = nodes.map(x => getValue(db, x))
    result = db.dynamic.fns[path].apply(null, args)
  } else {
    let parts = splitPath(path)
    let val = db.static

    // Get the static root
    for (let i = 0; i < parts.length; i += 1) {
      if (val[parts[i]]) {
        val = val[parts[i]]
      } else {
        val = null
        break
      }
    }

    // If root was found
    if (val !== null) {

      if (val instanceof Object === true) {
        console.log('Need to get dynamic nodes of', val)
      } else {
        // val remains the same and does't need cloning
      }

    }

    result = val
  }

  return result
}

module.exports = getValue
