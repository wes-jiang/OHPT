import { Outlet, NavLink, useLocation } from "react-router-dom"
import React from "react"

import { Button, 
  Collapse,
  useColorModeValue, 
  useColorMode } from "@chakra-ui/react"


import ThemeToggle from "./ThemeToggle"

export default function NavBar() {
  const { colorMode } = useColorMode();

  //Color Definitions
  const linkColor = useColorModeValue("black", "white")
  const hoverColor = useColorModeValue("white", "black")
  const hoverBackColor = useColorModeValue("black", "white");
  const activeColor = useColorModeValue("blue.700", "blue.100");

  document.documentElement.style.setProperty("--link-color", linkColor);
  document.documentElement.style.setProperty("--hover-color", hoverColor);
  document.documentElement.style.setProperty("--hover-back-color", hoverBackColor);
  document.documentElement.style.setProperty("--active-color", activeColor);

  const location = useLocation()
  const visiblePaths = ['/', '/about', '/help', '/team', '/chat', '/login']
  const checkNavPath = visiblePaths.includes(location.pathname)
  return (
    <div className="navbar">
      <header>
        <nav>
          <h1> 
            <NavLink to="/">OHPT</NavLink>
          </h1>
          <NavLink to="about">About</NavLink>
          <NavLink to="help">Help</NavLink>
          <NavLink to="team">Team</NavLink>
          <NavLink to="chat">Chat</NavLink>
          <ThemeToggle />
          <NavLink to='login'>
            <Button> Login </Button>
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

