export { WithProvider as wrapRootElement } from './src/store/withProvider'
export { wrapPageElement } from './src/components/layout/index'

/*
import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { configureStore } from './src/store'

const react = require('react'),
  { Provider } = require('react-redux'),
  { renderToString } = require('react-dom/server'),
  { configureStore } = require('./src/store')

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const store = configureStore({ items: { data: {}, list: [] } })

  const ConnectedBody = () => <Provider store={store}>{bodyComponent}</Provider>
  replaceBodyHTMLString(renderToString(<ConnectedBody />))
}
*/

