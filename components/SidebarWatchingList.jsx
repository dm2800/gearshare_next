import React from "react";
import User from "../models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { chatHrefConstructor } from "@/lib/utils";
import Link from "next/link";
import Instrument from "@/models/instrument";

const SidebarWatchingList = async ({ favoritesbyWatcher }) => {
    const session = await getServerSession(authOptions);

    //Trying to fix the problem of having to reload the page to see watching items 
    // has to do with the fetch inside the map function 

    // const owners = Object.values(favoritesbyWatcher).map(async(instrument => {
    //     const owner = await User.findOne({_id: instrument.creator._id})
    //     return owner 
    // }))

    // console.log('owners array', owners); 

    return (
        <div>
            <div>
                {favoritesbyWatcher &&
                    Object.values(favoritesbyWatcher).map(
                         (instrument) => {
                            return (
                                <Link
                                    href={`/chat/${chatHrefConstructor(
                                        instrument.creator._id,
                                        session.user.id
                                    )}-${instrument._id}`}
                                    className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                >
                                   
                                        <div
                                            key={instrument._id}
                                            className="flex flex-col"
                                        >
                                            <p>{instrument.title}</p>
                                            <p className="text-indigo-700">
                                                {instrument.creator.username}
                                            </p>
                                        </div>

                                        <img
                                            width={30}
                                            height={30}
                                            src={instrument.image}
                                            className="rounded-full"
                                        ></img>
                               
                                </Link>
                            );
                        }
                    )}
            </div>
        </div>
    );
};

export default SidebarWatchingList;
