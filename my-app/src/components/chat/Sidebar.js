import React, {useState} from "react"
import { Grid, 
  GridItem, 
  HStack,
  Menu,
  MenuItem,
  MenuList,
  Textarea, 
  Text,
  Button,
  useColorMode,
  useColorModeValue,
  MenuButton,
} from "@chakra-ui/react"
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {SiAwslambda} from 'react-icons/si'
import {AiFillLock} from 'react-icons/ai'
import { NavLink, useLoaderData, Link } from "react-router-dom"



const Sidebar = () => {
  const { colorMode } = useColorMode();

  //Color Definitions
  const SidebarColor = useColorModeValue("gray", "black")

  document.documentElement.style.setProperty("--sidebar-color", SidebarColor)

  let [value, setValue] = useState('')
  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  const createChat = () => {

  }


  const [menuItemText, setMenuItemText] = useState('Classes')

  const convos = useLoaderData()

  // const [sidebarItems, setSidebarItems] = useState([])
  // const handleAddItem = (newItem) => {
  //   setSidebarItems([...sidebarItems, newItem])
  // } 
  return (
    <div name="sidebar">
      <Button
        leftIcon={<AddIcon />}
        colorScheme='white'
        size="md"
        padding="3"
        variant='outline'
        onClick={createChat}
        style={{marginBottom: '10px'}}
      >
        Create

      </Button>


      <Menu>
        <MenuButton 
          as={Button} 
          rightIcon={<ChevronDownIcon />}
          _hover={{bg: 'gray.400'}}
          _expanded={{bg:'blue.400'}}
          _focus= {{boxShadow: 'outline'}}
          transition='all 0.2s'>
          {menuItemText}
        </MenuButton>
        <MenuList>
          <MenuItem 
            value="CS61A"
            onClick= {() => setMenuItemText(prevText => 
              <HStack spacing={2}>
                <SiAwslambda />
                <span> CS61A </span>
              </HStack>)}
            >
              <HStack spacing={2}>
                <SiAwslambda />
                <span> CS61A </span>
              </HStack>
            </MenuItem>
          <MenuItem 
            value="CS161"
            onClick= {() => setMenuItemText(prevText => 
              <HStack spacing={2}>
                <AiFillLock />
                <span> CS161 </span>
              </HStack>)}
          >
            <HStack spacing={2}>
              <AiFillLock />
              <span> CS161 </span>
            </HStack>
            </MenuItem>
        </MenuList>
      </Menu>
      
      <NavLink to={"/userProfileEdit"}>
        <Button>
          Settings
        </Button>
      </NavLink>

      {convos.map(convo => (
        <Link to={`/chat/conversation/${convo.id}`} key={convo.id}>
          <Text> {convo.title} </Text>
        </Link>
      ))}

    </div>
  )
}

export default Sidebar;

export const convoLoader = async () => {
  // console.log('hi')
  const res = await fetch('http://127.0.0.1:8000/chat/course/1')
  // console.log("hi")
  return res.json()
}