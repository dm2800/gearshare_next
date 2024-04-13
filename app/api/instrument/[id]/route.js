import { connectToDB } from "@/utils/database";
import Instrument from "@/models/instrument";


// GET (read)

export const GET = async (request, { params }) => {
    // const { userId, title, description, price, image} = await req.json();

    try {
        await connectToDB();
        const instrument = await Instrument.findById(params.id).populate(
            "creator"
        );

        if (!instrument)
            return new Response("Instrument not found", { status: 404 });

        return new Response(JSON.stringify(instrument), { status: 200 });
    } catch (error) {
        console.log("get all instruments error", error);
        return new Response("Failed to get instrument", { status: 500 });
    }
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
    const { title, price, description, image, address } = await request.json();

    try {
        await connectToDB();

        const existingInstrument = await Instrument.findById(params.id);

        if (!existingInstrument)
            return new Response("Instrument not found", { status: 404 });

        existingInstrument.title = title;
        existingInstrument.price = price;
        existingInstrument.description = description;
        existingInstrument.image = image;
        existingInstrument.address = address;

        await existingInstrument.save();

        return new Response(JSON.stringify(existingInstrument), {
            status: 200,
        });
    } catch (error) {
        return new Response("Failed to update instrument", { status: 500 });
    }
};

// DELETE (delete)

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Instrument.findByIdAndDelete(params.id);

        return new Response("Instrument deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete instrument", { status: 500 })
    }
};
