import React from 'react'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  withFormik,
  FormikActions,
  FormikProps,
  FieldProps,
  FormikErrors,
} from 'formik'
import * as Yup from 'yup'
import { navigate } from 'gatsby'

interface IFormValues {
  firstName: string
}

const initialValues = {
    auth: ['oldPassword', 'captha'],
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phone: {
      code: '+7',
      number: '',
    },
    username: '',
  },
  SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  }),
  /* formValidate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    return errors
  }, */
  validateUsername = value => (value === 'admin' ? 'Nice try!' : undefined),
  formSubmit = (values: IFormValues, { setSubmitting }: FormikActions<IFormValues>) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
      //with request we send data, get orderId ->
      navigate('/order/orderID', { state: { flag: 'abc' }, replace: true })
    }, 400)
  },
  formRender = (props: FormikProps<IFormValues>) => {
    const { isSubmitting/*, errors, touched, validateField, validateForm*/ } = props
    return (
      <Form>
        <Field name="username" validate={validateUsername} />
        {/*<button type="button" onClick={() => validateField('username')}>
          Check username
        </button>*/}
        <Field name="firstName" render={FirstNameField} />
        <Field type="text" name="lastName" />
        <Field type="email" name="email" />
        <Field type="text" name="phone.code" />
        <Field type="number" name="phone.number" />
        <Field type="password" name="auth[0]" />
        <Field type="password" name="password" />
        <Field component="select" name="color">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </Field>
        {/*<button type="button" onClick={() => validateForm().then(r => console.log('blah', r))}>
          Validate All
        </button>*/}
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
        {Object.keys(initialValues).map(fieldName => (
          <ErrorMessage name={fieldName} component="div" key={`field-${fieldName}`} />
        ))}
      </Form>
    )
  }

const FormsPage: React.FC<{}> = () => (
  <>
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      // validate={formValidate}
      // validateOnChange={false}
      onSubmit={formSubmit}
      // component={ContactForm}
      render={formRender}
    />
    <EnhancedReusingForm message="Sign up" />
  </>
)

interface IReusingFormValues {
  a: string
}

interface IReusingFormProps {
  message: string
}

function ReusingForm(props: IReusingFormProps & FormikProps<IReusingFormValues>) {
  const { touched, errors, isSubmitting, message } = props
  return (
    <Form>
      <h1>{message}</h1>
      <Field type="text" name="a" />
      {touched.a && errors.a && <div>{errors.a}</div>}
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  )
}

interface IReusingFormOneProps {
  initialA?: string
  message: string
}

const EnhancedReusingForm = withFormik<IReusingFormOneProps, IReusingFormValues>({
  displayName: 'EnhancedReusingForm',
  mapPropsToValues: props => ({
    a: props.initialA || '',
    password: '',
  }),
  validate: (values: IReusingFormValues) => {
    const errors: FormikErrors<IReusingFormValues> = {}
    if (!values.a) {
      errors.a = 'Required'
    } else if (values.a.length < 5) {
      errors.a = 'Invalid A'
    }
    return errors
  },
  handleSubmit: values => {
    // do submitting things
  },
})(ReusingForm)

function FirstNameField({ field, form }: FieldProps<IFormValues>) {
  return (
    <div>
      <input type="text" {...field} placeholder="First Name" />
      {form.touched.firstName && form.errors.firstName && form.errors.firstName}
    </div>
  )
}

export default FormsPage
