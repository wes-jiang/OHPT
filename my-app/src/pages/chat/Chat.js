import {Grid, GridItem} from '@chakra-ui/react'
import Sidebar from '../../components/Sidebar'
import ChatInput from '../../components/chat/ChatInput'
export default function Chat() {
    return (
      <div className="chat">
        <Sidebar />
        <ChatInput />
        
          
        
      </div>
    )
  }