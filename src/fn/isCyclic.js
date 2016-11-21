'use strict'
const decomposePath = require('./decomposePath')

// Implement https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm for faster search

const uniq = xs => {
  let seen = {};
  let out = [];
  let j = 0;

  for (let i = 0, len = xs.length; i < len; i += 1) {
    let item = xs[i];

    if (!seen[item]) {
      seen[item] = true;
      j += 1
      out[j] = item;
    }
  }
  return out
}

const extendDeps = deps =>
  Object
    .keys(deps)
    .reduce((acc, x) => {
      acc[x] = deps[x]

      decomposePath(x).forEach(y => {
        acc[y] = deps[x]
      })

      return acc
    }, {})

module.exports = deps => {
  deps = extendDeps(deps)

  let parents = Object.keys(deps)

  let willVisit = parents.reduce((acc, x) => {
    acc[x] = false
    return acc
  }, {})

  let isCyclic = false

  parent:
  for (let i = 0; i < parents.length; i += 1) {
    let visited = Object.assign({}, willVisit)
    let parent = parents[i]
    let children = deps[parent].slice()

    while (children.length > 0) {
      let child = children.shift()

      if (deps[child]) {
        if (visited[child]) {
          isCyclic = true
          break parent
        } else {
          visited[child] = true
          children = children.concat(deps[child])
          children = uniq(children)
        }
      } else {
        // Its a static node so we don't care
      }
    }
  }

  return isCyclic
}
