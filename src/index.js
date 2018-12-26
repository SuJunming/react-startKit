import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import { init } from '@rematch/core'
import * as models from './models'
import { Provider } from 'react-redux'
import Count from './count'

// generate Redux store
const store = init({
  models,
})

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Count />
      <Router />
    </Provider>
  </BrowserRouter>,
  document.getElementById('index'),
)
