import {
  Heading,
} from '@chakra-ui/react'

import React from 'react'
import VerifyEmail from './login/verifyEmail'
import UserProfileEdit from './login/userProfileEdit'

export default function About() {
    return (
      <div className="about">
        About
        <VerifyEmail />
        <UserProfileEdit />
      </div>
    )
  }