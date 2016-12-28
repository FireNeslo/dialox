const dialog = require('./lib/dialog')
const popup = require('./lib/popup')

const params = require('./lib/params')
const types = {popup, dialog}


function Dialox(controller, pending) {
  this.pending = pending
  this.controller = controller[1]
}
Dialox.prototype.close = function() {
  return this.controller.close(), this
}
Dialox.prototype.navigate = function(location) {
  return this.controller.navigate(location), this
}
Dialox.prototype.then = function then(cb, eb) {
  return this.pending.then(cb, eb)
}
Dialox.prototype.catch = function thenCatch(eb) {
  return this.then(null, eb)
}



module.exports = function dialox(url='', data={}, options={}) {
  if(typeof url === 'object') {
    return function configured(curl, options) {
      return dialox(curl, options, url)
    }
  }

  var callback = options.callback || location.origin
  var open = types[options.type] || ('ontouchstart' in window ? popup : dialog)
  var [domain, search] = url.split('?')
  var query = params(data) + (search?('&'+params(params(search))):'')
  var ctrl = open(domain + '?' + query, options)

  var pending = new Promise((resolve, reject) => {
    var modal = options.type || ctrl[0]
    requestAnimationFrame(function poll() {
      if(modal.closed) {
        return reject(new Error('Window was closed.'))
      }
      try {
        var href = modal.location.href
        if(href && href.indexOf(callback) > -1) {
          var data = params(modal.location.search.slice(1))
          if(data.error) {
            reject(data)
          } else {
            resolve(data)
          }
          if(!options.type) ctrl[1].close()
        }
      } catch(error) {
        /* noop */
      } finally {
        requestAnimationFrame(poll)
      }
    })
  })
  return new Dialox(ctrl, pending)
}
