import React from 'react'

export function SetCookie(name, value, days) {
  console.log('cookie')
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expires.toUTCString()}` : '');
    console.log('cookieValueINSETCOOKIE', cookieValue)
    
    document.cookie = `${name}=${cookieValue}; path=/`;
  }


export function getCookie(name) {
  console.log('getCOokieNAME', name)
  console.log('cookeiValueDocument', document.cookie)
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`))
      ?.split('=')[1];
    console.log('cookieValue', cookieValue)
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }

export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}