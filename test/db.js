'use strict'
var db = require('./../src/db')

var patch = {
  op: 'add',
  path: '/foo/bar/baz',
  value: 'bar-baz'
}

var node = {
  path: '/foo2',
  paths: ['/foo/bar/baz', '/foo/bam'],
  fn: (baz, bam) => {
    return baz + ' joiner ' + bam
  }
}

db.node(node)

db.apply(patch)

console.log('Simple', db.get(patch.path))


var patch2=  {
  op: 'add',
  path: '/foo/bam',
  value: 'the bam!'
}

db.apply(patch2)

console.log('First dynamic', db.get(node.path))

var node2 = {
  path: '/foo3',
  paths: ['/foo2'],
  fn: foo => {
    return foo + ' just got better'
  }
}

db.node(node2)

console.log('Second dynamic', db.get(node2.path))
