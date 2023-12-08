import { connectToDB } from "@/utils/database"; 
import Instrument from "@/models/instrument";

export const GET = async (req, res) => {
    // const { userId, title, description, price, image} = await req.json(); 

    try {
        await connectToDB(); 
        const allInstruments = await Instrument.find({}).populate('creator')

        return new Response (JSON.stringify(allInstruments), {status: 201})
        
    } catch(error) {
        console.log('get all instruments error', error); 
        return new Response("Failed to get all instruments", {status: 500})
    }
}