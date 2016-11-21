var db = require('./../../src/index')()

var fn = x => x

db.patch({
  op: 'add',
  path: '/a/b/c/bam',
  value: 'bam'
})

db.patch({
  op: 'add',
  path: '/a/b/c/baz',
  value: 'baz'
})

db.patch({
  op: 'add',
  path: '/goo',
  value: 'This is goo'
})

db.node('/foo', ['/a/b/c'], fn)
db.node('/a/b/c/bar', ['/a/b/c/bam', '/a/b/c/baz'], (x, y) => x + y)
db.node('/bar', ['/foo', '/goo', '/roo'], (x, y, z) => {
  x.baz += y + z
  return x
})
db.node('/roo', ['/foo'], x => x)

console.log(JSON.stringify(db.get('/bar'), null, ' '))
