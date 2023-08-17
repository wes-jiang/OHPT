import React, {useState} from 'react'

import {
    Flex,
    FormErrorMessage,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Field, Form, Formik, FormikProps} from 'formik'


function Signup() {
  function validateName(value) {
    let error;
    if (!value) {
      error = 'This field is required';
    }
    return error;
  }

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field name="firstName" validate={validateName}>
            {({ field, form }) => (
              <div>
                <label>First Name</label>
                <input {...field} type="text" />
                {form.errors.firstName && form.touched.firstName && (
                  <div>{form.errors.firstName}</div>
                )}
              </div>
            )}
          </Field>

          <Field name="lastName" validate={validateName}>
            {({ field, form }) => (
              <div>
                <label>Last Name</label>
                <input {...field} type="text" />
                {form.errors.lastName && form.touched.lastName && (
                  <div>{form.errors.lastName}</div>
                )}
              </div>
            )}
          </Field>

          <Field name="email" validate={validateName}>
            {({ field, form }) => (
              <div>
                <label>Email Address</label>
                <input {...field} type="email" />
                {form.errors.email && form.touched.email && (
                  <div>{form.errors.email}</div>
                )}
              </div>
            )}
          </Field>

          <Field name="password" validate={validateName}>
            {({ field, form }) => (
              <div>
                <label>Password</label>
                <input {...field} type="password" />
                {form.errors.password && form.touched.password && (
                  <div>{form.errors.password}</div>
                )}
              </div>
            )}
          </Field>

          <button type="submit">Sign up</button>
        </Form>
      )}
    </Formik>
  );
}


export default Signup
