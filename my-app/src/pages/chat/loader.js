import React from 'react'
import { LoaderFunctionArgs } from 'react-router-dom';

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
    // console.log('convoIDLoad', conversationId)
    // console.log('courseIdLoad', courseId)
    if (conversationId) {
        console.log('conversationId type in loader', typeof conversationId)
        // const response = await fetch(`http://127.0.0.1:8000/chat/conversation/${conversationId}`);
        // const response = await fetch(`http://127.0.0.1:8000/chat/conversation/1`);
        const response = await fetch(`http://127.0.0.1:8000/chat/conversation/${conversationId}`);
        if (!response.ok) throw new Error('Something went wrong')
        const data = await response.json();
        console.log(data)
        return data;
    }
    else if (courseId) {
        // console.log('courseId in loader', courseId)
        // console.log('conversationId in loader', conversationId)
        // const response = await fetch(`http://127.0.0.1:8000/chat/course/${courseId}`);
        const response = await fetch(`http://127.0.0.1:8000/chat/course/${courseId}`);
        // const response = await fetch(`http://127.0.0.1:8000/chat/course/1`);

        if (!response.ok) throw new Error('Something went wrong')
        const data = await response.json();
        return data;
    }
    else {
        return null
    }
};



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