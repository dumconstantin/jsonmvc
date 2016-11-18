'use strict'
const jsonPatch = require('fast-json-patch')
const R = require('ramda')

const parsePath = R.pipe(
  R.replace(/\s/g, ''),
  R.replace(/~0/g, '~'),
  R.replace(/~1/g, '/'),
  R.split('/'),
  R.tail
)


let db = {
  foo: {
    bar: {
      baz: null
    }
  }
}

let nodes = {}

const apply = patch => {

  if (R.not(R.is(Array, patch))) {
    patch = [patch]
  }

  let errors = jsonPatch.validate(patch, db)

  if (errors !== undefined) {
    throw errors
  } else {
    jsonPatch.apply(db, patch)
  }

}

const getDynamic = path => {
  let path2 = parsePath(path)
  let node = R.path(path2, nodes)

  let args = R.map(x => {
    return get(x)
  }, node.paths)

  let result = node.fn.apply(null, args)

  return result
}

const get = path => {
  let path2 = parsePath(path)

  // if it's dynamic
  if (R.path(path2, nodes) !== undefined) {
    return getDynamic(path)
  } else {
    return R.path(path2, db)
  }

}

const on = path => {

}

const node = o => {
  let path = parsePath(o.path)
  nodes = R.assocPath(path, {
    paths: o.paths,
    fn: o.fn
  }, nodes)
}

module.exports = {
  apply: apply,
  get: get,
  on: on,
  node: node
}
