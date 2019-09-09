import React from 'react'
import { storiesOf } from '@storybook/react'
import toastify, { toast, cssTransition } from 'react-toastify'
import { Button } from '@material-ui/core'
import { css } from '@emotion/core'
import { NotificationsContainer, addNotification } from '../../modules/notifications'

storiesOf('Notifications', module).add('react-toastify', () => <NotificationsDemo />)

export function NotificationsDemo() {
  return (
    <>
      <NotificationsContainer />
      <h3>Send notifications</h3>
      <section>
        <Button variant="contained" color="primary" onClick={() => addNotification({ message: `It's default` })}>
          Default
        </Button>
        {['info', 'error', 'warn', 'success'].map(type => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => addNotification({ type, message: `It's ${type}` })}
            key={type}
          >
            {type}
          </Button>
        ))}
      </section>

      <h3>Dismiss notifications</h3>
      <section>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            function ToastComp({ closeToast }) {
              return (
                <div>
                  <Button variant="contained" color="primary" onClick={closeToast}>
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={event => {
                      event.stopPropagation()
                      //await request()
                      console.log(`retry was success for ${toastId}`)
                      toast.dismiss(toastId)
                    }}
                  >
                    Retry action
                  </Button>
                  {/*https://github.com/fkhadra/react-toastify#add-an-undo-option-to-a-toast-like-google-drive*/}
                  <Button variant="contained" color="primary" onClick={closeToast}>
                    Undo action
                  </Button>
                </div>
              )
            }
            const toastId = addNotification({ message: ToastComp })
          }}
        >
          Hide by toastId
        </Button>
        <Button variant="contained" color="primary" onClick={() => toast.dismiss()}>
          Hide all notifications
        </Button>
      </section>

      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          addNotification({ message: <div>Only 1 such toast can show now</div>, toastId: 'my-custom-toast' })
        }
      >
        Only 1 such toast can show now
      </Button>

      <h3>Customization</h3>
      <section>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addNotification({ message: 'With delay', delay: 1000 })}
        >
          With delay
        </Button>

        <Button
          children="Toast which changes after 1s"
          onClick={() => {
            const toastId = toast.error('Trying fix', { closeButton: false })
            setTimeout(
              () =>
                toast.update(toastId, {
                  toastId: 'successFixedErrorSubmit',
                  type: toast.TYPE.INFO,
                  closeButton: null,
                  render: 'It was submitted successfull',
                  autoClose: 5000,
                  className: 'rotateY animated', //or css({transform: "rotateY(360deg)", transition: "transform 0.6s" })
                }),

              1000
            )
          }}
          variant="contained"
          color="primary"
        />

        <Button
          children="With callbacks"
          onClick={() => {
            addNotification({
              message: <ToastComp myProp="123" />,
              onOpen: props => console.log(`It was opened`, props),
              onClose: ({ myProp }) => console.log(`It was closed`, myProp),
            })

            function ToastComp(/*props*/) {
              return 'With callbacks on open and close notification'
            }
          }}
          variant="contained"
          color="primary"
        />
      </section>

      <h3>Stylization</h3>
      <section>
        <Button
          children="Custom classes"
          variant="contained"
          color="primary"
          onClick={() =>
            addNotification({
              //TODO: don't work
              className: css({
                background: 'black !important',
              }),
              bodyClassName: css({
                fontSize: '60px',
              }),
              progressClassName: css({
                background: 'repeating-radial-gradient(circle at center, red 0, blue, green 30px)',
              }),
              message: `With custom classes`,
            })
          }
        />
        {['Slide', 'Zoom', 'Flip', 'Bounce'].map(transition => (
          <Button
            children={transition}
            onClick={() => //TODO: maybe bug, return require
              addNotification({ transition: toastify[transition], message: `It's ${transition}` })
            }
            variant="contained"
            color="primary"
            key={transition}
          />
        ))}
        <Button
          children="Custom animation"
          variant="contained"
          color="primary"
          onClick={() =>
            addNotification({
              transition: cssTransition({
                enter: 'zoomIn', //animation names from stylesheet
                exit: 'zoomOut',
                duration: [500, 800],
              }),
              message: `With custom animation`,
            })
          }
        />
      </section>
    </>
  )
}
