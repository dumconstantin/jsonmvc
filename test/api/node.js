var db = require('./../../src/index')()

var fn = () => {}

db.node('/a/b', ['/b/c'], fn)

db.node('/b/c/d', ['/e'], fn)

db.node('/e/c/d', ['/j'], fn)

db.node('/j', ['/b/c'], fn)

console.log(JSON.stringify(db.db, null, ' '))

