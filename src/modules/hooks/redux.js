import React from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

export function useActions(actions, deps) {
  const dispatch = useDispatch()
  return React.useMemo(
    () =>
      Array.isArray(actions)
        ? actions.map(a => bindActionCreators(a, dispatch))
        : bindActionCreators(actions, dispatch),
    [actions, dispatch]
  )
}

export function useShallowEqualSelector(selector) {
  return useSelector(selector, shallowEqual)
}
