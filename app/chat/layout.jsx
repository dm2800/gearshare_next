import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import SidebarChatList from "@/components/SidebarChatList";
import SidebarWatchingList from "@/components/SidebarWatchingList";
import Image from "next/image";
import Instrument from "@/models/instrument";
import User from "@/models/user";
import {
    getWatchersByInstrumentId,
    getInstrumentsByWatcher,
    getFavoriteInstruments,
} from "@/helpers/get-watchers-by-instrument";
import { notFound } from "next/navigation";
import InstrumentDetails from "@/components/InstrumentDetails";
// import useAppStore from "../store/useAppStore";

const sidebarOptions = [
    {
        id: 1,
        name: "Add friend",
        href: "/dashboard/add",
        Icon: "UserPlus",
    },
];

const getAllUserInstruments = async (sessionId) => {
    try {
        const allInstruments = await Instrument.find({
            creator: sessionId,
        }).populate("creator");

        return allInstruments;
    } catch (error) {
        console.log("Get user instrus fetch error", error);
    }
};

const page = async ({ children }) => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    const instruments = await getAllUserInstruments(session.user.id);
    // console.log("user instruments in chat layout", instruments);

    const userWatchers = [];

    //getting all watchers per user instrument
    for (const instrumentKey in instruments) {
        //if number of watchers is not 0
        const instrument = instruments[instrumentKey];
        const watchersPromise = getWatchersByInstrumentId(
            instrument._id.toString()
        );
        const watchers = await watchersPromise;
        // console.log(`instrument: ${instrument._id}, Watchers: ${watchers}`);

        //push each instrument watcher if not already present in array 
        watchers.forEach((watcher) => {
            const watcherIdStr = watcher._id.toString();
            if (
                !userWatchers.some(
                    (existingWatcher) =>
                        existingWatcher._id.toString() === watcherIdStr
                )
            ) {
                userWatchers.push(watcher);
            }
        });
        // console.log("userWatchers array", userWatchers);
    }

    //Simplifying object to avoid recursion/serialization errors
    // converting objectIds and timestamps to strings
    const processedWatchers = userWatchers.map((user) => ({
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        image: user.image,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        favorites: user.favorites.map((favorite) => ({
            creator: favorite.creator.toString(),
            title: favorite.title,
            description: favorite.description,
            image: favorite.image,
            _id: favorite._id.toString(),
        })),
    }));
    // console.log("processed watchers", processedWatchers);

    const favoritesbyWatcher = await getFavoriteInstruments(session.user.id);
    console.log('favorites by watcher', favoritesbyWatcher);
    
    // const { fetchFavoritesByWatcher, favoritesByWatcher} = useAppStore((state) => ({
    //     fetchFavoritesByWatcher: state.fetchFavoritesByWatcher, 
    //     favoritesByWatcher: state.favoritesByWatcher
    // })); 
    
    // const favoritesByWatcher = await fetchFavoritesByWatcher(session.user.id);


    // useEffect(()=> {
    //     if(watcherId) {
    //         fetchFavoritesByWatcher(watcherId);
    //     }
    // }, [watcherId, fetchFavoritesByWatcher])

    return (
        <div className="w-3/4 flex">
            <div className="md:hidden">
                {/* <MobileChatLayout
        friends={friends}
        session={session}
        sidebarOptions={sidebarOptions}
        unseenRequestCount={unseenRequestCount}
      /> */}
            </div>

            <div className="hidden md:flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r rounded-l-[20px] border-gray-200 bg-white/40 px-6">
                <div className="text-xl font-semibold leading-6 text-indigo-900 mt-10">
                    Your chats
                </div>

                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col  gap-y-7">
                        <li>
                            <h1 className="text-gray-700 font-semibold">
                                Lending
                            </h1>
                            <SidebarChatList
                                sessionId={session.user.id}
                                processedWatchers={processedWatchers}
                                // namesDict={namesDict}
                            />
                            <h1 className="pt-6 text-gray-700 font-semibold">
                                Watching
                            </h1>
                            <SidebarWatchingList
                                favoritesbyWatcher={favoritesbyWatcher}
                            />
                        </li>
                        <li>
                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                {sidebarOptions.map((option) => {
                                    // const Icon = Icons[option.Icon]
                                    return (
                                        <li key={option.id}>
                                            <Link
                                                href={option.href}
                                                className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                            ></Link>
                                        </li>
                                    );
                                })}

                                {/* <li>
                <FriendRequestSidebarOptions
                  sessionId={session.user.id}
                  initialUnseenRequestCount={unseenRequestCount}
                />
              </li> */}
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>

            <aside className="border overflow-auto border-black/10 border-l-none rounded-r-[20px] max-h-[553px] container py-16 md:py-12 w-full pl-8">
                {children}
            </aside>
        </div>
    );
};

export default page;
