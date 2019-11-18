import { fireEvent, RenderResult } from '@testing-library/react'

interface ICreateSelectInterface {
  container: RenderResult['container']
}

export const createSelectInterface = ({ container }: ICreateSelectInterface) => {
  return {
    get value() {
      return (container.querySelector('[name=field-lengthCSS-select]') as any).value
    },
    get options() {
      if (!this.isMenuOpen) this.openMenu()
      return [...(container.querySelector('.select__menu-list') as any).children]
    },
    get input() {
      return container.querySelector('.select__input input')
    },
    get control() {
      return container.querySelector('.select__control')
    },
    get isMenuOpen() {
      return [...(this.control as any).classList].includes('select__control--menu-is-open')
    },
    openMenu() {
      fireEvent.focus(this.input as any)
      fireEvent.mouseDown(this.control as any)
    },
    getOption(optionValue: string) {
      return this.options.find((option: HTMLElement) => option.textContent === optionValue)
    },
    changeOption(newOption: string) {
      if (!this.isMenuOpen) this.openMenu()
      fireEvent.click(this.getOption(newOption))
    },
  }
}
