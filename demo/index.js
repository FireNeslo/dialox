var dialox = require('..')

var external = `http://localhost:9967/demo/context.html`

var button = document.createElement('button')

button.addEventListener('click', event => {
  dialox(external, { origin: location.origin })
    .then(data => {
      console.log(data)
    })
})

button.textContent = 'Open'

document.body.appendChild(button)
