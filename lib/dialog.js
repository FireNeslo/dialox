const modalDefaults = {
  parent: document.body,
  wrapper: 'dialog',
  show: 'showModal',
  dialog: {
    width: 250,
    height: 250,
    padding: 0
  }
}

module.exports = function dialog(url, data={}, options={}) {
  options = Object.assign({}, options, modalDefaults)

  var {parent, wrapper, show} = options

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
    }
  }]
}
