import { connectToDB } from "@/utils/database";
import Instrument from "@/models/instrument";

export const GET = async (req, { params }) => {
    // const { userId, title, description, price, image} = await req.json();

    try {
        await connectToDB();

        const allInstruments = await Instrument.find({creator: params.id }).populate("creator");

        return new Response(JSON.stringify(allInstruments), { status: 201 });
    } catch (error) {
        console.log("get all user instruments error", error);
        return new Response("Failed to get all instruments", { status: 500 });
    }
};
