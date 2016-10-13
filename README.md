dialox - v1.0.0
===
Open windows to external sites and and wait for them to return to you.

Check demo/index.js for usage
## Install
### npm
```bash
$ npm install FireNeslo/dialox --save
```
## Usage
####  my.domain
```js
var dialox = require('dialox')


dialox('//not.my.domain').then(data => {
  console.log('response from not.my.domain:', data)
})

```
####  not.my.domain
```js
var qs = require('qs')
var params = qs.parse(location.search.slice(1))
var form = document.querySelector('form')

form.addEventListener('submit', event => {
  event.preventDefault()

  var data = new FormData(event.target)
  var query = Array.from(data).map(param => param.join('=')).join('&')

  location.href = [params.origin, query].join('?')
})
```

## API

### Server

#### dialox(url, data, options)

Author: fireneslo@gmail.com

##### Params:
* **string** *url* - url to navigate to.
* **object** *data* - query params to send.
* **object** *options* - configure modal
* **string** *options.type* - modal style ['popup', 'dialog']

```js

/* window.open */
dialox('//not.my.domain', {}, {type: 'popup'})
/* <dialog> element with iframe */
dialox('//not.my.domain', {}, {type: 'dialog'})

```
