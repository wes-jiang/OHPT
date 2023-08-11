import React, { useEffect, useRef } from "react"
import { Flex, 
    Text, 
    Avatar, 
    Button,
    useColorMode,
    useColorModeValue,
    } from "@chakra-ui/react"
import BeatLoader from "react-spinners/BeatLoader"

const Messages = ({ messages }) => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  const { colorMode } = useColorMode();

  //Colors for the User
  const MsgUserBackColor = useColorModeValue("white", "dark-gray")
  const MsgUserTextColor = useColorModeValue("black", "white")

  //Colors for OHPT
  const MsgAssistBackColor = useColorModeValue("gray.100", "gray.800")
  const MsgAssistTextColor = useColorModeValue("black", "white")

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="2"
    justifyContent="center" alignItems="center">
      {messages.map((item, index) => {
        const isMyMessage = item.from === "me"
        if (item.from === "me") {
          return (
            <Flex key={index} w="100%" justifyContent={"center"}>
              <Flex
                bg={MsgUserBackColor}
                color={MsgUserTextColor}
                my="1"
                p="3"
                flexDirection={"row"}
                alignItems="center"
                justifyContent="space-between"
                overflowY="auto"
                maxWidth="60%"
                borderRadius={"10px"}
                marginBottom={"10px"}
              >
                <Text 
                flex="1"
                mr="4"
                overflowY="auto"
                wordBreak='break-word'
                textAlign='left'
                >{item.text}</Text>
                <Avatar 
                    name="Lyna"
                    size="md"
                    src=""
                    
                    />
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} 
            w="100%"
            color={MsgAssistTextColor}
            bg={MsgAssistBackColor}
            overflowY="auto"
            justifyContent={"center"}
            >
              <Avatar
                name="OHPT"
                margin="2"
                size="md"
                src="https://media.licdn.com/dms/image/C5603AQE8fCwomwCjhQ/profile-displayphoto-shrink_800_800/0/1662494019775?e=2147483647&v=beta&t=HqZoo89s5GDJlxpiPt1_pMYtElbK0HVXDOr9tEiu87I"
                sx={({
                })}
              />
              <Flex
                my="1"
                p="3px"
                overflowY="auto"
                wordBreak='break-word'
              >
                <Text
                flex="1"
                mr="4"
                overflowY="auto"
                wordBreak='break-word'
                textAlign="left"
                >{item.text}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
      {/* <AlwaysScrollToBottom /> */}
    </Flex>
  );
};

export default Messages;
