import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "../../auth/[...nextauth]/route";
import { chatDb } from "@/utils/chatDb";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { z } from "zod";
import User from "../../../../models/user";
import Instrument from "../../../../models/instrument";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        const body = await req.json();
        const { id: instrumentId } = z.object({ id: z.string() }).parse(body);

        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }

        //converting instrument id to an objectid for mongoose lookup
        const ObjectId = mongoose.Types.ObjectId;
        const instrumentIdObj = new ObjectId(instrumentId);

        // const isAlreadyPaired = await fetchRedis(
        //   'sismember',
        //   `user:${session.user.id}:favorites`,
        //   instrumentId
        // )

        // if (isAlreadyPaired) {
        //     console.log('already paired');
        //   return new Response('Already paired', { status: 400 })
        // }

        // verify user has not already expressed interest in instrument
        const isAlreadyFavorited = await User.findOne({
            _id: session.user.id,
            favorites: {
                $elemMatch: { _id: instrumentIdObj },
            },
        });

        if (isAlreadyFavorited) {
            console.log("Already favorited");
            return new Response("Already favorited", { status: 400 });
        }

        const [user, instrument] = await Promise.all([
            User.findOne({ _id: session.user.id }),
            Instrument.findOne({ _id: instrumentId }),
        ]);

        // console.log('instrument in pair', instrument);
        // console.log('user in pair', user);

        if (session.user.id === instrument.creator._id) {
            return new Response("Cannot watch your own item", { status: 400 });
        }

        //adding instrument to user favorites
        await User.updateOne(
            { _id: session.user.id },
            { $addToSet: { favorites: instrument } }
        );

        //logging update user with new favorite
        const updatedUser = await User.findOne({ _id: session.user.id });
        console.log("Updated user:", updatedUser);

        //Adding to upstash db
        // await chatDb.sadd(`user:${session.user.id}:favorites`, instrumentId)
            await chatDb.sadd(`user:${instrument.creator._id}:watchers`, session.user.id)
            await chatDb.sadd(`instrument:${instrumentId}:watchers`, session.user.id)

        // notify added user

        // await Promise.all([
        //   pusherServer.trigger(
        //     toPusherKey(`instrument:${instrumentId}:watchers`),
        //     'new_pairing',
        //     user
        //   ),
        //   pusherServer.trigger(
        //     toPusherKey(`user:${session.user.id}:favorites`),
        //     'new_pairing',
        //     instrument
        //   ),
        //   chatDb.sadd(`user:${session.user.id}:favorites`, instrumentId)
        //   chatDb.sadd(`instrument:${instrumentId}:watchers`, session.user.id)
        // ])

        return new Response("OK");
    } catch (error) {
        console.log(error);

        if (error instanceof z.ZodError) {
            return new Response("Invalid request payload", { status: 422 });
        }

        return new Response("Invalid request", { status: 400 });
    }
}
