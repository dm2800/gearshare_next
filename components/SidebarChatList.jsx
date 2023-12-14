'use client'; 

import React, { useEffect, useState } from 'react'


const SidebarChatList = ({sessionId, watchers}) => {

  useEffect(()=> {
    const results = watchers.map((watcher)=> {
      return (
        <div>
  
          <p>
            {watcher.username}
          </p>
  
        </div>
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