import React from 'react'

import {
    Button,
    Center,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    PinInput,
    PinInputField,
} from '@chakra-ui/react'


function VerifyEmail() {
    return (
        <Flex>
            <Stack>
                <Center>
                    <Heading lineHeight={1.1}>
                        Verify your Email
                    </Heading>
                </Center>

                <Center>
                    We have sent code to your email
                </Center>

                <Center>
                    username@gmail.com
                </Center>

                <FormControl>
                    <Center>
                        <HStack>
                            <PinInput>
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                    </Center>
                </FormControl>
                <Stack spacing={6}>
                    <Button bg={'blue.400'}
                    color={'white'}
                    _hover={{bg: 'blue.500'}}
                    >
                        Verify Code
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    )
}

export default VerifyEmail
