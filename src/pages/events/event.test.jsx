import React from 'react'
import renderer from 'react-test-renderer'
// import Header from './index'

const Header = props => (
  <header>
    <nav>
      <h1>
        <a href="/">{props.siteTitle}</a>
      </h1>
    </nav>
  </header>
)

describe('Header', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Header siteTitle="Default Starter" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
