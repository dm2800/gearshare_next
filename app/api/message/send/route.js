import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { nanoid } from "nanoid";
import { chatDb } from "../../../../utils/chatDb";
import User from "../../../../models/user";
import { messageValidator } from "../../../../lib/validations/message";
import { pusherServer } from "lib/pusher";
import { toPusherKey } from "lib/utils";

export const POST = async (req) => {
  
    try {
        const { text, chatId } = await req.json();
        const session = await getServerSession(authOptions);

        if (!session) return new Response("Unauthorized", { status: 401 });
        

        //old 
        // const [userId1, userId2] = chatId.split("--");
        
        // new chatId
        const parts = chatId.split('--')
        const chatUsersId = parts[0] + '--' + parts[1].split('-')[0];
        const [userId1, userId2] = chatUsersId.split("--");

        if (session.user.id !== userId1 && session.user.id !== userId2) {
            return new Response("Unauthorized", { status: 401 });
        }

        //mongoose documents are already js objects 
        const sender = await User.findOne({ _id: session.user.id });

        const timestamp = Date.now();

        const messageData = {
            id: nanoid(),
            senderId: session.user.id,
            text,
            timestamp,
        };

        const message = messageValidator.parse(messageData);

        console.log("message", message);

        //notify all connected chat room clients 
        await pusherServer.trigger(toPusherKey(`chat:${chatId}`), 'incoming-message', message); 

        
        //all valid, send the message

        await chatDb.zadd(`chat:${chatId}:messages`, {
            score: timestamp,
            member: JSON.stringify(message),
        });

        return new Response('OK'); 
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }

        return new Response("Internal server error", { status: 500 });
    }
}


