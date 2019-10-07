// TODO:
//   https://testing-library.com/docs/react-testing-library/setup#configuring-jest-with-test-utils
//   https://testing-library.com/docs/react-testing-library/setup#custom-render
//   https://testing-library.com/docs/react-testing-library/setup#add-custom-queries

export * from '@testing-library/react'

/*
import { render } from '@testing-library/react'

function AllTheProviders({ children }) {
  return (
    <ThemeProvider theme="light">
    <TranslationProvider messages={defaultStrings}>
    { children }
    </TranslationProvider>
    </ThemeProvider>
  )
}
const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

export { customRender as render }
*/
