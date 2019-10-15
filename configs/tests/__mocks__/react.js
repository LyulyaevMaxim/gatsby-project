//TODO: https://reactjs.org/blog/2019/08/08/react-v16.9.0.html#async-act-for-testing

const React = require('react')

module.exports = { ...React, useEffect: React.useLayoutEffect }
