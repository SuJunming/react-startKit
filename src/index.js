import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import { init } from '@rematch/core'
import * as models from './models/index'
import { Provider } from 'react-redux'

// generate Redux store
const store = init({
  models,
})

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Router />
    </Provider>
  </BrowserRouter>,
  document.getElementById('container'),
)
