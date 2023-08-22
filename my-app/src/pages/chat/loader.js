import React from 'react'
import { LoaderFunctionArgs } from 'react-router-dom';
import { getCookie } from '../../cookieUtils';

export const loadMessages = async (conversationId) => {
    // const response = await fetch(`http://127.0.0.1:8000/chat/conversation/${conversationId}`);
    const response = await fetch(`http://127.0.0.1:8000/chat/conversation/1`);
    const data = await response.json();
    return data;
  };
  
// export const loadConversations = async (courseId) => {
// const response = await fetch(`http://127.0.0.1:8000/chat/course/${courseId}`);
// const data = await response.json();
// return data;
// };

export const loadConversations = async (courseId) => {
    const response = await fetch(`http://127.0.0.1:8000/chat/course/${courseId}`);
    // const response = await fetch(`http://127.0.0.1:8000/chat/course/1`);
    const data = await response.json();
    return data;
  };


  export const loadConvoMsg = async ({conversationId, courseId}) => {
    const userToken = getCookie('userToken')
    console.log('getCookie loadConvoMsg', userToken)
    console.log('loadConvo courseId', courseId)
    if (conversationId) {
        console.log('conversationId type in loader', typeof conversationId)
        const response = await fetch(`http://127.0.0.1:8000/chat/conversation/${conversationId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
        if (!response.ok) throw new Error(`loadConvoMsg conversationId is wrong: ${conversationId}`)
        const data = await response.json();
        console.log(data)
        return data;
    }
    else if (courseId) {
        console.log('entered in courseId')
        const response = await fetch(`http://127.0.0.1:8000/chat/course/${courseId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userToken}`
            },
            credentials: 'include'
            
        });

        if (!response.ok) throw new Error(`loadConvoMsg CourseId is wrong with courseId: ${courseId}`)
        const data = await response.json();
        return data;
    }
    else {
        return null
    }
};

export const loadUserId = async () => {
    console.log('hello my name is')
    const userToken = getCookie('userToken')
    const response = await fetch('http://127.0.0.1:8000/chat/get_user_id', {
        method: 'GET',
        headers: {
            Authorization: `Token ${userToken}`
        },
        credentials: 'include'
    })
    if (!response.ok) throw new Error('Cannot load user ID')
    const data = await response.json();
    return data
}



//   };

// export const loadConvoMsg = () => async ({ conversationId, courseId }) => {
//     if (conversationId) {
//       // Load conversation data based on conversationId
//       const response = await fetch(`http://127.0.0.1:8000/chat/conversation/${conversationId}`);
//       const data = await response.json();
//       return data;
//     } else if (courseId) {
//       // Load course data based on courseId
//       const response = await fetch(`http://127.0.0.1:8000/chat/course/${courseId}`);
//       const data = await response.json();
//       return data;
//     } else {
//       return null;
//     }
//   };