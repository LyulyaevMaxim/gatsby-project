import { Dispatch } from 'redux'
import * as IActions from './actions.d'
import { ActionTypes, INotification } from './reducer.d'

export const notificationAdd = (payload: INotification) => (dispatch: Dispatch<IActions.INotificationAdd>) =>
  dispatch({ type: ActionTypes.NOTIFICATION_ADD, payload })

export const notificationHide = (payload: IActions.INotificationHide['payload']) => (
  dispatch: Dispatch<IActions.INotificationHide>
) => dispatch({ type: ActionTypes.NOTIFICATION_HIDE, payload })
