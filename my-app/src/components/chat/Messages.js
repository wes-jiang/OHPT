import React, { useEffect, useRef } from "react"
import { Flex, 
    Text, 
    Avatar, 
    Button,
    useColorMode,
    useColorModeValue,
    } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons";
import BeatLoader from "react-spinners/BeatLoader"

const Messages = ({ messages }) => {


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
          return (
            <Flex 
                key={index} 
                w="100%" 
                // justifyContent={isMyMessage ? "flex-end":"flex-start"}
                alignItems= "center"
                justifyContent={"center"}
                >
                {!isMyMessage && (
                    <Avatar
                        name="OHPT"
                        margin="2"
                        size="md"
                        src="https://media.licdn.com/dms/image/C5603AQE8fCwomwCjhQ/profile-displayphoto-shrink_800_800/0/1662494019775?e=2147483647&v=beta&t=HqZoo89s5GDJlxpiPt1_pMYtElbK0HVXDOr9tEiu87I"
                    />
                    )}
                <Flex
                    bg={isMyMessage ? MsgUserBackColor : MsgAssistBackColor}
                    color={isMyMessage ? MsgUserTextColor : MsgAssistTextColor}
                    my="1"
                    p="3"
                    // flexDirection={isMyMessage ? "row-reverse" : "row"}
                    alignItems="center"
                    justifyContent="flex-start"
                    overflowY="auto"
                    maxWidth="60%"
                    borderRadius={"10px"}
                    position="relative"
                >
                <Text 
                    flex="1"
                    mr="4"
                    overflowY="auto"
                    wordBreak='break-word'
                    textAlign='left'
                    paddingRight={isMyMessage ? "4" : "0"}
                >
                    {item.text}
                </Text>

                {!isMyMessage && (
                    <Button leftIcon={<StarIcon />} />
                )}
                {isMyMessage && (
                <Avatar 
                    name="Lyna"
                    size="md"
                    src="" 
                />
                )}
              </Flex>
            </Flex>
          )
        })}
    </Flex>
  );
};

export default Messages;
