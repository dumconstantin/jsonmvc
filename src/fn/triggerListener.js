'use strict'

const getNode = require('./getNode')
const asyncCall = require('./asyncCall')

module.exports = (db, path) => {

  let val = getNode(db, path)
  let fns = db.updates.fns[path]

  fns.forEach(x => {
    asyncCall(() => x.call(null, val))
  })

}
