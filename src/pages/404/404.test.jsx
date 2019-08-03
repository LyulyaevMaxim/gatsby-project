import React from 'react'
import renderer from 'react-test-renderer'
import NotFoundPage from './index.en'

describe('NotFoundPage', () => {
  it('renders correctly', () => {
    const data = {
      data: {
        site: {
          siteMetadata: {
            title: `Default Starter`,
          },
        },
      },
      pathContext: {
        langKey: 'en',
      },
    }

    const tree = renderer.create(<NotFoundPage {...data} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
