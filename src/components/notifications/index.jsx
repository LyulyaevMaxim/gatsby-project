import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NotificationsContainer, addNotification } from 'modules/notifications'
import { notificationHide } from 'store/notifications/actions'
import { createSelector } from 'reselect'

const unreadNotificationsList = createSelector(
  state => state.notifications,
  notifications => notifications.list.filter(notificationId => notifications.data[notificationId].unread)
)

export function Notifications() {
  const notificationsList = useSelector(unreadNotificationsList)
  return notificationsList.map(notificationId => (
    <Notification notificationId={notificationId} key={`notification-${notificationId}`} />
  ))
  // return <NotificationsContainer />
}

const Notification = React.memo(({ notificationId }) => {
  const notificationData = useSelector(state => state.notifications.data[notificationId]),
    dispatch = useDispatch(),
    hideNotification = React.useCallback(() => dispatch(notificationHide({ notificationId })), [
      dispatch,
      notificationId,
    ])

  /*return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open
      autoHideDuration={6000}
      // onClose={handleClose}
      message={<span>Note archived</span>}
    />
  )*/

  return (
    <div>
      <span>{notificationData.message}</span>
      <button type='button' onClick={hideNotification}>Hide</button>
    </div>
  )
})
