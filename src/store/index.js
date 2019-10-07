import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
// import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'
// import { createBrowserHistory, History } from 'history'
import thunkMiddleware from 'redux-thunk'
import { get } from 'lodash'
// export const history: History = createBrowserHistory()
import { notificationsReducer } from './notifications/reducer'

export function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware /*routerMiddleware(history)*/],
    composedEnhancers =
      (process.env.isDev &&
        get(/*(window as any)*/ window, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', Function.prototype)({ trace: true })) ||
      compose,
    enhancer = composedEnhancers(applyMiddleware(...middlewares))

  return createStore(
    combineReducers({
      counter: (state = { count: 0 }, action) => {
        if (action.type === `INCREMENT`) {
          return { ...state, count: state.count + 1 }
        }
        return state
      },
      notifications: notificationsReducer,
      // router: connectRouter(history),
      // products: productsReducer,
      // events: eventsReducer,
    }),
    preloadedState,
    enhancer
  )
}
