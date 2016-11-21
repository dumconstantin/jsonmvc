'use strict'
const jsonPatch = require('fast-json-patch')

/**
 * patch
 *
 * Applies a patch
 */
module.exports = db => patch => {
  jsonPatch.apply(tree, patch)
}
