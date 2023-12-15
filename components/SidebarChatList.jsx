'use client'; 

import React, { useEffect, useState } from 'react'
import { chatHrefConstructor } from '@/lib/utils';


const SidebarChatList = ({sessionId, watchers}) => {

  useEffect(()=> {
    const results = watchers.map((watcher)=> {
      return (
        <li key={watcher.id}>
        <a
        //Must add instrument ID to chat generator 
          href={`/dashboard/chat/${chatHrefConstructor(
            sessionId,
            watcher.id
          )}`}
          className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
          {watcher.username}
          {/* {unseenMessagesCount > 0 ? (
            <div className='bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center'>
              {unseenMessagesCount}
            </div>
          ) : null} */}
        </a>
      </li>
      )
    })
    
    setWatcherList(results); 
  },[]);

  const [watcherList, setWatcherList] = useState([]); 
  
  return (
    <div>
      
      {watcherList}
      
      </div>
  )
}

export default SidebarChatList