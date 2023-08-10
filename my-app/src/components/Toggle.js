import React from 'react'
import { useBoolean, IconButton } from '@chakra-ui/react'

function Toggle() {
    const [flag, setFlag] = useBoolean()
  
    return (
      <>
        <p>Boolean state: {flag.toString()}</p>
        <button onClick={setFlag.toggle}>
          Click me to toggle the boolean value
        </button>
      </>
    )
  }

export default Toggle



