import logo from './logo.svg';
import SendBtn from './components/SendBtn'
import './App.css';
import NavBar from './components/NavBar'
import React, {useState} from 'react'
import { Grid, GridItem } from '@chakra-ui/react'


// layouts
import RootLayout from './layout/RootLayout'
import HelpLayout from './layout/HelpLayout'

//pages
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Contact from './pages/help/Contact'
import FAQ from './pages/help/FAQ'
import Chat from './pages/chat/Chat'
import NotFound from './pages/NotFound'


//components
import ThemeToggle from './components/ThemeToggle';

import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom';
import { chakra } from '@chakra-ui/react';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Team />} />
        <Route path="help" element={<HelpLayout />}>
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="chat" element={<Chat />} />

        <Route path="*" element={<NotFound />} />
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

