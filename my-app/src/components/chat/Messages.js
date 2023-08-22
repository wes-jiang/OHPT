import React, { useEffect, useState , useRef } from "react"
import { Flex, 
    Text, 
    Avatar, 
    Box,
    Button,
    Container,
    useColorMode,
    useColorModeValue,
    } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons";
import BeatLoader from "react-spinners/BeatLoader"
import { useLoaderData, useParams } from "react-router-dom";

import { loadConvoMsg, loadMessages } from "../../pages/chat/loader";

import { fetchData } from "../../pages/chat/Chat";
import StarButton from "./StarButton";
import SourceDrawer from "./SourceDrawer";

const Messages = ({messages}) => {
  const chatContainerRef = useRef(null)
  const [loadedData, setLoadedData] = useState([])
  const { conversationId } = useParams()
    
  console.log('messages33', conversationId)
  useEffect(() => {
    if (typeof conversationId !== 'undefined') {
      fetchData({ conversationId: conversationId, courseId: null })
        .then((fetchData) => {
          console.log("Conversation Data:", fetchData);
          setLoadedData(fetchData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
      
    }, [conversationId]);


  //Colors for the User
  const MsgUserBackColor = useColorModeValue("white", "dark-gray")
  const MsgUserTextColor = useColorModeValue("black", "white")

  //Colors for OHPT
  const MsgAssistBackColor = useColorModeValue("gray.100", "gray.800")
  const MsgAssistTextColor = useColorModeValue("black", "white")


  console.log('messagesConversation', conversationId)

  console.log('loadedData', loadedData)
  const AllMessages = [...(loadedData ? loadedData : []), ...messages]
  console.log('allmsg', AllMessages)

  return (
    <Flex 
        // w="100%" 
        // h="100%" 
        overflowY="auto"
        flexDirection="column" 
        // p="2"
        // maxHeight= '100%'
        justifyContent="center" 
        // alignItems="center"
        >
      {AllMessages.map(msg => {
         if (!loadedData) {
          return <BeatLoader color="blue" loading={true} />;
        }
  
        const isMyMessage = msg.sender === "user"
          return (
            <Flex 
                // key={index} 
                w="100%" 
                flexDirection={isMyMessage ? "row-reverse" : "row"}
                // alignItems= "center"
                // justifyContent={"center"}
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
                        borderRadius={2}
                        size="md"
                        src="https://media.licdn.com/dms/image/C5603AQE8fCwomwCjhQ/profile-displayphoto-shrink_800_800/0/1662494019775?e=2147483647&v=beta&t=HqZoo89s5GDJlxpiPt1_pMYtElbK0HVXDOr9tEiu87I"
                    />
                    )}
                
                {isMyMessage && (
                <Avatar 
                    name="Lyna"
                    size="md"
                    borderRadius={2}
                    src="" 
                />
                )}
                <Box width="50%">
                <Flex className="Messages-star">
                  <Flex flexDirection={'column'} alignItems={'flex-end'}>
                    <Text 
                        bg={isMyMessage ? MsgUserBackColor : MsgAssistBackColor}
                        color={isMyMessage ? MsgUserTextColor : MsgAssistTextColor}
                        flex="1"
                        p="2"
                        mr="4"
                        overflowY="auto"
                        wordBreak='break-word'
                        // textAlign={isMyMessage ? 'right' : 'left'}
                        paddingRight={isMyMessage ? "4" : "4"}
                        key={msg.id}
                    >
                        {msg.content}
                    </Text>

                    <SourceDrawer 
                      sources={msg.sources}
                    />
                  </Flex>
                    
                    {!isMyMessage && (
                        <StarButton 
                          favorite={msg.starred} 
                          messageId={msg.id}
                        />
                    )}
                </Flex>
                </Box>                
              </Flex>
              

              
          )
        })}
    </Flex>
  );
};

export default Messages

