import React, {useState} from 'react'

import {
    Flex,
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

function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <Flex
            minH={'30vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('white', 'dark-gray')}
        >
            <Stack
                spacing={8}
                mx={'auto'}
                // maxW={'lg'}
                py={12}
                px={6}
            >
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>
                        Sign up
                    </Heading>

                    <Text>
                        to enjoy all of our features
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('gray.50', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    w={'lg'}
                >
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id='firstName' isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type='text' />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id='lastName'>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type='text' />
                                </FormControl>
                            </Box>
                        </HStack>
                        
                        <FormControl id='email' isRequired>
                            <FormLabel>Email Address</FormLabel>
                            <Input type='email' />
                        </FormControl>

                        <FormControl id='password' isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' :'password'} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                                    >
                                        {showPassword ? <ViewIcon/> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{bg:'blue.500'}}
                            >
                                Sign up
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Signup
