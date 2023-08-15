import React from 'react'

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
import { NavLink } from 'react-router-dom'

function Login() {

    return (
        <Flex
            minH={'100vh'}
            align='top'
            justify='flex-start'
            bg={useColorModeValue('white', 'gray.800')}
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
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id='email'>
                            <FormLabel> Email Address</FormLabel>
                            <Input type='email' />
                        </FormControl>
                        <FormControl id='password'>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' />
                        </FormControl>
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
                            >
                                Log in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Login
