import { Outlet, NavLink, useLocation } from "react-router-dom"
import React, { useEffect, useState } from "react"

import { Button, 
  Collapse,
  useColorModeValue, 
  useColorMode } from "@chakra-ui/react"


import ThemeToggle from "./ThemeToggle"
import { getCookie } from "../cookieUtils";

export default function NavBar({isVisible}) {
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = getCookie("userToken");
    if (userToken) {
      fetch("http://127.0.0.1:8000/chat/validate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
      })
        .then((response) => response.ok)
        .then((isOk) => setIsLoggedIn(isOk))
        .catch((error) => {
          console.error("Error validating user:", error);
        });
    }
  }, []);
  
  return (
      <div className="navbar"
      >
        <header>
          <Collapse in={isVisible}>
            <nav>
              <h1> 
                <NavLink to="/">OHPT</NavLink>
              </h1>
              <NavLink to="about">About</NavLink>
              <NavLink to="help">Help</NavLink>
              <NavLink to="team">Team</NavLink>
              <NavLink to="chat">Chat</NavLink>
              <ThemeToggle />
              {!isLoggedIn && (
                <NavLink to="chat/login">
                  <Button> Login </Button>
                </NavLink>
              )}
            </nav>
          </Collapse>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
  )
}

