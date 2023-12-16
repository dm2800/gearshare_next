'use client';
import { chatHrefConstructor } from "@/lib/utils";
import { useSession } from "next-auth/react";

 

// import React, { useEffect, useState } from 'react'
// import { chatHrefConstructor } from '@/lib/utils';
// import {getWatchersByInstrumentId} from '@/helpers/get-watchers-by-instrument';


const SidebarChatList = ({watcherDict}) => {

    console.log('sidebar'); 

    console.log('sidebar watchers', watcherDict)

    const {data: session} = useSession(); 



    // console.log('sidebar instruments', instruments); 

//   useEffect(()=> {
//     const results = watchers.map((watcher)=> {
//       return (
//         <li key={watcher.id}>
//         <a
//         //Must add instrument ID to chat generator 
//           href={`/dashboard/chat/${chatHrefConstructor(
//             sessionId,
//             watcher._id
//           )}`}
//           className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
//           {watcher.username}
//           {/* {unseenMessagesCount > 0 ? (
//             <div className='bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center'>
//               {unseenMessagesCount}
//             </div>
//           ) : null} */}
//         </a>
//       </li>
//       )
//     })
    
//     setWatcherList(results); 
//   },[]);

//   const [watcherList, setWatcherList] = useState([]); 



  
  return (
    <div>
      {Object.entries(watcherDict).map(([watcherId, instrumentId]) => (
        <div key= {watcherId}>

            <a href={`/chat/${chatHrefConstructor(watcherId, session?.user.id)}-${instrumentId}`} className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
            <p>Watcher: {watcherId}</p>
            <p>Instrument: {instrumentId}</p>
            </a>
            </div>
      ))}

      
      </div>
  )
}

export default SidebarChatList