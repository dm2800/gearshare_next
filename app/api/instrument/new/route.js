import { connectToDB } from "@/utils/database"; 
import Instrument from "@/models/instrument";

export const POST = async (req, res) => {
    const { userId, title, description, price, image} = await req.json(); 

    try {
        await connectToDB(); 
        const newInstrument = new Instrument({creator: userId, title, description, price, image})

        await newInstrument.save(); 

        return new Response(JSON.stringify(newInstrument), {
            status: 201
        })
    } catch(error) {
        console.log('create new instrument error', error); 
        return new Response("Failed to create new instrument", {status: 500})
    }
}