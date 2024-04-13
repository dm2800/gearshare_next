import Instrument from "@/models/instrument";
import { fetchRedis } from "./redis"
import User from '@/models/user'; 

export const getWatchersByInstrumentId = async (instrumentId) => {
    //retrieve watchers for current user 

    // console.log('instrument id in gwbii', instrumentId)
    const instruWatcherIds = (await fetchRedis(
        'smembers',
        `instrument:${instrumentId}:watchers`
    ))
    // console.log('instru watcher ids', instruWatcherIds)

    const instruWatchers = await Promise.all(
        instruWatcherIds.map(async (instruWatcherId) => {
            const instruWatcher = await User.findOne({_id: instruWatcherId})
            return instruWatcher; 
        })
    )

    // console.log(`instru watchers for ${instrumentId}`, instruWatchers, typeof instruWatchers); 
    return instruWatchers; 
}


export const getInstrumentsByWatcher = async (watcherId) => {
    try{

        // const watcherInstruData = {}; 

        //get user info 

        // const user = await User.find({_id: watcherId}); 

        //get all instruments
        const instruments =  await Instrument.find({});
        // console.log('get by watcher instru', instruments); 
        //for each instrument, getting watchers 
        const selectedInstruments = await Promise.all(instruments.map(async (instrument)=> {
            const instruWatcherIds = (await fetchRedis(
                'smembers',
                `instrument:${instrument._id}:watchers`
            ))
            // console.log('instrument:', instrument.title, 'watchers:', instruWatcherIds); 
            if (instruWatcherIds.includes(watcherId)){
                return instrument; 
            }; 
        })
        ) 

        // console.log(`selected instrus of ${watcherId}`, selectedInstruments); 
        return selectedInstruments.filter(Boolean); 
    } catch(error) {
        console.log('error fetching instruments', error); 
        throw error; 
    }
}


export const getFavoriteInstruments = async (watcherId) => {
    try{

        // const watcherInstruData = {}; 

        //get user info 

        // const user = await User.find({_id: watcherId}); 

        //get all instruments
        const user =  await User.findById(watcherId).populate({
            path: 'favorites',
            populate: {
                path: 'creator'
            }    
        }).exec();

        if (!user) {
            throw new Error ('User not found'); 
        }

        // console.log(`selected instrus of ${watcherId}`, selectedInstruments); 
        return user.favorites; 
    } catch(error) {
        console.log('error fetching favorites', error); 
        throw error; 
    }
}


// console.log(getInstrumentsByWatcher('656a69f4717d9e48ed8d04a4')); 