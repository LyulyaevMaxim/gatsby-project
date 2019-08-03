import React from 'react'
import { toast, ToastContainer, ToastContent, ToastOptions, TypeOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' //for custom stylization: ReactToastify.minimal.css

// toast.configure()

// imagine progress for file upload with axios (https://github.com/fkhadra/react-toastify#use-a-controlled-progress-bar)
// type IAddSuccessNotification = ToastOptions

interface IAddSuccessNotification extends ToastOptions {
  message: ToastContent
  type: TypeOptions
  toastId?: string
  // onOpen?, onClose?
}

addNotification.defaultProps = {
  type: toast.TYPE.DEFAULT,
}

export function addNotification({ message, type, ...props }: IAddSuccessNotification) {
  const fn = type === toast.TYPE.DEFAULT ? toast : toast[type],
    containerId =
      //TODO: ts error for [toast.TYPE.ERROR, toast.TYPE.WARNING, toast.TYPE.SUCCESS].includes(type)
      type === toast.TYPE.ERROR || type === toast.TYPE.WARNING || type === toast.TYPE.SUCCESS ? type : 'other'

  return fn(message, { containerId, ...props })
}

export function NotificationsContainer() {
  return (
    <>
      <ToastContainer
        enableMultiContainer
        containerId={toast.TYPE.ERROR}
        position={toast.POSITION.TOP_LEFT}
        autoClose={false}
        // closeButton={<CustomCloseButton customProp="<delete>" />}
        // rtl={i18.isRtl()}
      />
      <ToastContainer
        enableMultiContainer
        containerId={toast.TYPE.WARNING}
        position={toast.POSITION.TOP_CENTER}
        autoClose={6000}
        hideProgressBar
      />
      <ToastContainer
        enableMultiContainer
        containerId={toast.TYPE.SUCCESS}
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
      />
      <ToastContainer
        enableMultiContainer
        containerId="other"
        position={toast.POSITION.TOP_CENTER}
        autoClose={1500}
        hideProgressBar
      />
    </>
  )
}

const CustomCloseButton = ({ closeToast, customProp }) => (
  <button type="button" onClick={closeToast} children={customProp} />
)
