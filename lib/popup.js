function yesno(option) {
  return typeof option === 'boolean' ? option ? 'yes' : 'no' : option
}
function optionValue(option) {
  return [option, yesno(this[option])].filter(v => v != null).join('=')
}
function optionValues(options) {
  return Object.keys(options).map(optionValue, options).join(',')
}
function defaults(options) {
  return Object.assign({}, popupDefaults.popup, options)
}

const popupDefaults = {
  popup: {
    width: 300,
    height: 400,
    status: true,
    resizable: true,
    scrollbars: true
  }
}

module.exports = function popup(url, data={}, options={}) {
  var popup = window.open(url, null, optionValues(defaults(options)))
  return [popup, {
    close() {
      popup.close()
    },
    navigate(location) {
      popup.location.href = location
    }
  }]
}
