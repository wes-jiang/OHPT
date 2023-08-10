import {
  Button,
  Flex,
  Grid, 
  GridItem,
  Text,
  Textarea,
  useColorModeValue,
  } from '@chakra-ui/react'

import ResizeTextarea from "react-textarea-autosize"
import { AddIcon } from '@chakra-ui/icons';
import React, { forwardRef, useState } from "react";
import Sidebar from '../../components/chat/Sidebar'
import ChatInput from '../../components/chat/ChatInput'
import Messages from '../../components/chat/Messages'


const CustomInput = forwardRef((props, ref) => {
  return (
    <Textarea
      minH="unset"
      overflow="hidden"
      w="80%"
      resize="none"
      ref={ref}
      minRows={1}
      as={ResizeTextarea}
      {...props}
      color="black"
      transition="height none"
      placeholder='Your Question Here'
  
    />
  );
});

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("")
  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage

    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [...old, { from: "OHPT", text: data }]);
    }, 1000);
  }

  const SidebarColor = useColorModeValue("gray", "black")

  return (
    <Grid templateColumns="1fr 2fr" gap={4}>
      {/* Sidebar */}
      <GridItem 
          as="aside"
          colSpan={1}
          style={{ backgroundColor: SidebarColor }}
          minHeight="100vh"
          p="30px">

        {/* Sidebar content */}
        <Button
          leftIcon={<AddIcon />}
          colorScheme='white'
          size="md"
          padding="3"
          variant='outline'
          >
            Create

        </Button>
        <Text> Topic 1 </Text>
        <Text> Topic 2 </Text>
      </GridItem>

      {/* Chatbox */}
      <GridItem colspan={2}>
        <Flex w="100%" mt="5">
          <CustomInput 
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          />
            <Button
              bg="black"
              color="white"
              borderRadius="none"
              _hover={{
                bg: "white",
                color: "black",
                border: "1px solid black",
              }}
              disabled={inputMessage.trim().length <= 0}
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Flex>
      </GridItem>
    </Grid>
          
        
    )
  }

  export default Chat