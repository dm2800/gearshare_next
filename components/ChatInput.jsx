"use client";
import axios from "axios";
import { useRef, useState } from "react";
import { ArrowUpIcon } from "@radix-ui/react-icons";

import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";

const ChatInput = ({ chatPartner, chatId }) => {
    const textareaRef = useRef(null);

    const [input, setInput] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!input) return;
        setIsLoading(true);

        try {
            await axios.post("/api/message/send", { text: input, chatId });
            setInput("");
            textareaRef.current?.focus();
        } catch {
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="border-t border-gray-200 pr-4 pt-4 mb-2 sm:mb-0 ">
            <div className="relative flex overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                <TextareaAutosize
                    ref={textareaRef}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                    className=" w-11/12 resize-none border-0 pl-2 bg-white/40 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:py-1.5 sm:text-sm sm:leading-6"
                >
                    <div
                        onClick={() => textareaRef.current?.focus()}
                        className="py-2"
                        aria-hidden="true"
                    >
                        {/* <div className='py-px'> */}
                        {/* <div className='h-9'/> */}
                        {/* </div> */}
                    </div>
                </TextareaAutosize>

                <div className="flex ml-2.5">
                    <button onClick={sendMessage} type="submit">
                        <ArrowUpIcon className="border bg-indigo-800 border-gray/40 text-white rounded-full w-6 h-6 hover:bg-white hover:text-indigo-700 hover:border-indigo-900" />
                    </button>
                </div>

                {/* <div className='flex flex-end items-center justify-between pl-3 pr-2'>

        </div> */}
            </div>
        </div>
    );
};

export default ChatInput;
