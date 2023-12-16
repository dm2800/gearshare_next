'use client';
import React from 'react'
import { useEffect } from 'react';

const Test = ({instruments}) => {

    const [watcherList, setWatcherList] = useState([]); 

//     useEffect(()=> {
//     const results = instruments.map((instrument)=> (

//         getWatchersByInstrumentId(instrument._id).map((watcher) => (
//                 <li key={watcher.id}>
//                 <a
//                 //Must add instrument ID to chat generator 
//                   href={`/dashboard/chat/${chatHrefConstructor(
//                     sessionId,
//                     watcher._id
//                   )}`}
//                   className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
//                   {watcher.username}

//                 </a>
//               </li>
//               ))
//     ))
    
//     setWatcherList(results); 
//   },[]);


  return (
    <div>Hello</div>
  )
}

export default Test