import React from 'react'
import renderer from 'react-test-renderer'
import { PureHeader } from './index'

// TODO: https://react.i18next.com/misc/testing
describe('Header', () => {
  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <PureHeader
            data={{
              site: {
                siteMetadata: {
                  title: 'Gatsby Project',
                },
                buildTime: '01-01-2021'
              },
              desktop: {},
            }}
          />
        )
        .toJSON()
    ).toMatchSnapshot()
  })
})
