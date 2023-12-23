import {fetchRedis} from './redis'; 
import User from "@/models/user";
import Instrument from "@/models/instrument";

export const getWatchersByUserId = async (userId) => {
    //retrieve watchers for current user 

    // console.log('userid', userId)
    const watcherIds = (await fetchRedis(
        'smembers',
        `user:${userId}:watchers`
    ))
    // console.log('watcher ids', watcherIds)

    const watchers = await Promise.all(
        watcherIds.map(async (watcherId) => {
            const watcher = await User.findOne({_id: watcherId})
            return watcher; 
        })
    )
    return watchers; 
}

// export const getWatcherById = async (watcherId) => {
//     const watcher = await User.findOne({_id: watcherId})
//     return watcher; 
// }


// try {
//     const testWatcher = await getWatcherById('656a69f4717d9e48ed8d04a4'); 
//     console.log('test watcher', testWatcher);
// } catch(error) {
//     console.log('error fetching watcher', error); 
// } 

 



