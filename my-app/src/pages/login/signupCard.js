import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const backColor = useColorModeValue('white', 'dark-gray');
  const boxColor = useColorModeValue('gray.50', 'gray.700');
  const inputColor = useColorModeValue('black', 'white')
  const navigate = useNavigate();
  const signUpToast = useToast()

  function validateName(value, name) {
    let error;
    if (!value && name === 'first_name') {
      error = 'First name is required';
    }
    if (!value && name === 'last_name') {
      error = 'Last name is required';
    }
    if (!value && name === 'email') {
      error = 'Email is required';
    }

    if (!value && name === 'password') {
      error = 'Password is required';
    }
    return error;
  }

  const handleSubmit = async (values, actions) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/chat/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert('Form submitted successfully');
        navigate('/login');
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
          username: values.email,
        };
        handleSubmit(updatedValues, actions);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Flex align={'center'} justify={'center'} bg={backColor} h={'50vh'}>
            <Box p={8} rounded={'md'} bg={boxColor} boxShadow={'lg'}>
              <Stack spacing={2} align={'flex-start'}>
                <Flex direction="row" justify="space-between" >
                  <Box flex={1} marginRight={2}>
                    <Field name="first_name" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel>First Name</FormLabel>
                          <Input {...field} type="text" 
                          isRequired 
                          isInvalid={form.errors.first_name && form.touched.first_name}
                          color={inputColor}/>
                        </FormControl>
                      )}
                    </Field>
                  </Box>

                  <Box flex={1} marginLeft={2}>
                    <Field name="last_name" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel>Last Name</FormLabel>
                          <Input {...field} type="text" isInvalid={form.errors.last_name && form.touched.last_name}
                          isRequired
                          color={inputColor}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                </Flex>

                <Field name="email" validate={validateName}>
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel>Email Address</FormLabel>
                      <Input {...field} type="email" isInvalid={form.errors.email && form.touched.email}
                          isRequired
                          color={inputColor}
                          />
                          
                    </FormControl>
                  )}
                </Field>

                <Field name="password" validate={validateName}>
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          isInvalid={form.errors.password && form.touched.password}
                          isRequired
                          color={inputColor}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            variant={'ghost'}
                            h="1.75rem"
                            size="sm"
                            onClick={() =>
                              setShowPassword(!showPassword)
                            }
                          >
                            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  )}
                </Field>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="blue"
                  width="full"
                  onClick={() =>
                    signUpToast({
                      title: 'Account created.',
                      description: "We've created your account for you.",
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                    })}
                >
                  Sign up
                </Button>
              </Stack>
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

export default SignupCard;
