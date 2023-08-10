import React, {useState} from "react"
import { Grid, 
  GridItem, 
  Textarea, 
  Text,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { AddIcon } from '@chakra-ui/icons'
import { NavLink } from "react-router-dom"


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
  // const [sidebarItems, setSidebarItems] = useState([])
  // const handleAddItem = (newItem) => {
  //   setSidebarItems([...sidebarItems, newItem])
  // } 
  return (
    <div name="sidebar">
      <Grid templateColumns="repeat(8,1fr)" bg="gray.50">
                <GridItem 
                as="aside"
                colSpan="2"
                style={{ backgroundColor: SidebarColor }}
                minHeight="100vh"
                p="30px">
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme='white'
                    size="md"
                    padding="3"
                    variant='outline'>
                      Create

                  </Button>
                  <Text>Topic 1</Text>
                  <Text>Topic 2</Text>
                </GridItem>

                {/* <GridItem>
                  <Textarea 
                    value={value}
                    onChange={handleInputChange}
                    placeholder=''
                    size='sm'>
                  </Textarea>
                </GridItem> */}
            </Grid>
            
            {/* <input
              type="text"
              placeholder="Enter new item"
              onChange={(e) => handleAddItem(e.target.value)}
            /> */}
    </div>
  )
}

export default Sidebar;