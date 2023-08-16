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
import { useLoaderData } from "react-router-dom";

const Messages = ({messages}) => {
    const chatContainerRef = useRef(null)

    /*
    useEffect(() => {
    // Scroll to the bottom
        chatContainerRef.current.scrollTop = chatContainerRef.current.;
    }, [messages]); // Include messages as a dependency to trigger the effect when a new message is added
    */

  //Colors for the User
  const MsgUserBackColor = useColorModeValue("white", "dark-gray")
  const MsgUserTextColor = useColorModeValue("black", "white")

  //Colors for OHPT
  const MsgAssistBackColor = useColorModeValue("gray.100", "gray.800")
  const MsgAssistTextColor = useColorModeValue("black", "white")

  const conversationId = 1
  const loadMessages = useLoaderData(msgLoader(conversationId))
  console.log(loadMessages)

  const AllMessages = [...loadMessages, ...messages]
  return (
    <Flex 
        w="100%" 
        h="100%" 
        overflowY="auto"
        flexDirection="column" 
        p="2"
        // maxHeight= '100%'
        // justifyContent="center" 
        // alignItems="center"
        >
      {AllMessages.map(msg => {
        const isMyMessage = msg.sender === "user"
          return (
            <Flex 
                // key={index} 
                w="100%" 
                flexDirection={isMyMessage ? "row-reverse" : "row"}
                // alignItems= "center"
                // justifyContent={"flex-start"}
                my="1"
                p="3"
                borderRadius={"10px"}
                // position="relative"
                // ref={chatContainerRef} // Attach the ref to the container
                >
                {!isMyMessage && (
                    <Avatar
                        name="OHPT"
                        margin="2"
                        size="md"
                        src="https://media.licdn.com/dms/image/C5603AQE8fCwomwCjhQ/profile-displayphoto-shrink_800_800/0/1662494019775?e=2147483647&v=beta&t=HqZoo89s5GDJlxpiPt1_pMYtElbK0HVXDOr9tEiu87I"
                    />
                    )}
                
                {isMyMessage && (
                <Avatar 
                    name="Lyna"
                    size="md"
                    src="" 
                />
                )}
                <Flex>
                    <Text 
                        bg={isMyMessage ? MsgUserBackColor : MsgAssistBackColor}
                        color={isMyMessage ? MsgUserTextColor : MsgAssistTextColor}
                        flex="1"
                        p="2"
                        mr="4"
                        overflowY="auto"
                        wordBreak='break-word'
                        textAlign={isMyMessage ? 'right' : 'left'}
                        paddingRight={isMyMessage ? "4" : "4"}
                    >
                        {msg.content}
                    </Text>

                    {!isMyMessage && (
                        <Button leftIcon={<StarIcon />} />
                    )}
                </Flex>
              </Flex>
          )
        })}
    </Flex>
  );
};

export default Messages

export const msgLoader = (conversationId) => async () => {
    console.log('hi')
    const res = await fetch(`http://127.0.0.1:8000/chat/conversation/${conversationId}`)
    // const res = await fetch(`http://127.0.0.1:8000/chat/conversation/1`)
    const hi = res.json()
    console.log("reading")
    console.log(hi)
    return hi
  }