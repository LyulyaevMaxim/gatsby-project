import { useState, useCallback } from 'react'
//https://react-hooks-testing-library.com/usage/basic-hooks
import { renderHook, act } from '@testing-library/react-hooks'

function useCounter() {
  const [count, setCount] = useState(0)
  const increment = useCallback(() => setCount(x => x + 1), [])
  return { count, increment }
}

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter())
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(1)
})
