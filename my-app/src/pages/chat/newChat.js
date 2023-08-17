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
const [conversationId, setConversationId] = useState(1)
// const {conversationId: conversationParam} = useParams()
const [courseId, setCourseId] = useState(1)
const location = useLocation()
const navigate = useNavigate()
// const conversationId = parseInt(conversationParam)

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
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
            }).then((response) => response.json())
            .then((data) => {
            console.log("Chat Data:", data);
            // Now you can access the properties of the data object
            console.log("Chat ID:", data.id);
            console.log("User:", data.user);
            console.log("Course:", data.course);
            console.log("Time Started:", data.time_started);
            console.log("Title:", data.title);

            // setConversationId(data.id)
            console.log('conversationIDInCreate', data.id)
            // Navigate to the new URL after creating the chat

    })

    const newMsg = {
        sender: "user", 
        content: inputMessage, 
        conversation: conversationId
        }
    
        setIsLoading(true)
        setIsRegenerating(true)
    
    fetch(`http://127.0.0.1:8000/chat/conversation/${conversationId}`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
        }).then(() => {
            setMessages((old) => [...old, {sender: "user", content: inputMessage, conversation: conversationId}])
            setInputMessage("")

    })

    setTimeout(() => {
    setMessages((old) => [...old, { sender: "OHPT", content: "reply", conversation: '1' }]);
    setIsLoading(false)
    setIsRegenerating(false)
    }, 1000);

    navigate(`/chat/conversation/${conversationId}`);

    }

    const data = {
        sender: "user", 
        content: inputMessage, 
        conversation: conversationId
        }
    
        setIsLoading(true)
        setIsRegenerating(true)
    console.log('inputting', conversationId)
    console.log('inputMessage', inputMessage)
    fetch(`http://127.0.0.1:8000/chat/conversation/${conversationId}`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
        }).then(() => {
        setMessages((old) => [...old, {sender: "user", content: inputMessage, conversation: conversationId}])
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


const SidebarColor = useColorModeValue("gray", "black")
const TextColor = useColorModeValue('black', 'white')

const handleSidebarCourse = ({sidebarCourseId}) => {
    setCourseId(sidebarCourseId)
    
}

const handleSidebarConvo = ({sidebarConvoId}) => {
    setCourseId(sidebarConvoId)
    
}
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
        <Sidebar
        sendSidebarCourseId={handleSidebarCourse}
        sendSidebarConvoId={handleSidebarConvo}
        />
        
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
    const conversationData = await loadConvoMsg({ conversationId: conversationId, courseId: courseId });
    console.log("Conversation Data:", conversationData);

    return conversationData //map of data
    } catch (error) {
    console.error("Error loading conversation data:", error);
    }
}
  
  