import React from 'react'

import {
    Flex,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

import LoginCard from './loginCard'
import Signup from './signup'
// import Signup from './newSignup'
function Login() {
    return (
        <Flex
            align={'center'}
            justify={'center'}
        >
            <Tabs
                isFitted
                variant="enclosed"
            >
                <TabList>
                    <Tab>
                        Login
                    </Tab>

                    <Tab>
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
