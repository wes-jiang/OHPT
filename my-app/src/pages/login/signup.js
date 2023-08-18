import React from 'react'

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
import SignupCard from './signupCard'
// import Signup from './newSignup'
function Signup() {
    const navigate = useNavigate()
    return (
        <Flex
            align={'center'}
            justify={'center'}
        >
            <Tabs
                isFitted
                variant="enclosed"
                defaultIndex={1}
            >
                <TabList>
                    <Tab
                        onClick={() => navigate('/login')}
                    >
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
                        <SignupCard />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
        
    )
}

export default Signup
