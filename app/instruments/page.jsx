"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useAppStore from "../store/useAppStore";
import InstrumentCard from "@/components/InstrumentCard";
import Image from "next/image";
import DateSelect from "@/components/DateSelect";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { chatHrefConstructor } from "lib/utils";
import axios from "axios";

const page = () => {
    // const router = useRouter();
    const [instrument, setInstrument] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
        creator: "",
    });

    const { data: session } = useSession();

    const { date, setDate, daysTotal, setDaysTotal } = useAppStore();

    const [favorited, setFavorited] = useState("false");

    const searchParams = useSearchParams();

    const instrumentId = searchParams.get("id");

    const pairInstrument = async () => {
        await axios.post('/api/instrument/pair', { id: instrumentId })
        console.log('in pair instrument');
    }

    useEffect(() => {
        const getSingleInstrument = async () => {
            const response = await fetch(`/api/instrument/${instrumentId}`);
            const data = await response.json();

            console.log("single instru data", data);

            const { title, price, description, image, creator } = data;

            setInstrument({ title, price, description, image, creator });
        };
        if (instrumentId) getSingleInstrument();
    }, [instrumentId]);

    return (
        <div>
            <div className="w-full bg-purple-50/20 p-10">
                <section className="flex flex-col items-center justify-center">
                    <section className="desc_card text-center ">
                        <h4
                            className="text-[35px] text-indigo-900/90 pt-10 mb-4"
                            style={{ lineHeight: "0.75" }}
                        >
                            {instrument.title}
                        </h4>

                        <div className="mx-auto flex w-1/4 justify-between mb-8">
                            <div className="flex mx-5 items-center">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>{" "}
                                <p className="mx-1">4.9</p>
                            </div>

                            <p>32 Reviews</p>
                        </div>

                        <img
                            className="mx-auto mt-5"
                            src={instrument.image}
                            width={300}
                        ></img>
                        <section className="mx-auto p-4 items-center">
                            <div className="pl-5 pt-10 flex items-center justify-between">
                                <p className="text-indigo-900 text-[20px]">
                                    ${instrument.price} / day
                                </p>
                                <div className="flex items-end">
                                    <div className="font-semibold blue_gradient">
                                        Listed by &nbsp;
                                        <Link
                                            href={`/users?id=${instrument.creator._id}`}
                                        >
                                            {instrument.creator.username}
                                        </Link>
                                    </div>

                                    <Link
                                        href={`/users?id=${instrument.creator._id}`}
                                    >
                                        <Image
                                            src={instrument.creator.image}
                                            alt="user_image"
                                            width={32}
                                            height={32}
                                            className="rounded-full object-contain ml-3"
                                        />
                                    </Link>
                                </div>

                                <div className="flex text-indigo-950">
                                    <div className="flex items-center">
                                        <div
                                            className="copy_btn"
                                            onClick={() => {
                                                setFavorited(!favorited);
                                            }}
                                        >
                                            {favorited ? (
                                                <svg
                                                    width="15"
                                                    height="15"
                                                    viewBox="0 0 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M4.89346 2.35248C3.49195 2.35248 2.35248 3.49359 2.35248 4.90532C2.35248 6.38164 3.20954 7.9168 4.37255 9.33522C5.39396 10.581 6.59464 11.6702 7.50002 12.4778C8.4054 11.6702 9.60608 10.581 10.6275 9.33522C11.7905 7.9168 12.6476 6.38164 12.6476 4.90532C12.6476 3.49359 11.5081 2.35248 10.1066 2.35248C9.27059 2.35248 8.81894 2.64323 8.5397 2.95843C8.27877 3.25295 8.14623 3.58566 8.02501 3.88993C8.00391 3.9429 7.98315 3.99501 7.96211 4.04591C7.88482 4.23294 7.7024 4.35494 7.50002 4.35494C7.29765 4.35494 7.11523 4.23295 7.03793 4.04592C7.01689 3.99501 6.99612 3.94289 6.97502 3.8899C6.8538 3.58564 6.72126 3.25294 6.46034 2.95843C6.18109 2.64323 5.72945 2.35248 4.89346 2.35248ZM1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.0084 1.35248 6.73504 1.76049 7.20884 2.2953C7.32062 2.42147 7.41686 2.55382 7.50002 2.68545C7.58318 2.55382 7.67941 2.42147 7.79119 2.2953C8.265 1.76049 8.99164 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
                                                        fill="currentColor"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                    ></path>
                                                </svg>
                                            ) : (
                                                <svg
                                                    width="15"
                                                    height="15"
                                                    viewBox="0 0 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
                                                        fill="currentColor"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                    ></path>
                                                </svg>
                                            )}
                                        </div>
                                        <p className="mx-1">Save</p>
                                    </div>
                                    <div className="flex items-center">
                                        <div
                                            className="copy_btn"
                                            onClick={() => { }}
                                        >
                                            <svg
                                                width="15"
                                                height="15"
                                                viewBox="0 0 15 15"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M3.5 5.00006C3.22386 5.00006 3 5.22392 3 5.50006L3 11.5001C3 11.7762 3.22386 12.0001 3.5 12.0001L11.5 12.0001C11.7761 12.0001 12 11.7762 12 11.5001L12 5.50006C12 5.22392 11.7761 5.00006 11.5 5.00006L10.25 5.00006C9.97386 5.00006 9.75 4.7762 9.75 4.50006C9.75 4.22392 9.97386 4.00006 10.25 4.00006L11.5 4.00006C12.3284 4.00006 13 4.67163 13 5.50006L13 11.5001C13 12.3285 12.3284 13.0001 11.5 13.0001L3.5 13.0001C2.67157 13.0001 2 12.3285 2 11.5001L2 5.50006C2 4.67163 2.67157 4.00006 3.5 4.00006L4.75 4.00006C5.02614 4.00006 5.25 4.22392 5.25 4.50006C5.25 4.7762 5.02614 5.00006 4.75 5.00006L3.5 5.00006ZM7 1.6364L5.5682 3.0682C5.39246 3.24393 5.10754 3.24393 4.9318 3.0682C4.75607 2.89246 4.75607 2.60754 4.9318 2.4318L7.1818 0.181802C7.26619 0.09741 7.38065 0.049999 7.5 0.049999C7.61935 0.049999 7.73381 0.09741 7.8182 0.181802L10.0682 2.4318C10.2439 2.60754 10.2439 2.89246 10.0682 3.0682C9.89246 3.24393 9.60754 3.24393 9.4318 3.0682L8 1.6364L8 8.5C8 8.77614 7.77614 9 7.5 9C7.22386 9 7 8.77614 7 8.5L7 1.6364Z"
                                                    fill="currentColor"
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </div>
                                        <p className="mx-1 ">Share</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>

                    <section className="flex justify-between my-5 space-x-3">
                        <div className="bg-purple-50/90  mx-auto desc_card2">
                            <p className="text-indigo-950 text-[17px] p-5">
                                {instrument.description}
                            </p>
                        </div>

                        <DateSelect />
                    </section>
                </section>

                <div className="flex justify-center mt-4">

                    {session?.user.id !== instrument.creator._id ?

                        <Link href={`/chat/${chatHrefConstructor(session?.user.id, instrument.creator._id)}-${instrumentId}`}>
                            <button type="button" className="book_btn" onClick={pairInstrument()}>
                                {daysTotal
                                    ? `Book for ${daysTotal} days x $${instrument.price
                                    } = ${daysTotal * instrument.price}`
                                    : `Book`}
                            </button>
                        </Link>
                        : null
                    }

                </div>
            </div>
        </div>
    );
};

export default page;
