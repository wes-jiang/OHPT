import './App.css';
import React, {useState} from 'react'



// layouts
import RootLayout from './layout/RootLayout'
import HelpLayout from './layout/HelpLayout'
import ChatLayout from './layout/ChatLayout'

//pages
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Contact from './pages/help/Contact'
import FAQ from './pages/help/FAQ'
import Chat from './pages/chat/Chat'
import NotFound from './pages/NotFound'
import NewChat from './pages/chat/Chat'

import Sidebar from './components/chat/Sidebar';
import Messages from './components/chat/Messages';
import { loadConversations, loadMessages, loadConvoMsg } from './pages/chat/loader';


import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Routes,
  Route, 
  RouterProvider,
  useParams
} from 'react-router-dom';
import Login from './pages/login/login';
import Signup from './pages/login/signup';
import ForgotPass from './pages/login/forgotPass';
import UserProfileEdit from './pages/login/userProfileEdit';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Team />} />
        <Route path="help" element={<HelpLayout />}>
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path='chat/login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path="forgotpass" element={<ForgotPass />} />
        <Route path="userProfileEdit" element={<UserProfileEdit />} />

        <Route path="*" element={<NotFound />} />

      </Route>

      <Route path="/" element={<ChatLayout />}>
        <Route index path="chat" element={<NewChat />} />
        <Route path='chat/conversation/:conversationId' element={<NewChat />} />
      </Route>
    </Route>

  )
)


function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
  
    </div>
  
  )
}

export default App;

