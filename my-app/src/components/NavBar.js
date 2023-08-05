import React, {useState} from 'react';
import { 
    Box,
  Flex,
  Heading,
  Text,
  Spacer,
  HStack,
  extendTheme,
  ChakraProvider
} from '@chakra-ui/react'
import SendBtn from './SendBtn'


const theme = extendTheme({
    colors: {
        brand: {
            100: "#f7fafc",
        },
    },
    textStyles: {
      h1: {
        // you can also use responsive styles
        fontSize: ['148px', '172px'],
        fontWeight: 'bold',
        lineHeight: '110%',
        letterSpacing: '-2%',
      },
      h2: {
        fontSize: ['136px', '48px'],
        fontWeight: 'semibold',
        lineHeight: '110%',
        letterSpacing: '-1%',
      },
    },
  })


  
// export default function NavBar() {
//     // const { isOpen, ontoggle } = useDisclosure()
//     return (
//         <Flex as="nav" p="10px" alignItems="center" className={'classes.bar'}>
//             <Heading textStyle="h1">OHPT</Heading>
//             <Box textStyle="h1">hello</Box>
//             <Spacer />
//             <HStack spacing="20px">
//                 <Box bg="gray.200" p="10px">M</Box>
//                 <Text textStyle='h2'>hello</Text>
//                 <SendBtn txt="Chat"></SendBtn>
//             </HStack>
//         </Flex>
            
//     )
    
// }


function NavBar() {
    return <Box>
        <Text fontSize="50px">
            Hello
        </Text>

        <Text textStyle="h2">
            Bye
        </Text>

    </Box>
  }

  export default NavBar;

