import {
    Button,
    Flex,
    Grid, 
    GridItem,
    Text,
    Textarea,
    useColorModeValue,
    } from '@chakra-ui/react'
  
import {FaStop} from 'react-icons/fa'

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {RepeatIcon} from "@chakra-ui/icons"

import ResizeTextarea from "react-textarea-autosize"
import React, { forwardRef, useEffect, useState } from "react"
import BeatLoader from "react-spinners/BeatLoader"
import Messages from '../../components/chat/Messages'
import Sidebar from '../../components/chat/Sidebar';
import { loadConvoMsg } from './loader'
import { getCookie } from '../../cookieUtils'

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

const NewChat = () => {
const [messages, setMessages] = useState([]);
const [inputMessage, setInputMessage] = useState('')
const [isLoading, setIsLoading] = useState(false)
const [isRegenerating, setIsRegenerating] = useState(false)
// const [conversationId, setConversationId] = useState(1)
const {conversationId: conversationParam} = useParams()
const [courseId, setCourseId] = useState(1)
const location = useLocation()
const navigate = useNavigate()
const conversationId = parseInt(conversationParam)
const userToken = getCookie('userToken')

useEffect(() => {
    setMessages([])
    console.log('changed conversationId')
}, [conversationId])

const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
    return;
    }

    //check if current location is /chat then create a new chat
    if (location.pathname === '/chat') {
        const data = {
            title: "Created by Pressing new",
            user: "1",
            course: courseId,
          }

        console.log("entered the create new by sending message")
        fetch(`http://127.0.0.1:8000/chat/course/${courseId}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            Authorization: `Token ${userToken}`,
            body: JSON.stringify(data),
          })
            .then(response => response.json())
            .then(data => {
              // ... your existing code ...
      
              const newMsg = {
                sender: "user",
                content: inputMessage,
                conversation: data.id,
              };
              const dataId = data.id;
      
              setIsLoading(true);
              setIsRegenerating(true);

              console.log('dataIdNewChat', dataId)
      
              fetch(`http://127.0.0.1:8000/chat/conversation/${data.id}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                Authorization: `Token ${userToken}`,
                body: JSON.stringify(newMsg),
              })
                .then(() => {
                  setMessages(old => [...old, { sender: "user", content: inputMessage, conversation: dataId }]);
                  setInputMessage("");
                })
                .then(() => {
                  setTimeout(() => {
                    setMessages(old => [...old, { sender: "OHPT", content: "reply", conversation: dataId }]);
                    setIsLoading(false);
                    setIsRegenerating(false);
      
                    // This part will execute after the new chat creation and message sending
                    navigate(`/chat/conversation/${dataId}`);
                  }, 1000);
                });
            });
        } else {
          // Existing chat message sending code
          const data = {
            sender: "user",
            content: inputMessage,
            conversation: conversationId,
          };
      
          setIsLoading(true);
          setIsRegenerating(true);
      
          fetch(`http://127.0.0.1:8000/chat/conversation/${conversationId}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            Authorization: `Token ${userToken}`,
            body: JSON.stringify(data),
          })
            .then(() => {
              setMessages(old => [...old, { sender: "user", content: inputMessage, conversation: conversationId }]);
              setInputMessage("");
            })
            .then(() => {
              setTimeout(() => {
                setMessages(old => [...old, { sender: "OHPT", content: "reply", conversation: conversationId }]);
                setIsLoading(false);
                setIsRegenerating(false);
              }, 1000);
            });
        }
      };      

    
const handleRegenerate = () => {
    setIsRegenerating(true)

    setTimeout(() => {
    setIsRegenerating(false)
}, 1000)
}

const SidebarColor = useColorModeValue("gray", "black")
const TextColor = useColorModeValue('black', 'white')

const handleSidebarCourse = (sidebarCourseId) => {
    setCourseId(sidebarCourseId)
    
}

// const handleSidebarConvo = ({sidebarConvoId}) => {
//     setConvoId(sidebarConvoId)
    
// }
return (
    <Grid
    templateColumns="1fr 4fr" 
    gap={1}
    style={{height: '100vh', maxHeight:'100vh', position: 'sticky', top: 0,
        zIndex: 1,}}
    >
    {/* Sidebar */}
    <GridItem 
        as="aside"
        colSpan={1}
        style={{ backgroundColor: SidebarColor,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        // position: 'fixed',
        }}
        p="30px">

        {console.log('newChatConversationId', conversationId)}
        {/* Sidebar content */}
        <Sidebar
        sendSidebarCourseId={handleSidebarCourse}
        convoId={conversationId}
        />
        
    </GridItem>

    {/* Chatbox */}
    <GridItem>
        <Flex 
        className="chatbox-container"
        flexDirection={"column"}
        height="100%"
        overflowY='auto'
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
            {console.log("newChat", conversationId)}
            <Messages 
                messages={messages}
            />
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

export default NewChat

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


  
  