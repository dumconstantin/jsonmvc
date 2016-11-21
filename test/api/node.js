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

console.log(JSON.stringify(db.db, null, ' '))
db.node('/foo', ['/a/b/c'], fn)
db.node('/a/b/c/bar', ['/a/b/c/bam', '/a/b/c/baz'], (x, y) => x + y)


console.log(db.get('/foo'))

