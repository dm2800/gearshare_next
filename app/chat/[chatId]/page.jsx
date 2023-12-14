import { getServerSession } from "next-auth/next";

// import {authOptions} from 'lib/auth';
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import Image from "next/image";
import User from "@/models/user";
import Messages from "@/components/Messages";
import ChatInput from "@/components/ChatInput";
import { fetchRedis } from "helpers/redis";
import { reverse } from "dns";

import { messageArrayValidator } from "lib/validations/message";
import Instrument from "@/models/instrument";

const page = async ({ params }) => {
    const { chatId } = params;

    const segment = chatId.split('--')
    const chatUsersId = segment[0] + '--' + segment[1].split('-')[0];

    const segment2 = chatId.split('-');
    const instrumentId = segment2.pop();

    async function getChatMessages(chatUsersId) {
        try {
            const results = await fetchRedis(
                "zrange",
                `chat:${chatId}:messages`,
                0,
                -1
            );
            console.log("results", results);

            const dbMessages = results.map((message) => JSON.parse(message));

            const reversedDbMessages = dbMessages.reverse();

            const messages = messageArrayValidator.parse(reversedDbMessages);

            return messages;
        } catch (error) {
            // console.log(' get chat msgs error');
            notFound();
        }
    }
    const session = await getServerSession(authOptions);

    if (!session) notFound();

    const { user } = session;

    // const [userId1, userId2] = chatId.split("--");
    const [userId1, userId2] = chatUsersId.split("--");

    if (user.id !== userId1 && user.id !== userId2) {
        notFound();
    }

    const chatPartnerId = user.id === userId1 ? userId2 : userId1;

    const chatPartner = await User.findOne({ _id: chatPartnerId });
    const instrument  = await Instrument.findOne({ _id: instrumentId });

    const initialMessages = await getChatMessages(chatId);

    return (
        <div>
            <p className='head_text !text-[20px] mb-3'>{instrument.title}</p>
            <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]">
                <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                    <div className="relative flex items-center space-x-4">
                        <div className="relative">
                            <div className="relative w-8 sm:w-12 h-8 sm:h-12">
                                <Image
                                    fill
                                    referrerPolicy="no-referrer"
                                    src={chatPartner.image}
                                    alt={`${chatPartner.username} profile picture`}
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <div className="text-xl flex items-center">
                                <span className="text-gray-700 mr-3 font-semibold">
                                    {chatPartner.username}
                                </span>
                            </div>
                            <span className="text-sm text-gray-600">
                                {chatPartner.email}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <Messages
                sessionId={session.user.id}
                initialMessages={initialMessages}
                chatId={chatId}
                chatPartner={chatPartner}
                sessionImg={session.user.image}
            />
            <ChatInput chatPartner={chatPartner} chatId={chatId} />
        </div>
    );
};

export default page;
