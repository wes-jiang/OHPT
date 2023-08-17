import React, { useState, useEffect } from "react";
import {
  Button,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  MenuButton,
} from "@chakra-ui/react";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { SiAwslambda } from "react-icons/si";
import { AiFillLock } from "react-icons/ai";
import { NavLink, 
  useLoaderData, 
  Link,
  useNavigate,
} from "react-router-dom";
import { loadConversations, loadConvoMsg } from "../../pages/chat/loader";
import { fetchData } from "../../pages/chat/Chat";

function sortConversationsByTime(conversations) {
  return conversations.slice().sort((a, b) => {
    console.log(a.time_started)
    const timeA = new Date(a.time_started).getTime();
    console.log('timeA', timeA)
    const timeB = new Date(b.time_started).getTime();
    return timeB - timeA;
  });
}


const Sidebar = ({sendSidebarConvoId, sendSidebarCourseId}) => {
  const [courseId, setCourseId] = useState(1);
  const [conversationId, setConversationId] = useState(1)
  const [menuItemText, setMenuItemText] = useState(
    <HStack spacing={2}>
      <SiAwslambda />
      <span> CS61A </span>
    </HStack>);
  const [loadedData, setLoadedData] = useState(null)
  const navigate = useNavigate()

  // Color Definitions
  const SidebarColor = useColorModeValue("gray", "black");
  document.documentElement.style.setProperty("--sidebar-color", SidebarColor);

  const handleClassClick = (newCourseId, newText) => {
    setMenuItemText(newText);
    setCourseId(newCourseId);
    sendSidebarCourseId(courseId)
  };

  const createChat = ({ courseId }) => {
    const data = {
      title: "New Conversation",
      user: "1",
      course: courseId,
    }

    console.log('click on Create Chat')
    console.log('create', courseId)
    console.log('create_data', data)

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

      setConversationId(data.id)
      sendSidebarConvoId(conversationId)
      // Navigate to the new URL after creating the chat
      navigate(`/chat/conversation/${data.id}`);

    })
  
  }

  useEffect(() => {
    fetchData({ conversationId: null, courseId: courseId })
      .then((fetchData) => {
        console.log("courseData fetchData:", fetchData);
        const sortedData = sortConversationsByTime(fetchData)
        console.log("courseData DataSideBar:", sortedData);
        setLoadedData(sortedData); // No need for spread (...) here
        console.log("loadSidebar", loadedData);
        console.log("Time Started:", fetchData.time_started);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      console.log('useEffect in Sidebar')
  }, [conversationId, courseId]);


  // const convos = useLoaderData(loadConvoMsg({ courseId: courseId, conversationId: "" }));
  return (
    <div name="sidebar">
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

      <NavLink to={"/userProfileEdit"}>
        <Button>Settings</Button>
      </NavLink>

      {loadedData &&
        loadedData.map((convo) => (
          <React.Fragment key={convo.id}>
            <Link to={`/chat/conversation/${convo.id}`}>
              <Text> {convo.title} </Text>
            </Link>
          </React.Fragment>
        ))}
    </div>
  );
};

export default Sidebar;

