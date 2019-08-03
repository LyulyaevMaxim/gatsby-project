import { INotification, ActionTypes } from './reducer.d'

export default IActions
type IActions = INotificationAdd | INotificationHide

export interface INotificationAdd {
  type: ActionTypes.NOTIFICATION_ADD
  payload: INotification
}

export interface INotificationHide {
  type: ActionTypes.NOTIFICATION_HIDE
  payload: { notificationId: INotification['notificationId'] }
}
