import React from 'react'
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
} from '@chakra-ui/react'

import {SmallCloseIcon} from '@chakra-ui/icons'
import { Form } from 'react-router-dom'

function UserProfileEdit() {
    return (
        <Flex
            minH={'100vh'}
        >
            <Stack>
                <Heading>
                    User Profile Edit
                </Heading>
                <FormControl id='userName'>
                    <FormLabel> User Picture</FormLabel>
                    <Stack direction={['column', 'row']} spacing={6}>
                        <Center>
                            <Avatar size='xl' src=''>
                                <AvatarBadge
                                    as={IconButton}
                                    size='sm'
                                    rounded='full'
                                    icon={<SmallCloseIcon />}
                                />
                            </Avatar>
                        </Center>
                        <Center w='full'>
                            <Button w='full'>Change Icon</Button>
                        </Center>
                    </Stack>
                </FormControl>
                <FormControl id='email' isRequired>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                        placeholder="your-email@example.com"
                        _placeholder={{color: 'gray.500'}}
                        type='email'
                    />
                </FormControl>
                <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                    <Input
                        placeholder="password"
                        _placeholder={{color: 'gray.500'}}
                        type='password'
                    />
                </FormControl>
                <Stack>
                    <Button>
                        Cancel
                    </Button>
                    <Button>
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    )
}

export default UserProfileEdit
