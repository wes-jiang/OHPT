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
import { loadConvoMsg, loadUserId } from './loader'
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
    variant={'filled'}

    />
);
});

const NewChat = () => {
const [messages, setMessages] = useState([]);
const [inputMessage, setInputMessage] = useState('')
const [isLoading, setIsLoading] = useState(false)
const [isRegenerating, setIsRegenerating] = useState(false)
const {conversationId: conversationParam} = useParams()
const [courseId, setCourseId] = useState(1)
const location = useLocation()
const navigate = useNavigate()
const conversationId = parseInt(conversationParam)
const userToken = getCookie('userToken')
let userId

useEffect(() => {
    setMessages([])
    console.log('changed conversationId')
}, [conversationId])

const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
    return;
    }

    //check if current location is /chat then create a new chat

    console.log('location pathname', location.pathname)
    if (location.pathname === '/chat') {
      const userToken = getCookie('userToken')
      fetch('http://127.0.0.1:8000/chat/get_user_id', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}` // Replace with your actual user token
      }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
        userId = data
        const request = {
          title: "Created by Pressing new",
          user: userId, //must be user's id
          course: courseId,
        }

        console.log("entered the create new by sending message")
      fetch(`http://127.0.0.1:8000/chat/course/${courseId}`, {
          method: 'POST',
          headers: { 
            'Content-Type': "application/json",
            'Authorization': `Bearer ${userToken}` 
          },
          body: JSON.stringify(request),
        })
          .then(response => response.json())
          .then(data => {
    
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

      })
      
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
  <div className="grid-wrapper">
    <Grid
    templateColumns="1fr 4fr" 
    gap={1}
    style={{height: '100vh', 
      maxHeight:'100vh',
      overflowY: 'auto',
        zIndex: 1,}}
    >
    {/* Sidebar */}
    <GridItem 
      className='sidebar-grid'
      as="aside"
      colSpan={1}
      backgroundColor={SidebarColor}
      p="30px">

      {console.log('newChatConversationId', conversationId)}
      {/* Sidebar content */}
      <Flex className='sidebar-flex'>
        <Sidebar
        sendSidebarCourseId={handleSidebarCourse}
        convoId={conversationId}
        style={{position: 'sticky'}}
          />
      </Flex>
        
    </GridItem>

    {/* Chatbox */}
    <GridItem>
        <Flex className="chatbox-container">
          <Flex className="messages-container">
              <Messages 
                  messages={messages}
              />
          </Flex>


        <Flex className="input-buttons-container">
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
    </div>
        
        
    )
}

export default NewChat

export async function fetchData({conversationId, courseId}) {

  console.log(`fetchdata: convo ${conversationId} & course ${courseId}`)
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

export async function fetchUserId() {
  try {
    const userId = await loadUserId()
    return userId
  } catch (error) {
    console.error("error in loading user id")
  }
}


  
  