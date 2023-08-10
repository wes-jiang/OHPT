import { Outlet, NavLink } from "react-router-dom"
import { Button } from "@chakra-ui/react"

import ThemeToggle from "./ThemeToggle"

export default function NavBar() {
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

