const modalDefaults = {
  width: 250,
  height: 250,
  padding: 0
}

module.exports = function dialog(url, data={}, options={}, body=document.body) {
  var dialog = document.createElement('dialog')
  var frame = document.createElement('iframe')
  var link = document.createElement('a')

  frame.src = url
  link.href = url

  Object.assign(dialog.style, options, modalDefaults)
  dialog.appendChild(frame)
  body.appendChild(dialog)
  dialog.showModal()

  return [frame.contentWindow, {
    close() {
      body.removeChild(dialog)
    }
  }]
}
