import React, {useRef}from 'react'

import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Text,
    useDisclosure
  } from '@chakra-ui/react'


function SourceDrawer(sources) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    // Convert sources to a JavaScript array if it's not already
    const sourcesArray = Array.isArray(sources) ? sources : [];

    return (
        <div className='drawer'>
            <Button ref={btnRef} onClick={onOpen}>Learn more</Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerHeader>Source</DrawerHeader>
            <DrawerBody>
            {sourcesArray.length === 0 ? (
              <Text>No sources available.</Text>
            ) : (
              sourcesArray.map((source, index) => (
                <Text key={index}> {source} </Text>
              ))
            )}
            </DrawerBody>
            </DrawerContent>
        </Drawer>
      </div>
    )
}

export default SourceDrawer
