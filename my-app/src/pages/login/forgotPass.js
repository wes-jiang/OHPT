import React from 'react'

import{
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

function ForgotPass() {
    return (
        <Flex
            minH={'100vh'}
            align='center'
            justify='center'
            bg={useColorModeValue('white', 'dark-gray')}
        >
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('gray.50', 'gray.700')}
                rounded='sm'
                boxShadow={'md'}
                p={6}
                my={5}
            >
                <Heading>
                    Forgot your password?
                </Heading>

                <Text>
                    You'll get an email with a reset link
                </Text>
                <FormControl id='email'>
                    <Input
                        placeholder='your-email@example.com'
                        _placeholder={{color:'gray.500'}}
                        type='email'
                    />
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        bg={useColorModeValue('blue.400', 'blue.600')}
                        color='white'
                        _hover={{bg: 'blue.500'}}
                    >
                        Request Reset
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    )
}

export default ForgotPass
