import React from 'react'
import styled from '@emotion/styled'
import renderer from 'react-test-renderer'
// import { ThemeProvider } from "emotion-theming"

const Button = styled.div`
  /*color: hotpink;*/
`

test('Button renders correctly', () => {
  expect(renderer.create(<Button>This is hotpink.</Button>).toJSON()).toMatchSnapshot()
})

/*
const theme = {
  maxWidth: "1450px",
}

const Wrapper = styled.section`
  max-width: ${props => props.theme.maxWidth};
`

test("Wrapper renders correctly", () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={theme}>
          <Wrapper>Content.</Wrapper>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot()
})
*/
