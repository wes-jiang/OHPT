import logo from './logo.svg';
import SendBtn from './components/SendBtn';
import './App.css';
import NavBar from './components/NavBar';
import React from 'react';
import { ReactDOM } from 'react';


// layouts and pages
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import FAQ from './pages/FAQ';

import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Team />} />
        <Route path="faq" element={<FAQ />} />
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
