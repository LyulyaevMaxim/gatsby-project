const React = require('react'),
  gatsby = jest.requireActual('gatsby')

module.exports = {
  ...gatsby,
  ...['graphql', 'StaticQuery', 'useStaticQuery'].reduce(
    (acc, currentKey) => ({ ...acc, [currentKey]: jest.fn() }),
    {}
  ),
  TransitionLink: jest.fn().mockImplementation(({ to, ...rest }) =>
    React.createElement('a', {
      ...rest,
      href: to,
    })
  ),
}
