import React, { useState } from 'react';
import {
  Flex,
  FormErrorMessage,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Field, Form, Formik } from 'formik';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const backColor = useColorModeValue('white', 'dark-gray');
  const boxColor = useColorModeValue('gray.50', 'gray.700');

  function validateName(value, name) {
    let error;
    if (!value && name==='first_name') {
      error = 'First name is required';
    }
    if (!value && name==='last_name') {
        error = 'Last name is required'
    }
    if (!value && name==='email') {
        error = 'Email is required'
    }

    if (!value && name==='password') {
        error = 'Password is required'
    }
    return error;
  }

  const handleSubmit = async (values, actions) => {
    try {
        console.log('values', values)
      const response = await fetch('http://127.0.0.1:8000/chat/signup', {
        method: 'POST', // Specify the HTTP method
        headers: {
          'Content-Type': 'application/json', // Set the content type
        },
        body: JSON.stringify(values), // Convert values to JSON and send as the request body
      });

      if (response.ok) {
        alert('Form submitted successfully');
      } else {
        console.error('Error submitting form:', response.statusText);
      }

      actions.setSubmitting(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      actions.setSubmitting(false);
    }
  };


  return (
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      }}
      onSubmit={(values, actions) => {
        const updatedValues = {
            ...values,
            username: values.email, // Assuming the backend expects 'username' for email
          };
        handleSubmit(updatedValues, actions)
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Flex minH={'30vh'} align={'center'} justify={'center'} bg={backColor}>
            <Box rounded={'lg'} bg={boxColor} boxShadow={'lg'} p={8} w={'lg'}>
              <Stack spacing={4}>
                <Field name="first_name" validate={validateName}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.first_name && form.touched.first_name}
                      isRequired
                    >
                      <FormLabel id="first_name">First Name</FormLabel>
                      <Input {...field} type="text"  />
                      <FormErrorMessage>{form.errors.first_name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="last_name" validate={validateName}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.lastName && form.touched.lastName}
                    >
                      <FormLabel id="last_name">Last Name</FormLabel>
                      <Input {...field} type="text" />
                      <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="email" validate={validateName}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                      isRequired
                    >
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <Input {...field} type="email" />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password" validate={validateName}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                      isRequired
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                        //   id="password"
                        />
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                        {/* <InputGroup.RightElement h={'full'}> */}
                          <Button
                            variant={'ghost'}
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        {/* </InputGroup.RightElement> */}
                      </InputGroup>
                    </FormControl>
                  )}
                </Field>
                <Stack spacing={10} pt={2}>
                  <Button
                    type='submit'
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{ bg: 'blue.500' }}
                    isLoading={isSubmitting}
                    // onClick={makeUser}
                  >
                    Sign up
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

export default Signup;
