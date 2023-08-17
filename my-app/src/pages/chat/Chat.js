import {
  Button,
  Flex,
  Grid, 
  GridItem,
  Text,
  Textarea,
  useColorModeValue,
  } from '@chakra-ui/react'


import { useLoaderData, useParams, useLocation } from "react-router-dom"

import {FaStop} from 'react-icons/fa'

import {RepeatIcon} from "@chakra-ui/icons"

import ResizeTextarea from "react-textarea-autosize"
import React, { forwardRef, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader"
import Messages from '../../components/chat/Messages'
import Sidebar from '../../components/chat/Sidebar';
import { loadConvoMsg } from './loader'


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
      transition="height none"
      placeholder='Your Question Here'
  
    />
  );
});

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [conversationId, setConversationId] = useState([])
  const location = useLocation()

  // const { pageId } = useParams();
  // const loaderFunction = loadConvoMsg({ courseId: 1, conversationId: pageId });
  // const loadedData = useLoaderData(loaderFunction);

  // console.log('Loaded Data:', loadedData);

  // const load = useLoaderData()
  // console.log(load)
  console.log(messages)
  console.log(Array.isArray(messages))

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }

    
    const dataMsg = inputMessage
    const data = {
      sender: "user", 
      content: dataMsg, 
      conversation: '1'
    }

    setIsLoading(true)
    setIsRegenerating(true)

    fetch(`http://127.0.0.1:8000/chat/conversation/${conversationId}`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }).then(() => {
      console.log('data added')
      setMessages((old) => [...old, {sender: "user", content: inputMessage, conversation: '1'}])
      // console.log()
      setInputMessage("")

    })

    setTimeout(() => {
      setMessages((old) => [...old, { sender: "OHPT", content: "reply", conversation: '1' }]);
      setIsLoading(false)
      setIsRegenerating(false)
    }, 1000);
  }

  const handleRegenerate = () => {
    setIsRegenerating(true)

    setTimeout(() => {
      setIsRegenerating(false)
  }, 1000)
  }

  fetchData({conversationId: 1, courseId: null}).then((conversationData) => {
    console.log("Conversation Data1:", conversationData);
    const hello = conversationData
    
    // Now you can use conversationData outside the function scope
  })
  .catch((error) => {
    // Handle the error
    console.error("Error:", error);
  });

  const SidebarColor = useColorModeValue("gray", "black")
  const TextColor = useColorModeValue('black', 'white')

  return (
    <Grid
      templateColumns="1fr 7fr" 
      gap={1}
      style={{height: '100vh', maxHeight:'100vh'}}
    >
      {/* Sidebar */}
      <GridItem 
          as="aside"
          colSpan={1}
          style={{ backgroundColor: SidebarColor,
          // overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          // position: 'fixed',
        }}
          p="30px">

        {/* Sidebar content */}
        <Sidebar />

      </GridItem>

      {/* Chatbox */}
      <GridItem>
        <Flex 
          className="chatbox-container"
          flexDirection={"column"}
          height="100%"
          // overflowY={"scroll"}
        >
          <Flex 
            className="messages-container"
            style = {{
              flexGrow:1,
              // overflowY:"scroll",
              maxHeight:"100%",
              padding:"10px",
              overflowY: 'auto',
            }}
            >
            <Messages messages={messages}/>
          </Flex>


          <Flex 
            className="input-buttons-container"
            alignItems="center"
            justifyContent="space-between"
            padding="10px" // Add your spacing here
            width="100%"
            zIndex="1"
            style = {{position: 'sticky', bottom: '0'}}
            >
            <Flex w="100%" mt="5" flexDirection={"column"} >
              <Flex
                className='RegenerateButton'
                ml='auto'
                // justifyContent={'center'}
                mb={2}
                >
                <Button 
                  // disabled={isRegenerating}
                  // isLoadingText='Regenerating'
                  colorScheme='teal'
                  leftIcon={isRegenerating ? <FaStop /> : <RepeatIcon />}
                  variant='outline'
                  onClick={handleRegenerate}

                >
                  {isRegenerating ? 'Stop': 'Regenerate'}    
                      
                </Button>

              </Flex>

              <Flex>
              <CustomInput 
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isLoading) {
                    handleSendMessage();
                    e.preventDefault();
                  }
                }}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                color= {TextColor}
              />
              <Button
                bg="black"
                color="white"
                variant="outline"
                borderRadius="none"
                // _hover={{
                //   bg: "white",
                //   color: "black",
                //   border: "1px solid black",
                // }}
                isLoading={isLoading}
                disabled={inputMessage.trim().length <= 0 || isLoading}
                onClick={handleSendMessage}
              >
                Send
              </Button>


              </Flex>

            </Flex>
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
          
        
    )
  }

  export default Chat

  export async function fetchData({conversationId, courseId}) {
    try {
      console.log('conversationlog', conversationId)
      const fetchData = null
      if (conversationId) {
        const fetchData = await loadConvoMsg({ conversationId: conversationId, courseId: courseId });
        return fetchData

      }
      else if (courseId) {
        const fetchData = await loadConvoMsg({ conversationId: conversationId, courseId: courseId })
        return fetchData
      }
      else {
        return fetchData
      }
    } catch (error) {
      console.error("Error loading conversation data:", error);
    }
  }

