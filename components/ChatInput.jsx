'use client'

// import { POST } from '@/app/api/auth/[...nextauth]/route';
import axios from 'axios';
import {useRef, useState} from 'react'

import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';


const ChatInput = ({chatPartner, chatId}) => {

  const textareaRef = useRef(null); 

  const [input, setInput] = useState(''); 

  const [isLoading, setIsLoading] = useState(false); 

  const sendMessage = async () => {
    if(!input) return 
    setIsLoading(true); 

    try {
      

      await axios.post('/api/message/send', {text: input, chatId}); 
      setInput(''); 
      // const result = await fetch('/api/message/send', {
      //   method: 'POST',
      //   body: JSON.stringify({text: input, chatId: chatId})
      // })

      // if(result.ok) {
      //   console.log('result ok', result);
      // }
      textareaRef.current?.focus()
    } catch {
      toast.error('Something went wrong. Please try again later.')
    } finally {
      setIsLoading(false);  
    }

  }

  return (
    <div className='border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0 '>
      <div className='relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus within:ring-2 focus-within:ring-indigo-600'>
        <TextareaAutosize ref={textareaRef} onKeyDown ={(e) => {
          if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(); 
          }
        }}
        rows={1}
        value={input}
        onChange = {(e) => setInput(e.target.value)}
        placeholder={`Message ${chatPartner.username}`}
        className='block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring- sm:py-1.5 sm:text-sm sm:leading-6'/>

        <div onClick={() => textareaRef.current?.focus()} className='py-2' aria-hidden='true'>
          <div className='py-px'>
            <div className='h-9'/>
          </div>
        </div>

        <div className='absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
          <div className='flex-shrink-0'>
            <button onClick={sendMessage} type='submit'>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInput; 