export interface INotification {
  notificationId: string
  message: string
  unread: boolean
}

export interface IState {
  readonly list: Array<INotification['notificationId']>
  readonly data: { [key: string]: INotification }
}

export enum ActionTypes {
  NOTIFICATION_ADD = 'NOTIFICATION_ADD',
  NOTIFICATION_HIDE = 'NOTIFICATION_HIDE',
}
