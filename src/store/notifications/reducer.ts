import produce from 'immer'
import * as INotifications from './reducer.d'
import INotificationActions from './actions.d'

type IState = INotifications.IState
const { ActionTypes } = INotifications

const initialState = {
  list: [],
  data: {},
}

export const notificationsReducer = (state: IState = initialState, action: INotificationActions) =>
  produce<IState>(state, draft => {
    switch (action.type) {
      case ActionTypes.NOTIFICATION_ADD: {
        const notificationId = String(state.list.length)
        draft.data[notificationId] = { ...action.payload, unread: true, notificationId }
        draft.list.push(notificationId)
        break
      }

      case ActionTypes.NOTIFICATION_HIDE: {
        // const notificationId = String(state.list.length)
        draft.data[action.payload.notificationId].unread = false
        // draft.list.push(notificationId)
        break
      }

      default:
        break
    }
    return draft
  })
