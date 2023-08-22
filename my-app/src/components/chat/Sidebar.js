import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  MenuButton,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, ChevronDownIcon, SettingsIcon } from "@chakra-ui/icons";
import { SiAwslambda } from "react-icons/si";
import { AiFillLock } from "react-icons/ai";
import { NavLink, 
  useLoaderData, 
  Link,
  useNavigate,
} from "react-router-dom";
import { fetchData, fetchUserId } from "../../pages/chat/Chat";
import { loadUserId } from "../../pages/chat/loader";
import { deleteCookie, getCookie } from "../../cookieUtils";



const Sidebar = ({convoId, sendSidebarCourseId}) => {
  const [courseId, setCourseId] = useState(1);
  // const [conversationId, setConversationId] = useState(convoId)
  const [menuItemText, setMenuItemText] = useState(
    <HStack spacing={2}>
      <SiAwslambda />
      <span> CS61A </span>
    </HStack>);
  const [loadedData, setLoadedData] = useState(null)
  const navigate = useNavigate()
  let todayLabelDisplayed = false
  let yesterLabelDisplayed = false
  let sevenLabel = false
  let monthLabel = false
  let userId
  const userToken = getCookie('userToken')
  const [name, setName] = useState([])
  const toast = useToast()


  // Color Definitions
  const SidebarColor = useColorModeValue("gray", "black");
  document.documentElement.style.setProperty("--sidebar-color", SidebarColor);

  const handleClassClick = (newCourseId, newText) => {
    setMenuItemText(newText);
    setCourseId(newCourseId);
    sendSidebarCourseId(newCourseId);
  };

  const createChat = ({ courseId }) => {
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
        userId = data; // Here, data should be the user ID
        console.log('User ID hello:', userId);
        console.log('user Id type', typeof userId)

        const request = {
          title: "New Conversation",
          user: userId,
          course: courseId,
        }
  
        console.log('click on Create Chat')
        console.log('create', courseId)
        console.log('create_data', data)
  
        fetch(`http://127.0.0.1:8000/chat/course/${courseId}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${userToken}`
          },
          body: JSON.stringify(request)
        }).then((response) => response.json())
        .then((fdata) => {
          console.log("Chat Data:", fdata);
          // Now you can access the properties of the data object
          console.log("Chat ID:", fdata.id);
          console.log("User:", fdata.user);
          console.log("Course:", fdata.course);
          console.log("Time Started:", fdata.time_started);
          console.log("Title:", fdata.title);
  
          // Navigate to the new URL after creating the chat
          navigate(`/chat/conversation/${fdata.id}`);
  
        })
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }

  const fetchNames = () => {
    fetch(`http://127.0.0.1:8000/chat/get_user_names`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}` // Replace with your actual user token
    }
    }).then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
    .then(data => {
      setName([data[0], data[1]])
      console.log('fetching names', name)
      console.log('fetchNames', data)
    })
  }

  const logout = () => {
    fetch(`http://127.0.0.1:8000/chat/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${userToken}`
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    })
  }


  useEffect(() => {
    console.log('check courseId', courseId)
    fetchData({ conversationId: null, courseId: courseId })
      .then((fetchData) => {
        console.log("courseData fetchData:", fetchData);
        setLoadedData(fetchData);

      })
      .catch((error) => {
        console.error("Error:", error);
      });

      console.log('useEffect in Sidebar')
  }, [convoId, courseId]);

  useEffect(() => {
    fetchNames()
  }, [])



  // const convos = useLoaderData(loadConvoMsg({ courseId: courseId, conversationId: "" }));
  return (
    <Flex className='sidebar-container'>
      
      <Flex className='sidebar'>

        <Box className="sidebar-buttons">
          <Button
            leftIcon={<AddIcon />}
            colorScheme="white"
            size="md"
            padding="3"
            variant="outline"
            onClick={() => createChat({ courseId: courseId })}
            style={{ marginBottom: "10px" }}
          >
            Create
          </Button>

            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
                transition="all 0.2s"
                flex={1}
              >
                {menuItemText}
              </MenuButton>
              <MenuList>
                <MenuItem
                  value="CS61A"
                  onClick={() =>
                    handleClassClick(1, (
                      <HStack spacing={2}>
                        <SiAwslambda />
                        <span> CS61A </span>
                      </HStack>
                    ))
                  }
                >
                  <HStack spacing={2}>
                    <SiAwslambda />
                    <span> CS61A </span>
                  </HStack>
                </MenuItem>
                <MenuItem
                  value="CS161"
                  onClick={() =>
                    handleClassClick(2, (
                      <HStack spacing={2}>
                        <AiFillLock />
                        <span> CS161 </span>
                      </HStack>
                    ))
                  }
                >
                  <HStack spacing={2}>
                    <AiFillLock />
                    <span> CS161 </span>
                  </HStack>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>

        <Box className="convo-list">
          {loadedData &&
            loadedData.today_conversations.map((convo) => (
              <div key={convo.id}>
                {!todayLabelDisplayed && <Text className="sidebar-dates">Today</Text>}
                {todayLabelDisplayed = true}
                <React.Fragment key={convo.id}>
                  <Link to={`/chat/conversation/${convo.id}`}>
                    <Text>{convo.title}</Text>
                  </Link>
                </React.Fragment>
              </div>
            ))}

          {loadedData &&
            loadedData.yesterday_conversations.map((convo) => (
              <div key={convo.id}>
                {!yesterLabelDisplayed && <Text className="sidebar-dates">Yesterday</Text>}
                {yesterLabelDisplayed = true}
                <React.Fragment key={convo.id}>
                  <Link to={`/chat/conversation/${convo.id}`}>
                    <Text>{convo.title}</Text>
                  </Link>
                </React.Fragment>
              </div>
            ))}

          {loadedData &&
            loadedData.past_seven_days_conversations.map((convo) => (
              <div key={convo.id}>
                {!sevenLabel && <Text className="sidebar-dates">Past Seven Days</Text>}
                {sevenLabel = true}
                <React.Fragment key={convo.id}>
                  <Link to={`/chat/conversation/${convo.id}`}>
                    <Text>{convo.title}</Text>
                  </Link>
                </React.Fragment>
              </div>
            ))}

          {loadedData &&
            loadedData.past_thirty_days_conversations.map((convo) => (
              <div key={convo.id}>
                {!monthLabel && <Text className="sidebar-dates">Past 30 Days</Text>}
                {monthLabel = true}
                <React.Fragment key={convo.id}>
                  <Link to={`/chat/conversation/${convo.id}`}>
                    <Text>{convo.title}</Text>
                  </Link>
                </React.Fragment>
              </div>
          ))}
        </Box>

        <div className="sidebar-settings">
        <Menu>
          <MenuButton
            as={Button}
            _hover={{ bg: "gray.400" }}
            _expanded={{ bg: "blue.400" }}
            _focus={{ boxShadow: "outline" }}
            transition="all 0.2s"
            flex={1}
          >
            <Text>
            {name[0]} {name[1]} <SettingsIcon />
            </Text>
          </MenuButton>
          <MenuList>
            <MenuItem
              value='Settings'
              onClick={() => {
                navigate('/userProfileEdit')
              }
                }
            >
              Settings
            </MenuItem>
            <MenuItem
              value='Logout'
              onClick={() =>
                {
                  logout()
                  deleteCookie('userToken')
                  navigate('/')
                  toast({
                    title: 'Successful Logout',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })

                }
              }
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
        </div>


        </Flex>
      </Flex>
  )
};

export default Sidebar;

