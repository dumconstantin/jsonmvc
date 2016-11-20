'use strict'
const graph = require('./../src/graph.js')

let o = {
  a: {
    b: 2
  },
  c: {
    d: {
      e: 123,
      p: _dynamic_
    },
    f: 123,
    m: _dynamic_
  }
}

let edges = [
  ['a', 'b'],
  ['c', 'd'],
  ['c', 'f'],
  ['d', 'e'],
  ['d', 'p'],
  ['c', 'm']
]

let nodes = ['a', 'b', 'c', 'd', 'e', 'p', 'm']

let essential = {
  b: 2,
  e: 123,
  f: 123
}

let dynamicEdges = [
  ['p', ['b']],
  ['m', ['p', 'a']],
]

let dynamic = {
  p: () => {},
  m: () => {}
}

let watchers = {
  c: () => {},
  m: () => {}
}

// The id needs to be generated from the path of the element
// in order to be easy to identify
// From the id make the distinction between dynamic and essential

let sample = graph.build(o)

console.log(sample)
