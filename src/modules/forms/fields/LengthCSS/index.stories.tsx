import React from 'react'
import { storiesOf } from '@storybook/react'
import { css } from '@emotion/core'
import { FieldLengthCSS } from './index'
import * as I from './types'
import { examplesForInputPatterns } from './input'

storiesOf(`Modules/Forms/Fields/LengthCSS`, module).add(`default`, () => (
  <>
    <h1>Компонент для редактирования значения CSS свойства</h1>
    <p>Состоит из:</p>
    <ul>
      <li>
        <b>input</b>
        <p>
          Для ввода значения свойства.
          <br />
          Формат ввода: <b>{`<число>, <число><единица измерения>, <предопределённое значение>`}</b> (-1.556, 7px, auto)
          <br />
          Значение сохраняется после потери фокуса если проходит валидацию.
          <br />В случае <b>{'<число>'}</b> оно остаётся в поле ввода, если в <b>select</b> было{' '}
          <b>{'<предопределённое значение>'}</b>, то оно сбрасывается на самую первую <b>{'<единицу измерения>'}</b>.
          <br />В случае <b>{'<число><единица измерения>'}</b> в поле ввода остаётся только число, единица измерения
          переходит в <b>select</b>.
          <br />В случае <b>{'<предопределённое значение>'}</b> значение остаётся и устанавливается аналогично в{' '}
          <b>select</b>
        </p>
      </li>
      <li>
        <b>select</b>
        <p>
          Для установки единицы измерения свойства
          <br />
          Список видимых опций может быть ограничен свойством <b>menu-items</b>. Однако, если пользователь вручную
          введёт в <b>input</b> валидную единицу измерения, отсутствующую в этом массиве, то она временно добавится в
          этот список.
          <br />
          Если новая единица измерения - <b>{'<предопределённое значение>'}</b>, а в <b>input</b> - число, то оно
          сбрасывается
        </p>
      </li>
    </ul>

    <table css={styles.propsTable}>
      <thead>
        <tr>
          {['Свойство', 'Применение', 'Значения'].map(title => (
            <th key={title}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[
          {
            property: 'value',
            values: (
              <>
                <b>{`<число>, <число><единица измерения>, <предопределённое значение>`}</b>, где:
                <br />
                <br />
                <b>число</b> - любое число (-1, 0, 1.6666)
                <br />
                <br />
                <b>единица измерения</b> - {Object.keys(I.numericUnits).join(', ')}
                <br />
                <br />
                <b>предопределённое значение</b> - {Object.keys(I.defaultUnitsOfMeasure).join(', ')}
              </>
            ),
            howUse: 'Задаёт значение компонента',
          },
          {
            property: 'menu-items',
            values: Object.keys(I.allUnits).join(', '),
            howUse: 'Задаёт список отображаемых в select опций',
          },
          {
            property: 'onChange',
            values: '({value, unit}) => void',
            howUse: 'Функция, пробрасывающая наверх новое значение компонента при корректном изменении',
          },
        ].map(({ property, values, howUse }) => (
          <tr key={property}>
            <td>{property}</td>
            <td>{howUse}</td>
            <td>{values}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <p>
      <i>На момент ввода</i> <b>корректными</b> считаются значения {examplesForInputPatterns.validForInput.join(', ')},{' '}
      <b>некорректными</b> — {examplesForInputPatterns.invalidForInput.join(', ')}
      <br />
      <i>На момент потери фокуса</i> <b>корректными</b> считаются значения{' '}
      {examplesForInputPatterns.validForSaving.join(', ')}, <b>некорректными</b> —{' '}
      {examplesForInputPatterns.invalidForSaving.join(', ')}
    </p>

    <p>Вид по умолчанию:</p>
    <FieldLengthCSS />

    <p>С ограниченным списком отображаемых опций, не входящем в него начальным значением и коллбэком родителя:</p>
    <FieldLengthCSS menu-items={['auto', 'px', '%', 'rem']} value="20vw" onChange={onChange} />
  </>
))

const styles = {
    propsTable: css`
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;

      & > thead th {
        text-align: left;
        text-transform: uppercase;
      }
      & > tbody > tr {
        vertical-align: baseline;
        & > td {
          border: 1px solid;
          padding: 10px;
        }
      }
    `,
  },
  onChange = newValue => console.log('to parent component', newValue)
