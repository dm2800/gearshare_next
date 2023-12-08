"useclient";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { FC } from "react";
import { notFound } from "next/navigation";

async function getChatMessages(chatId) {
    try {
        const results = await fetchRedis(
            "zrange",
            "chat:${chatId}:messages",
            0,
            -1
        );
        const dbMessages = results.map((message) => JSON.parse(message));

        const reversedDbMessages = dbMessages.reverse(); 

        const messages = messageArrayValidator.parse(reversedDbMessages); 

        return messages; 

    } catch (error) {
        notFound();
    }
}

const page = async ({ params }) => {
    const { chatId } = params;
    const { data: session } = useSession();
    const userId = session?.user.id;

    if (!session) notFound();

    const { user } = session;
    const [userId1, userId2] = chatId.split("--");

    if (userId !== userId1 && userId !== userId2) {
        notFound();
    }

    const chatPartnerId = user.id === userId1 ? userId2 : userId1;

    // useEffect(()=> {
    //     const getUser = async () => {
    //         const response = await fetch(`/api/user/${userId}`)
    //         const data = await response.json();
    //         console.log('user details', data)
    //         return data;
    //         // setChatUser({title: data.title,
    //         // price: data.price,
    //         // description: data.description,
    //         // image: data.image
    //        // })
    //     }

    //     if(userId) getUser();
    // },[userId])

    const getUser = async (chatUserId) => {
        const response = await fetch(`/api/user/${chatUserId}`);
        const data = await response.json();
        console.log("user details", data);
        return data;
        // setChatUser({title: data.title,
        // price: data.price,
        // description: data.description,
        // image: data.image
        // })
    };

    const chatPartner = await getUser(chatPartnerId);
    const initialMessages = await getChatMessages(chatId);
    
    
    

    return <div>{params.chatId}</div>;
};

export default page;
