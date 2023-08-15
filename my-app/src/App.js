import './App.css';
import React, {useState} from 'react'



// layouts
import RootLayout from './layout/RootLayout'
import HelpLayout from './layout/HelpLayout'

//pages
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Contact from './pages/help/Contact'
import FAQ from './pages/help/FAQ'
import Chat, {chatLoader} from './pages/chat/Chat'
import NotFound from './pages/NotFound'


import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom';
import Login from './pages/login/login';
import Signup from './pages/login/signup';
import ForgotPass from './pages/login/forgotPass';



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
        <Route path="chat" element={<Chat />} loader={chatLoader} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path="forgotpass" element={<ForgotPass />} />
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

