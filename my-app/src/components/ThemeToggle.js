import React, { useState, useEffect } from "react";
import "../index.css";
import { ReactComponent as MoonIcon } from "../assets/svg/Moon.svg";
import { ReactComponent as SunIcon } from "../assets/svg/Sun.svg";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
// import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import Toggle from "./Toggle";

export default function ThemeToggle() {
    const { colorMode, toggleColorMode } = useColorMode();
    const isEnabled = colorMode === "dark" ? true : false;

    const ToggleBallColor = useColorModeValue("white", "gray")
    const ToggleBackgroundColor = useColorModeValue("gray", "white")
    const ToggleIconColor = useColorModeValue("white", "gray")

    document.documentElement.style.setProperty("--toggle-back-color", ToggleBackgroundColor)
    document.documentElement.style.setProperty("--toggle-ball-color", ToggleBallColor)
    document.documentElement.style.setProperty("--toggle-icon-color", ToggleIconColor)
return (
    <label className="toggle-wrapper" htmlFor="toggle">
    <div className={`toggle  ${isEnabled ? "enabled" : ""}`}>
        <span className="hidden">
        </span>
        <div className="icons">
        <SunIcon />
        <MoonIcon />
        </div>
        <input
        id="toggle"
        name="toggle"
        type="checkbox"
        checked={isEnabled}
        onChange={toggleColorMode}
        />

    </div>
    </label>
);
}

