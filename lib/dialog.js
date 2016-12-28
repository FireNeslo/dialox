const modalDefaults = {
  parent: document.body,
  wrapper: 'dialog',
  show: 'showModal',
  dialog: {
    width: 300,
    height: 400,
    padding: 0
  }
}

module.exports = function dialog(url, data={}, options={}) {
  options = Object.assign({}, modalDefaults, options )
  var {parent, wrapper, show} = options
  if(!parent) parent = document.body
  var dialog = document.createElement(wrapper)
  var frame = document.createElement('iframe')
  var link = document.createElement('a')

  frame.src = url
  link.href = url

  Object.assign(dialog.style, options.dialog, modalDefaults.dialog)

  dialog.appendChild(frame)
  parent.appendChild(dialog)

  if(dialog[show]) dialog[show]()

  return [frame.contentWindow, {
    close() {
      parent.removeChild(dialog)
    },
    navigate(location) {
      frame.src = location
    }
  }]
}
