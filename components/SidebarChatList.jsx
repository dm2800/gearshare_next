"use client";
import { chatHrefConstructor } from "@/lib/utils";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import Link from "next/link";

const SidebarChatList = ({ namesDict, processedWatchers }) => {
    const { data: session } = useSession();
    console.log('userwatchers in sidebar', processedWatchers); 

    //If I have user watchers, I have users and their favorites. 
    //Now I just need to display only the favorites for which session user is the creator. 
console.log('namesdict in sidebar', namesDict); 

// console.log('object entries', Object.entries(userWatchers)); 
// console.log('watcher name', userWatchers[0]);

    return (
        <div>
        {processedWatchers &&
            processedWatchers.map((watcher) => (
                <div key = {watcher._id}>
                    {watcher.favorites.map((favorite) => (
                        
                        <Link key ={favorite._id}
                        href ={`/chat/${chatHrefConstructor(watcher._id, session?.user.id)}-${favorite._id}`} 
                        
                        className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">

                            <div className='flex-col'>


                            <p>{favorite.title}</p>
                            <p>{watcher.username}</p>
                            </div>
                            <img width={50} className="rounded-full" src = {favorite.image}></img>
                        </Link>
                    ))}


                </div>
            ))}
    </div>
    );
};

export default SidebarChatList;
