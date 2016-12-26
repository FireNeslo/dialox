const dialog = require('./lib/dialog')
const popup = require('./lib/popup')

const params = require('./lib/params')
const types = {popup, dialog}

module.exports = function dialox(url='', data={}, options={}) {
  var callback = options.callback || location.origin
  var open = types[options.type] || ('ontouchstart' in window ? popup : dialog)

  return new Promise((resolve, reject) => {
    var [domain, search] = url.split('?')
    var query = params(data) + (search?('&'+params(params(search))):'')
    var ctrl = open(domain + '?' + query, options)
    var modal = ctrl[0]

    requestAnimationFrame(function poll() {
      if(modal.closed) {
        return reject(new Error('Window was closed.'))
      }
      try {
        if(callback === modal.location.origin) {
          resolve(params(modal.location.search.slice(1)))
          // ctrl.close()
        }
      } catch(error) {
        /* noop */
      } finally {
        requestAnimationFrame(poll)
      }
    })
  })
}
