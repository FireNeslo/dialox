const qs = require('qs')

function assignParam(object, [key, value]) {
  return object[key] = value, object
}
function parse(search) {
  return qs.parse(search)
}
function search(data) {
  return qs.stringify(data)
}
function params(params) {
  return typeof params === 'string' ? parse(params) : search(params)
}
if(typeof module === 'object') {
  module.exports = params
} else {
  window.params = params
}
