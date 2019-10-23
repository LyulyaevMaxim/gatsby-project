import { configure } from '@storybook/react'

const req = require.context(`../../src`, true, /\.stories\.(ts|js)x?$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

global.___loader = { enqueue: () => {}, hovering: () => {} }

global.__PATH_PREFIX__ = ''

window.___navigate = pathname => {
  action('NavigateTo:')(pathname)
}

configure(loadStories, module)
