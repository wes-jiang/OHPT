import NavBar from "../components/NavBar"

import React, {useState, useEffect} from 'react'

export default function ChatLayout() {
    const [prevScrollY, setPrevScrollY] = useState(0);
    const [pastHeight, setPastHeight] = useState(false);
    const [showNavBar, setShowNavBar] = useState(true)
  
    const useScroll = () => {
      const [scrollY, setScrollY] = useState(0);
  
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
  
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
  
      return scrollY;
    };
  
    const scrollY = useScroll();
    console.log('scroll',scrollY)
    console.log('prev', prevScrollY)
    const isScrollingUp = scrollY < prevScrollY;
    console.log('isScrollingUp', isScrollingUp)
  
    useEffect(() => {
      setPrevScrollY(scrollY); // Update the previous scroll position
      if (scrollY > 25) {
        setPastHeight(true)
      }
      setShowNavBar(!pastHeight || isScrollingUp)
    }, [scrollY]);

    


  return (
    <div className="chat-layout">
      <NavBar isVisible={pastHeight}/>
    </div>
  )
}