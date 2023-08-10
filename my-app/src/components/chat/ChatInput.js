import React, {forwardRef, useState} from 'react'
import { Flex, Input, Box, Textarea, Button } from '@chakra-ui/react'
import ResizeTextarea from "react-textarea-autosize"

const CustomInput = forwardRef((props, ref) => {
    return (
      <Textarea
        minH="unset"
        overflow="hidden"
        w="100%"
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

  const ChatInput = ({ inputMessage, setInputMessage, handleSendMessage }) => {
    return (
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
    );
  };

  export default ChatInput;
