'use strict'
const jsonPatch = require('fast-json-patch')
const getValue = require('./../fn/getValue')
const nestingPatches = require('./../fn/nestingPatches')

/**
 * patch
 *
 * Applies a patch
 */
module.exports = db => patch => {
  if (patch instanceof Array === false) {
    patch = [patch]
  }

  // Check if root exists for add operations
  patch.forEach(x => {
    let path = x.path.split('/')
    path = path.slice(0, path.length - 1).join('/')

    if (x.op === 'add' && getValue(db, path) === null) {
      let patches = nestingPatches(db.static, x.path)
      jsonPatch.apply(db.static, patches)
    }
  })

  let errors = jsonPatch.apply(db.static, patch)
}
