
import Instrument from "@/models/instrument";

export const getAllUserInstruments = async (sessionId) => {
    try {
        const allInstruments = await Instrument.find({creator: sessionId }).populate("creator");
        return allInstruments; 
    } catch(error) {
        console.log('other', sessionId)
        console.error('Get user instrus fetch error', error);
        throw error; 
    }
}


