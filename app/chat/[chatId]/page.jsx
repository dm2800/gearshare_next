// import { useSession } from "next-auth/react";
import { FC } from "react";
import { notFound } from "next/navigation";
import User from "@/models/user";
import {handler} from "@/app/api/auth/[...nextauth]/route";



import { getServerSession } from "next-auth/next"

const page = async ({ req, res, params }) => {


    const session = await getServerSession(req, res, handler)
    if (session) {
      // Signed in
      console.log("Session", JSON.stringify(session, null, 2))
    } else {
      // Not Signed in
      res.status(401)
    }
    res.end()

    console.log('session', session);

    return <div>{params.chatId}</div>;
};

export default page;


