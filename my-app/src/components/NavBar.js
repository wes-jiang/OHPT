import { Outlet, NavLink } from "react-router-dom"
import React from "react"

import { Button, useColorModeValue, useColorMode } from "@chakra-ui/react"

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
          <Button colorScheme="blue">Login</Button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

