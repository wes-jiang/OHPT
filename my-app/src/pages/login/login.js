import React, {useState} from 'react'

import {
    Flex,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react'
import { NavLink, useNavigate } from 'react-router-dom'

import LoginCard from './loginCard'
import Signup from './signupCard'
// import Signup from './newSignup'
function Login() {
    const navigate = useNavigate()
    return (
        <Flex
            align={'center'}
            justify={'center'}
        >
            <Tabs
                isFitted
                variant="enclosed"
                defaultIndex={0}
            >
                <TabList>
                    <Tab>
                        Login
                    </Tab>

                    <Tab
                        onClick={() => navigate('/signup')}
                    >
                        Sign up
                    </Tab>

                </TabList>

                <TabPanels>
                    <TabPanel>
                        <LoginCard />
                    </TabPanel>

                    <TabPanel>
                        <Signup />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
        
    )
}

export default Login
