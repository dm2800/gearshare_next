import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (req, { params }) => {
    // const { userId, title, description, price, image} = await req.json();

    try {
        await connectToDB();

        const SingleUser = await User.find({_id: params.id });

        return new Response(JSON.stringify(SingleUser), { status: 201 });
    } catch (error) {
        console.log("get single user error", error);
        return new Response("Failed to get single user", { status: 500 });
    }
};
