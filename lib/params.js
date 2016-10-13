function assignParam(object, [key, value]) {
  return object[key] = value, object
}
function parse(search) {
  return Array.from(new URLSearchParams(search)).reduce(assignParam, {})
}
function search(data) {
  var params = new URLSearchParams()
  for(var key of Object.keys(data)) {
    params.append(key, data[key])
  }
  return params.toString()
}
function params(params) {
  return typeof params === 'string' ? parse(params) : search(params)
}
if(typeof module === 'object') {
  module.exports = params
} else {
  window.params = params
}
