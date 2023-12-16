import {fetchRedis} from './redis'; 
import User from "@/models/user";
import Instrument from "@/models/instrument";

export const getWatchersByUserId = async (userId) => {
    //retrieve watchers for current user 

    console.log('userid', userId)
    const watcherIds = (await fetchRedis(
        'smembers',
        `user:${userId}:watchers`
    ))
    console.log('watcher ids', watcherIds)

    const watchers = await Promise.all(
        watcherIds.map(async (watcherId) => {
            const watcher = await User.findOne({_id: watcherId})
            return watcher; 
        })
    )
    return watchers; 
}



