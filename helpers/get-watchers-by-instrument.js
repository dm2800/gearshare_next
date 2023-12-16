import { fetchRedis } from "./redis"
import User from '@/models/user'; 

export const getWatchersByInstrumentId = async (instrumentId) => {
    //retrieve watchers for current user 

    console.log('instrument id in gwbii', instrumentId)
    const instruWatcherIds = (await fetchRedis(
        'smembers',
        `instrument:${instrumentId}:watchers`
    ))
    console.log('instru watcher ids', instruWatcherIds)

    const instruWatchers = await Promise.all(
        instruWatcherIds.map(async (instruWatcherId) => {
            const instruWatcher = await User.findOne({_id: instruWatcherId})
            return instruWatcher; 
        })
    )

    console.log(`instru watchers for ${instrumentId}`, instruWatchers, typeof instruWatchers); 
    return instruWatchers; 
}


