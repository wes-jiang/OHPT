import React from 'react'

export function SetCookie(name, value, days) {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expires.toUTCString()}` : '');
    document.cookie = `${name}=${cookieValue}; path=/`;
  }


export function getCookie(name) {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`))
      ?.split('=')[1];
  
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }