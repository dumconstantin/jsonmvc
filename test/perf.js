'use strict';

function foo(obj) {
  var a
  var finish
  var start = process.hrtime()
  a = JSON.parse(JSON.stringify(obj))
  finish = process.hrtime(start)
  console.log(finish[0] + ':' + Math.round(finish[1] / 1000 / 1000))
  return a
}

function rand(length) {
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function generate(o) {
  let obj = {}

  let i, j, level, key
  for (i = 0; i < o.levels; i += 1) {
    level = rand(10)
    obj[level] = {}
    for (j = 0; j < o.levels; j += 1) {
      key = rand(10)
      obj[level][key] = '1'
    }
  }

  return obj

}

var obj = generate({
  levels: 100
})

console.log(JSON.stringify(obj).length)

foo(obj)

