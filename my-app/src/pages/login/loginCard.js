import React, {useState} from 'react'

import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { NavLink, useLoaderData, useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik';

import { SetCookie } from '../../cookieUtils';

function Login() {
    const backColor = useColorModeValue('white', 'gray.800')
    const boxColor = useColorModeValue('white', 'gray.700')
    const inputColor = useColorModeValue('black', 'white')
    const [userId, setUserId] = useState(null)
    const [token, setToken] = useState(null)
    const navigate = useNavigate()

    function validateName(value, name) {
        let error;
        if (!value && name==='username') {
            error = 'Email is required'
        }
    
        if (!value && name==='password') {
            error = 'Password is required'
        }
        return error;
      }


    const handleSubmit = async (values, actions) => {
        console.log('values handleSubmit', values)

        try {
          const response = await fetch('http://127.0.0.1:8000/chat/login', {
            method: 'POST', // Specify the HTTP method
            headers: {
              'Content-Type': 'application/json', // Set the content type
            },
            body: JSON.stringify(values), // Convert values to JSON and send as the request body
            // credentials: 'include', // Include cookies in the request
        })
    
          if (response.ok) {
            const responseData = await response.json()
            console.log('responseData', responseData)
            setUserId(responseData.user.id)

            console.log('tokenValue', responseData.token)

            SetCookie('userToken', responseData.token, 7)
            
            navigate('/chat')
            
          } else {
            console.error('Error submitting form:', response.statusText);
          }
    
          actions.setSubmitting(false);
        } 
        catch (error) {
          console.error('Error submitting form:', error);
          actions.setSubmitting(false);
        }
      };

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            onSubmit={(values, actions) => {
                handleSubmit(values, actions)
            }}
        >
            {({ handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
        <Flex
            minH={'100vh'}
            align='top'
            justify='flex-start'
            bg={backColor}
        >
            <Stack
                spacing={8}
                mx='auto'
            >
                <Stack align='center'>
                    <Heading>
                        Sign in your account
                    </Heading>
                    <Text size="lg">
                        to enjoy all of OHPT
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={boxColor}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={4}>
                    <Field name="username" validate={validateName}>
                        {({ field, form }) => (
                        <FormControl id='username'>
                            <FormLabel id="username"> Email Address</FormLabel>
                            <Input {...field} type='email' 
                            color={inputColor}/>
                        </FormControl>
                        )}
                    </Field>
                        <Field name="password" validate={validateName}>
                        {({ field, form }) => (
                        <FormControl id='password'>
                            <FormLabel id="password">Password</FormLabel>
                            <Input {...field} type='password' 
                            color={inputColor}/>
                        </FormControl>
                        )}
                    </Field>
                        <Stack spacing={10}>
                            <Stack
                                direction={({base: 'column', sm: 'row'})}
                                align={'start'}
                                justify={'space-between'}
                            >
                                <Checkbox>
                                    Remember me
                                </Checkbox>
                                <NavLink to='/forgotpass'>
                                    Forgot password?
                                </NavLink>
                            </Stack>

                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{bg: 'blue.500'}}
                                isLoading={isSubmitting}
                                type="submit"
                            >
                                Log in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
        </Form>
        )}
        </Formik>
    )
}

export default Login

